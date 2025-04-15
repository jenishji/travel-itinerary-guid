const axios = require("axios");
const TripResponse = require("../model/tripData");
const geolib = require("geolib"); // For distance calculations
const NodeGeocoder = require('node-geocoder'); // For geocoding locations

// Initialize geocoder
const geocoder = NodeGeocoder({
  provider: 'openstreetmap'
});

// Controller to generate a trip plan based on form data and store it in the database
exports.generateTripPlan = async (req, res) => {
  // Extract form data from the request body
  const { 
    destination, 
    date, 
    duration, 
    userLocation, 
    budget, 
    visitNearby, 
    userId,
    pace,
    tripType,
    tripPurpose
  } = req.body;

  try {
    // Check if user location is near destination to avoid unnecessary flight recommendations
    let skipFlights = false;
    try {
      const [destGeo, userGeo] = await Promise.all([
        geocoder.geocode(destination),
        geocoder.geocode(userLocation)
      ]);
      
      if (destGeo.length > 0 && userGeo.length > 0) {
        const distance = geolib.getDistance(
          { latitude: userGeo[0].latitude, longitude: userGeo[0].longitude },
          { latitude: destGeo[0].latitude, longitude: destGeo[0].longitude }
        );
        
        // If distance is less than 100km, skip flight recommendations
        skipFlights = distance < 100000; // 100km in meters
      }
    } catch (geoError) {
      console.log("Geocoding error:", geoError);
      // Continue without skipping flights if geocoding fails
    }

    // Fetch local events using a free API
    let localEvents = [];
    let useGeminiForEvents = false;
    
    try {
      // Try to get destination coordinates for events
      const destGeo = await geocoder.geocode(destination);
      
      if (destGeo.length > 0) {
        const latitude = destGeo[0].latitude;
        const longitude = destGeo[0].longitude;
        
        // Parse start and end dates
        const startDate = new Date(date);
        const endDate = new Date(startDate);
        endDate.setDate(endDate.getDate() + duration);
        
        // Format dates for API
        const formattedStartDate = startDate.toISOString().split('T')[0];
        const formattedEndDate = endDate.toISOString().split('T')[0];
        
        // Option 1: Use Serpapi's Google Events Data
        // This is a scraping API with a free tier (100 searches/month)
        try {
          const eventsResponse = await axios.get(
            `https://serpapi.com/search.json`,
            {
              params: {
                engine: "google_events",
                q: `events in ${destination}`,
                location: destination,
                hl: "en",
                gl: "us",
                api_key: process.env.SERPAPI_API_KEY || "demo" // Use demo key with limited results
              }
            }
          );
          
          if (eventsResponse.data && eventsResponse.data.events_results) {
            localEvents = eventsResponse.data.events_results.slice(0, 5).map(event => ({
              eventName: event.title,
              date: event.date?.when || formattedStartDate,
              description: event.description || event.title,
              url: event.link || ""
            }));
          }
        } catch (serpapiError) {
          console.log("Serpapi error:", serpapiError);
          
          // Option 2: Try Open-Meteo Events API (fully free)
          try {
            const openMeteoResponse = await axios.get(
              `https://api.open-meteo.com/v1/events`,
              {
                params: {
                  latitude: latitude,
                  longitude: longitude,
                  start_date: formattedStartDate,
                  end_date: formattedEndDate,
                  timezone: "auto"
                }
              }
            );
            
            if (openMeteoResponse.data && openMeteoResponse.data.events) {
              localEvents = openMeteoResponse.data.events.slice(0, 5).map(event => ({
                eventName: event.name || "Local Event",
                date: event.date || formattedStartDate,
                description: event.description || event.name || "Local event in " + destination,
                url: ""
              }));
            }
          } catch (openMeteoError) {
            console.log("Open-Meteo error:", openMeteoError);
            useGeminiForEvents = true;
          }
        }
        
        // If no events found from either API, use Gemini
        if (localEvents.length === 0) {
          useGeminiForEvents = true;
        }
      } else {
        useGeminiForEvents = true;
      }
    } catch (eventError) {
      console.log("Event API error:", eventError);
      useGeminiForEvents = true;
    }

    // Define the base prompt and events prompt based on availability
    let basePrompt = `
      Plan a ${duration}-day ${pace} ${tripType} itinerary to ${destination} starting ${date} (budget: ${budget}).
      From: ${userLocation}. Purpose: ${tripPurpose}.
      ${visitNearby ? "Include 2-3 nearby locations to visit." : ""}
    `;

    let eventPrompt = "";
    if (useGeminiForEvents) {
      eventPrompt = `"localEvents": [{"eventName": "Event Name", "date": "YYYY-MM-DD during trip", "description": "Brief description", "url": ""}],`;
    }

    // Build the full prompt
    const prompt = `
      ${basePrompt}
      
      Return only JSON with:
      "itinerary": [{
        "date": "YYYY-MM-DD",
        "activities": [
          {"morning": {"activityName": "", "estimatedDuration": "", "location": "", "routeInformation": ""}},
          {"afternoon": {"activityName": "", "estimatedDuration": "", "location": "", "routeInformation": ""}},
          {"evening": {"activityName": "", "estimatedDuration": "", "location": "", "routeInformation": ""}}
        ]
      }],
      "travelTips": [
        {"Weather-related advice": ""},
        {"Safety guidelines for ${destination}": ""},
        {"Local transportation": ""},
        {"Cultural etiquette": ""}
      ],
      "hotelRecommendations": [
        {"hotelName": "", "pricingDetails": "", "websiteLink": ""}
      ],
      ${skipFlights ? '' : `"flightRecommendations": [
        {"flightName": "", "pricingDetails": "", "bookingWebsiteURL": ""}
      ],`}
      "diningOptions": [
        "RestaurantName, SpecificCuisine, PriceRange(₹-₹₹₹)"
      ],
      "reservations": [
        {"Name of the attraction/activity": "", "Booking link": "https://...", "Recommended booking timeframe": "", "Estimated cost per person": ""}
      ]
      ${useGeminiForEvents ? ',' + eventPrompt : ''}
    `;

    // Call the Gemini API with the prompt
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [{ parts: [{ text: prompt }] }]
      }
    );
    
    // Select the first candidate from the response
    const candidate = response.data.candidates && response.data.candidates[0];
    if (!candidate) {
      return res.status(400).json({
        success: false,
        message: "No candidate generated from the AI API."
      });
    }
    
    // Extract and clean up the generated text from the API response
    let aiResponse = candidate.content.parts[0].text;
    aiResponse = aiResponse.replace(/```json/gi, "").replace(/```/g, "").trim();
    console.log("Raw AI Response:", aiResponse);
    
    let resjson;
    try {
      resjson = JSON.parse(aiResponse);
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: "Failed to parse the plan data. Please ensure the API returns a valid JSON format.",
        error: parseError.message,
      });
    }

    // Filter reservations to only include those with valid booking links
    if (resjson.reservations) {
      resjson.reservations = resjson.reservations.filter(r => 
        r.hasOwnProperty("Booking link") && 
        r["Booking link"] && 
        r["Booking link"].trim() !== "" &&
        !r["Booking link"].includes("Contact local") &&
        r["Booking link"].startsWith("http")
      );
    }

    // Use API events if available, otherwise use Gemini-generated events
    if (!useGeminiForEvents && localEvents.length > 0) {
      resjson.localEvents = localEvents;
    } else if (useGeminiForEvents && (!resjson.localEvents || resjson.localEvents.length === 0)) {
      // If Gemini didn't provide events, create a placeholder
      resjson.localEvents = [];
    }

    let expiresAt;
    if (userId) {
      // Convert date to a Date object and add duration days.
      const startDate = new Date(date);
      expiresAt = new Date(startDate.getTime() + duration * 24 * 60 * 60 * 1000);
    } else {
      expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    }

    // Create a new TripResponse document
    const newTripResponse = new TripResponse({
      destination,
      date: new Date(date),
      duration,
      userLocation,
      userId: userId || undefined,
      itinerary: resjson.itinerary,
      travelTips: resjson.travelTips,
      hotelRecommendations: resjson.hotelRecommendations,
      flightRecommendations: skipFlights ? [] : resjson.flightRecommendations,
      diningOptions: resjson.diningOptions,
      localEvents: resjson.localEvents || [],
      reservations: resjson.reservations || [],
      status: "completed",
      expiresAt,
    });

    // Save the document to the database
    const savedTrip = await newTripResponse.save();

    // Return the saved document as the response
    return res.status(200).json({
      success: true,
      message: "Trip plan generated and stored successfully",
      tripPlan: savedTrip,
    });
  } catch (error) {
    console.error("Error generating trip plan:", error);
    return res.status(400).json({
      success: false,
      message: "There was an issue analyzing your goal. Please try again later.",
      error: error.response ? error.response.data : error.message,
    });
  }
};