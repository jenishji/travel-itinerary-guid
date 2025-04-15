const axios = require('axios');
const NodeCache = require('node-cache');

// Cache with 1-hour TTL
const destinationCache = new NodeCache({ stdTTL: 3600 });

// Gemini API integration
const getGeminiDestinations = async (theme, destination) => {
  try {
    // This should be your actual Gemini API integration
    // Using environment variables for API key
    const apiKey = process.env.GEMINI_API_KEY;

    let promptText;
    if (destination && destination.toLowerCase() !== 'worldwide') {
      promptText = `Generate a JSON array of the top 12 travel destinations for ${theme.name} in ${destination}. Each destination should include: 
        id (number), name (string), location (specific area/region in ${destination}), shortDescription (one line), longDescription (3-4 sentences), bestTimeToVisit. Format as valid JSON only.`;
    } else {
      promptText = `Generate a JSON array of the top 12 travel destinations worldwide for ${theme.name}. Each destination should include: 
        id (number), name (string), location (country and region), shortDescription (one line), longDescription (3-4 sentences), bestTimeToVisit. Format as valid JSON only.`;
    }


    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        contents: [{
          parts: [{ text: promptText }]
        }]
      }
    );

    // Parse the response to get the JSON data
    const textResponse = response.data.candidates[0].content.parts[0].text;
    // Extract the JSON part from the response text (Gemini might wrap it)
    const jsonMatch = textResponse.match(/\[[\s\S]*\]/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    throw new Error("Invalid response format from Gemini API");
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

// Unsplash API integration 
// Unsplash API integration 
const getUnsplashImages = async (destinations, theme) => {
    try {
      // Using environment variables for API credentials
      const accessKey = process.env.UNSPLASH_ACCESS_KEY;
      
      // Add image URLs to destinations without caching
      const destinationsWithImages = await Promise.all(
        destinations.map(async (destination) => {
          try {
            const response = await axios.get(
              `https://api.unsplash.com/search/photos`, {
                params: {
                  // Use only the destination name for the query
                  query: destination.name,
                  per_page: 1
                },
                headers: {
                  Authorization: `Client-ID ${accessKey}`
                }
              }
            );
            
            const imageUrl = response.data.results[0]?.urls?.regular || 
                            `https://source.unsplash.com/random/800x600/?${encodeURIComponent(destination.name)}`;
            
            return { ...destination, imageUrl };
          } catch (error) {
            console.error(`Error fetching image for ${destination.name}:`, error);
            // Fallback to a placeholder if Unsplash API fails
            return { 
              ...destination, 
              imageUrl: `https://source.unsplash.com/random/800x600/?${encodeURIComponent(destination.name)}`
            };
          }
        })
      );
      return destinationsWithImages;
    } catch (error) {
      console.error("Error in getUnsplashImages:", error);
      throw error;
    }
  };
  
  
  

// Main controller function
exports.getDestinationsByTheme = async (req, res) => {
  try {
    const themeId = parseInt(req.params.themeId);
    // Extract the country from query parameters
    const destination = req.query.country || 'Worldwide';
    
    // Define themes for lookup
    const themes = [
      { id: 1, name: 'Beach Destinations' },
      { id: 2, name: 'Mountain Retreats' },
      { id: 3, name: 'City Breaks' },
      { id: 4, name: 'Adventure Trips' },
      { id: 5, name: 'Honeymoon Spots' },
      { id: 6, name: 'Family Vacations' },
      { id: 7, name: 'Cultural Tours' },
      { id: 8, name: 'Wildlife Safaris' },
    ];
    
    const theme = themes.find(t => t.id === themeId);
    
    if (!theme) {
      return res.status(404).json({
        success: false,
        message: 'Theme not found'
      });
    }
    
    // Check cache first - update cache key to include destination
    const cacheKey = `destinations_${themeId}_${destination}`;
    const cachedDestinations = destinationCache.get(cacheKey);
    
    if (cachedDestinations) {
      return res.status(200).json({
        success: true,
        destinations: cachedDestinations
      });
    }
    
    // If not in cache, fetch new data - pass the destination to getGeminiDestinations
    const destinations = await getGeminiDestinations(theme, destination);
    const destinationsWithImages = await getUnsplashImages(destinations, theme);
    
    // Cache the results with the updated cache key
    destinationCache.set(cacheKey, destinationsWithImages);
    
    return res.status(200).json({
      success: true,
      destinations: destinationsWithImages
    });
  } catch (error) {
    console.error("Error in getDestinationsByTheme:", error);
    return res.status(500).json({
      success: false,
      message: 'Error fetching destinations',
      error: error.message
    });
  }
};
