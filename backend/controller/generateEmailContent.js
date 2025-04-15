const generateEmailContent = (tripPlan) => {
  // Function to parse the itinerary from the AI response
  const parseItinerary = (itinerary) => {
    return itinerary.map(day => {
      const activities = day.activities.map(activity => {
        // Get time of day and details
        const timeKey = Object.keys(activity)[0]; // 'morning', 'afternoon', etc.
        const details = activity[timeKey];
        
        return {
          timeOfDay: timeKey,
          name: details.activityName,
          duration: details.estimatedDuration || '',
          location: details.location || '',
          routeInfo: details.routeInformation || ''
        };
      });
      
      return {
        date: day.date,
        activities: activities
      };
    });
  };

  // Extract destination from tripPlan if available, otherwise use default
  const destination = tripPlan.destination || "Bali, Indonesia";
  
  // Format the itinerary
  const formattedItinerary = tripPlan.itinerary ? parseItinerary(tripPlan.itinerary) : [];
  
  return `
    <html>
      <head>
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f9f9f9;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 650px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          .header {
            background: linear-gradient(135deg, #0693e3 0%, #38b6ff 100%);
            color: white;
            padding: 25px;
            border-radius: 8px 8px 0 0;
            text-align: center;
            margin: -30px -30px 20px -30px;
          }
          h1, h2, h3, h4 {
            color: #2c3e50;
            margin-top: 30px;
          }
          h1 {
            margin-top: 0;
            font-size: 28px;
          }
          h2 {
            font-size: 24px;
            border-bottom: 2px solid #f0f0f0;
            padding-bottom: 10px;
          }
          h3 {
            font-size: 20px;
            margin-bottom: 15px;
          }
          h4 {
            margin-bottom: 5px;
            background-color: #f8f8f8;
            padding: 8px 12px;
            border-radius: 5px;
            display: inline-block;
          }
          ul {
            margin-top: 5px;
            padding-left: 25px;
          }
          li {
            margin-bottom: 10px;
          }
          .day-card {
            background-color: #ffffff;
            border-left: 4px solid #38b6ff;
            padding: 10px 15px;
            margin-bottom: 20px;
            border-radius: 5px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          }
          .activity {
            display: flex;
            margin-bottom: 15px;
          }
          .time-badge {
            background-color: #38b6ff;
            color: white;
            padding: 3px 8px;
            border-radius: 12px;
            font-size: 14px;
            margin-right: 10px;
            min-width: 90px;
            text-align: center;
          }
          .activity-details {
            flex-grow: 1;
          }
          .detail-item {
            margin-top: 5px;
            font-size: 14px;
            color: #555;
          }
          .hotel-card, .flight-card, .dining-card {
            border: 1px solid #eaeaea;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 5px;
          }
          .hotel-card {
            border-left: 4px solid #4CAF50;
          }
          .flight-card {
            border-left: 4px solid #FF9800;
          }
          .dining-card {
            border-left: 4px solid #E91E63;
          }
          .tip-item {
            background-color: #fff9c4;
            padding: 12px 15px;
            border-radius: 5px;
            margin-bottom: 10px;
          }
          .tip-icon {
            font-weight: bold;
            margin-right: 8px;
            color: #FF9800;
          }
          a {
            color: #2980b9;
            text-decoration: none;
          }
          a:hover {
            text-decoration: underline;
          }
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #eaeaea;
            color: #7f8c8d;
            font-size: 14px;
          }
          .accent-divider {
            height: 3px;
            background: linear-gradient(to right, #0693e3, #38b6ff, #4CAF50, #FF9800, #E91E63);
            margin: 25px 0;
            border-radius: 3px;
          }
          .banner {
            width: 100%;
            height: 150px;
            background-image: url('https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=800&h=200');
            background-size: cover;
            background-position: center;
            border-radius: 5px;
            margin: 20px 0;
            position: relative;
          }
          .banner-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            padding: 15px;
            color: white;
            border-radius: 0 0 5px 5px;
          }
          .banner-text {
            margin: 0;
            font-size: 24px;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Your ${destination} Adventure</h1>
            <p>Experience the magic of the Island of Gods</p>
          </div>
          
          <div class="banner">
            <div class="banner-overlay">
              <p class="banner-text">Paradise Awaits</p>
            </div>
          </div>
          
          <p>Dear Traveler,</p>
          <p>We're excited to share your personalized travel plan for your upcoming trip to ${destination}! Below you'll find all the details you need to make your journey unforgettable.</p>
          
          <div class="accent-divider"></div>
          
          <h2>Your Itinerary</h2>
          
          ${formattedItinerary.map(day => {
            const formattedDate = new Date(day.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            });
            
            return `
              <div class="day-card">
                <h3>${formattedDate}</h3>
                ${day.activities.map(activity => `
                  <div class="activity">
                    <span class="time-badge">${activity.timeOfDay.charAt(0).toUpperCase() + activity.timeOfDay.slice(1)}</span>
                    <div class="activity-details">
                      <strong>${activity.name}</strong>
                      ${activity.duration ? `<div class="detail-item"><strong>Duration:</strong> ${activity.duration}</div>` : ''}
                      ${activity.location ? `<div class="detail-item"><strong>Location:</strong> ${activity.location}</div>` : ''}
                      ${activity.routeInfo ? `<div class="detail-item"><strong>How to get there:</strong> ${activity.routeInfo}</div>` : ''}
                    </div>
                  </div>
                `).join('')}
              </div>
            `;
          }).join('')}
          
          <div class="accent-divider"></div>
          
          <h2>Travel Tips</h2>
          ${tripPlan.travelTips && tripPlan.travelTips.map((tip, index) => {
            // Handle different tip formats
            let tipTitle = '';
            let tipContent = '';
            
            if (typeof tip === 'string') {
              tipContent = tip;
            } else if (typeof tip === 'object') {
              tipTitle = Object.keys(tip)[0];
              tipContent = tip[tipTitle];
            }
            
            // Set icons based on tip types
            let tipIcon = '💡';
            if (tipTitle.toLowerCase().includes('weather')) tipIcon = '☀️';
            if (tipTitle.toLowerCase().includes('safety')) tipIcon = '🛡️';
            if (tipTitle.toLowerCase().includes('transport')) tipIcon = '🚗';
            if (tipTitle.toLowerCase().includes('cultural') || tipTitle.toLowerCase().includes('etiquette')) tipIcon = '🙏';
            
            return `
              <div class="tip-item">
                <span class="tip-icon">${tipIcon}</span> <strong>${tipTitle || 'Tip'}:</strong> ${tipContent || 'Information not available'}
              </div>
            `;
          }).join('')}
          
          <div class="accent-divider"></div>
          
          <h2>Accommodation Options</h2>
          ${tripPlan.hotelRecommendations && tripPlan.hotelRecommendations.map(hotel => `
            <div class="hotel-card">
              <h3>${hotel.hotelName}</h3>
              <p><strong>Price Range:</strong> ${hotel.pricingDetails}</p>
              ${hotel.websiteLink && hotel.websiteLink !== "N/A" ? `<p><a href="${hotel.websiteLink}" target="_blank">Visit Hotel Website →</a></p>` : ''}
            </div>
          `).join('')}
          
          <div class="accent-divider"></div>
          
          <h2>Flight Options</h2>
          ${tripPlan.flightRecommendations && tripPlan.flightRecommendations.length > 0 ? 
            tripPlan.flightRecommendations.map(flight => `
              <div class="flight-card">
                <h3>${flight.flightName}</h3>
                <p><strong>Price Range:</strong> ${flight.pricingDetails}</p>
                ${flight.bookingWebsiteURL ? `<p><a href="${flight.bookingWebsiteURL}" target="_blank">Check Flight Availability →</a></p>` : ''}
              </div>
            `).join('') : 
            `<p>No flight information available.</p>`
          }
          
          <div class="accent-divider"></div>
          
          <h2>Dining Recommendations</h2>
          ${tripPlan.diningOptions && tripPlan.diningOptions.length > 0 ? 
            tripPlan.diningOptions.map(dining => {
              // Parse the dining option string or object
              let name = '';
              let cuisine = '';
              let priceRange = '';
              
              if (typeof dining === 'string') {
                const parts = dining.split(',');
                name = parts[0].trim();
                cuisine = parts.length > 1 ? parts[1].trim() : '';
                priceRange = parts.length > 2 ? parts[2].trim() : '';
              } else if (typeof dining === 'object') {
                name = dining.restaurantName || '';
                cuisine = dining.cuisine || '';
                priceRange = dining.priceRange || '';
              }
              
              return `
                <div class="dining-card">
                  <h3>${name}</h3>
                  ${cuisine ? `<p><strong>Cuisine:</strong> ${cuisine}</p>` : ''}
                  ${priceRange ? `<p><strong>Price Range:</strong> ${priceRange}</p>` : ''}
                </div>
              `;
            }).join('') :
            `<p>No dining recommendations available.</p>`
          }
          
          <div class="accent-divider"></div>
          
          <h2>Important Reservations</h2>
          ${tripPlan.reservations && tripPlan.reservations.length > 0 ? 
            tripPlan.reservations.map(reservation => {
              // Handle different object structures
              const attractionName = reservation["Name of the attraction/activity"] || reservation.attractionName || '';
              const bookingLink = reservation["Booking link"] || reservation.bookingLink || '';
              const timeframe = reservation["Recommended booking timeframe"] || reservation.bookingTimeframe || '';
              const cost = reservation["Estimated cost per person"] || reservation.estimatedCost || '';
              
              return `
                <div class="tip-item">
                  <h3>${attractionName}</h3>
                  ${timeframe ? `<p><strong>Booking Window:</strong> ${timeframe}</p>` : ''}
                  ${cost ? `<p><strong>Estimated Cost:</strong> ${cost}</p>` : ''}
                  ${bookingLink && bookingLink !== "N/A" ? `<p><a href="${bookingLink}" target="_blank">Book Now →</a></p>` : ''}
                </div>
              `;
            }).join('') :
            `<p>No advance reservations needed for this trip.</p>`
          }
          
          <div class="footer">
            <p>Thank you for choosing <strong>Travel AI Guide</strong> for your trip planning needs!</p>
            <p>For any questions or further assistance, please don't hesitate to contact us.</p>
            <p>Safe travels and enjoy your adventure in beautiful ${destination}!</p>
          </div>
        </div>
      </body>
    </html>
  `;
};

module.exports = generateEmailContent;