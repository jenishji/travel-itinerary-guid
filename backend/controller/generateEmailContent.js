/**
 * Generates a responsive HTML email template for a trip plan
 * @param {Object} tripPlan - The trip plan data from TripResponse schema
 * @returns {String} HTML content for email
 */
const generateEmailContent = (tripPlan) => {
  // Format date as "Month Day, Year"
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Format day of week and date as "Day, Month Day"
  const formatDayAndDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    });
  };

  // Generate an emoji based on the time of day
  const getTimeEmoji = (timeOfDay) => {
    switch(timeOfDay.toLowerCase()) {
      case 'morning': return '🌅';
      case 'afternoon': return '☀️';
      case 'evening': return '🌙';
      default: return '⏰';
    }
  };

  // Generate activity HTML for each day's activities
  const generateActivitiesHTML = (activities) => {
    if (!activities || !Array.isArray(activities)) return '';
    
    // Group activities by time of day (morning, afternoon, evening)
    const timeSlots = ['morning', 'afternoon', 'evening'];
    let activitiesHTML = '';
    
    // For each time slot, create a section
    timeSlots.forEach(timeSlot => {
      // Check if any activities exist for this time slot
      const activitiesForTimeSlot = activities.filter(activityObject => 
        activityObject[timeSlot] && activityObject[timeSlot].activityName
      );
      
      if (activitiesForTimeSlot.length > 0) {
        const emoji = getTimeEmoji(timeSlot);
        
        // Create a time slot section
        activitiesHTML += `
          <div class="time-section">
            <h3 class="time-heading">
              <span class="emoji">${emoji}</span>
              ${timeSlot.charAt(0).toUpperCase() + timeSlot.slice(1)}
            </h3>
            <div class="time-activities">
        `;
        
        // Add all activities for this time slot
        activitiesForTimeSlot.forEach(activityObject => {
          const activityDetails = activityObject[timeSlot];
          
          activitiesHTML += `
            <div class="activity">
              <div class="activity-details">
                <h4>${activityDetails.activityName}</h4>
                ${activityDetails.estimatedDuration ? `<p class="detail"><strong>Duration:</strong> ${activityDetails.estimatedDuration}</p>` : ''}
                ${activityDetails.location ? `<p class="detail"><strong>Location:</strong> ${activityDetails.location}</p>` : ''}
                ${activityDetails.routeInformation ? `<p class="detail"><strong>Getting there:</strong> ${activityDetails.routeInformation}</p>` : ''}
              </div>
            </div>
          `;
        });
        
        // Close the time slot section
        activitiesHTML += `
            </div>
          </div>
        `;
      }
    });
    
    return activitiesHTML;
  };

  // Process travel tips with consistent formatting
  const processTravelTips = (tips) => {
    if (!tips || !Array.isArray(tips) || tips.length === 0) {
      return '<p>No specific travel tips available for this destination.</p>';
    }

    return tips.map((tip, index) => {
      // Handle both string and object formats
      let tipContent = "";
      let tipTitle = `Tip ${index + 1}`;
      
      if (typeof tip === 'string') {
        tipContent = tip;
      } else if (typeof tip === 'object') {
        const key = Object.keys(tip)[0];
        tipTitle = key;
        tipContent = tip[key];
      }

      // Select an appropriate icon based on tip title
      let icon = '💡'; // default
      if (tipTitle.toLowerCase().includes('weather')) icon = '🌦️';
      if (tipTitle.toLowerCase().includes('transport')) icon = '🚕';
      if (tipTitle.toLowerCase().includes('culture') || tipTitle.toLowerCase().includes('custom')) icon = '🏛️';
      if (tipTitle.toLowerCase().includes('safety') || tipTitle.toLowerCase().includes('health')) icon = '🛡️';
      if (tipTitle.toLowerCase().includes('money') || tipTitle.toLowerCase().includes('currency')) icon = '💰';
      if (tipTitle.toLowerCase().includes('food') || tipTitle.toLowerCase().includes('dining')) icon = '🍽️';
      
      return `
        <div class="tip-card">
          <div class="tip-icon">${icon}</div>
          <div class="tip-content">
            <h4>${tipTitle}</h4>
            <p>${tipContent}</p>
          </div>
        </div>
      `;
    }).join('');
  };

  // Process hotel recommendations
  const processHotels = (hotels) => {
    if (!hotels || !Array.isArray(hotels) || hotels.length === 0) {
      return '<p>No specific hotel recommendations available for this trip.</p>';
    }

    return hotels.map(hotel => `
      <div class="accommodation-card">
        <h4>${hotel.hotelName}</h4>
        <p class="price">${hotel.pricingDetails}</p>
        ${hotel.websiteLink && hotel.websiteLink !== "N/A" 
          ? `<a href="${hotel.websiteLink}" class="button">Visit Website</a>` 
          : ''}
      </div>
    `).join('');
  };

  // Process flight recommendations
  const processFlights = (flights) => {
    if (!flights || !Array.isArray(flights) || flights.length === 0) {
      return '<p>No flight recommendations needed for this trip.</p>';
    }

    return flights.map(flight => `
      <div class="flight-card">
        <h4>${flight.flightName}</h4>
        <p class="price">${flight.pricingDetails}</p>
        ${flight.bookingWebsiteURL 
          ? `<a href="${flight.bookingWebsiteURL}" class="button">Check Availability</a>` 
          : ''}
      </div>
    `).join('');
  };

  // Process dining options
  const processDining = (dining) => {
    if (!dining || !Array.isArray(dining) || dining.length === 0) {
      return '<p>No specific dining recommendations available for this trip.</p>';
    }

    return dining.map(option => {
      // Handle both object format and string format
      let restaurantName, cuisine, priceRange;
      
      if (typeof option === 'string') {
        // Parse the string format "RestaurantName, Cuisine, PriceRange"
        const parts = option.split(',').map(part => part.trim());
        restaurantName = parts[0];
        cuisine = parts.length > 1 ? parts[1] : '';
        priceRange = parts.length > 2 ? parts[2] : '';
      } else if (typeof option === 'object') {
        restaurantName = option.restaurantName;
        cuisine = option.cuisine;
        priceRange = option.priceRange;
      }
      
      return `
        <div class="dining-card">
          <h4>${restaurantName}</h4>
          ${cuisine ? `<p><strong>Cuisine:</strong> ${cuisine}</p>` : ''}
          ${priceRange ? `<p><strong>Price:</strong> ${priceRange}</p>` : ''}
        </div>
      `;
    }).join('');
  };

  // Process reservations
  const processReservations = (reservations) => {
    if (!reservations || !Array.isArray(reservations) || reservations.length === 0) {
      return '<p>No advance reservations needed for this trip.</p>';
    }

    return reservations.map(reservation => {
      // Handle different object structures
      const attractionName = reservation["Name of the attraction/activity"] || reservation.attractionName;
      const bookingLink = reservation["Booking link"] || reservation.bookingLink;
      const timeframe = reservation["Recommended booking timeframe"] || reservation.bookingTimeframe;
      const cost = reservation["Estimated cost per person"] || reservation.estimatedCost;
      
      return `
        <div class="reservation-card">
          <h4>${attractionName}</h4>
          ${timeframe ? `<p><strong>When to book:</strong> ${timeframe}</p>` : ''}
          ${cost ? `<p><strong>Cost:</strong> ${cost}</p>` : ''}
          ${bookingLink && bookingLink !== "N/A" 
            ? `<a href="${bookingLink}" class="button">Book Now</a>` 
            : ''}
        </div>
      `;
    }).join('');
  };

  // Process local events
  const processEvents = (events) => {
    if (!events || !Array.isArray(events) || events.length === 0) {
      return '<p>No specific local events found for your travel dates.</p>';
    }

    return events.map(event => {
      // Handle different event object structures
      const eventName = event.eventName || event.name;
      const eventDate = event.date ? formatDate(event.date) : '';
      const eventDescription = event.description || '';
      
      return `
        <div class="event-card">
          <h4>${eventName}</h4>
          ${eventDate ? `<p class="event-date">📅 ${eventDate}</p>` : ''}
          ${eventDescription ? `<p>${eventDescription}</p>` : ''}
        </div>
      `;
    }).join('');
  };

  // Determine if primary heading background image should be related to destination
  const getDestinationImageKeyword = (destination) => {
    const lowercaseDest = destination.toLowerCase();
    
    // Beach destinations
    if (lowercaseDest.includes('bali') || 
        lowercaseDest.includes('hawaii') || 
        lowercaseDest.includes('maldives') ||
        lowercaseDest.includes('cancun')) {
      return 'beach';
    }
    
    // Mountain destinations
    if (lowercaseDest.includes('alps') || 
        lowercaseDest.includes('rocky') || 
        lowercaseDest.includes('himalayas') ||
        lowercaseDest.includes('mountain')) {
      return 'mountains';
    }
    
    // Urban destinations
    if (lowercaseDest.includes('new york') || 
        lowercaseDest.includes('london') || 
        lowercaseDest.includes('tokyo') ||
        lowercaseDest.includes('paris')) {
      return 'city';
    }
    
    // Default to generic travel
    return 'travel';
  };

  // Generate a dynamic color scheme based on destination
  const generateColorScheme = (destination) => {
    const destinationType = getDestinationImageKeyword(destination);
    
    const colorSchemes = {
      beach: {
        primary: '#0693e3',
        secondary: '#38b6ff',
        accent: '#FF9800',
        gradient: 'linear-gradient(135deg, #0693e3 0%, #38b6ff 100%)'
      },
      mountains: {
        primary: '#2E7D32',
        secondary: '#4CAF50',
        accent: '#8BC34A',
        gradient: 'linear-gradient(135deg, #2E7D32 0%, #4CAF50 100%)'
      },
      city: {
        primary: '#5D4037',
        secondary: '#795548',
        accent: '#FF5722',
        gradient: 'linear-gradient(135deg, #5D4037 0%, #795548 100%)'
      },
      travel: {
        primary: '#303F9F',
        secondary: '#3F51B5',
        accent: '#FF4081',
        gradient: 'linear-gradient(135deg, #303F9F 0%, #3F51B5 100%)'
      }
    };
    
    return colorSchemes[destinationType];
  };

  // Extract destination, or use default
  const destination = tripPlan.destination || "Your Adventure";
  const colors = generateColorScheme(destination);
  
  // Generate HTML for full email
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${destination} Travel Plan</title>
  <style>
    /* Base styles */
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f9f9f9;
      margin: 0;
      padding: 0;
    }
    
    /* Container */
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }
    
    /* Header styles */
    .header {
      background: ${colors.gradient};
      color: white;
      padding: 30px;
      text-align: center;
    }
    
    .header h1 {
      margin: 0;
      font-size: 32px;
      font-weight: 700;
    }
    
    .header p {
      margin-top: 10px;
      opacity: 0.9;
      font-size: 18px;
    }
    
    /* Content area */
    .content {
      padding: 30px;
    }
    
    /* Section styling */
    .section {
      margin-bottom: 40px;
    }
    
    .section-title {
      color: ${colors.primary};
      font-size: 24px;
      margin-bottom: 20px;
      padding-bottom: 10px;
      border-bottom: 2px solid ${colors.secondary};
    }
    
    /* Days */
    .day {
      margin-bottom: 30px;
      border-left: 4px solid ${colors.secondary};
      padding-left: 15px;
    }
    
    .day-header {
      font-size: 18px;
      font-weight: 600;
      color: ${colors.primary};
      cursor: pointer;
      padding: 12px 0;
      display: flex;
      align-items: center;
      user-select: none;
    }
    
    .day-details {
      margin-bottom: 10px;
    }
    
    .day-details summary {
      list-style: none;
      position: relative;
    }
    
    .day-details summary::-webkit-details-marker {
      display: none;
    }
    
    .day-details summary::before {
      content: '▶';
      font-size: 14px;
      color: ${colors.primary};
      margin-right: 8px;
      transition: transform 0.3s ease;
    }
    
    .day-details[open] summary::before {
      transform: rotate(90deg);
    }
    
    .day-content {
      padding-left: 10px;
      margin-top: 10px;
    }
    
    /* Time sections */
    .time-section {
      margin-bottom: 20px;
    }
    
    .time-heading {
      display: flex;
      align-items: center;
      color: ${colors.primary};
      font-size: 16px;
      margin-bottom: 10px;
      padding-bottom: 5px;
      border-bottom: 1px solid ${colors.secondary};
    }
    
    .time-heading .emoji {
      margin-right: 8px;
      font-size: 20px;
    }
    
    .time-activities {
      padding-left: 10px;
    }
    
    /* Activities */
    .activity {
      margin-bottom: 20px;
      background-color: #f9f9f9;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .emoji {
      font-size: 24px;
      margin-right: 8px;
    }
    
    .activity-details {
      padding: 15px;
    }
    
    .activity-details h4 {
      margin: 0 0 10px 0;
      color: #333;
    }
    
    .detail {
      margin: 5px 0;
      font-size: 14px;
      color: #555;
    }
    
    /* Cards for recommendations */
    .tip-card, .accommodation-card, .flight-card, .dining-card, .reservation-card, .event-card {
      padding: 15px;
      margin-bottom: 15px;
      border-radius: 8px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .tip-card {
      background-color: #FFF8E1;
      display: flex;
    }
    
    .tip-icon {
      font-size: 24px;
      margin-right: 15px;
      display: flex;
      align-items: center;
    }
    
    .tip-content {
      flex-grow: 1;
    }
    
    .tip-content h4 {
      margin: 0 0 10px 0;
      color: #5D4037;
    }
    
    .accommodation-card {
      background-color: #E8F5E9;
      border-left: 5px solid #4CAF50;
    }
    
    .flight-card {
      background-color: #E3F2FD;
      border-left: 5px solid #2196F3;
    }
    
    .dining-card {
      background-color: #FFF3E0;
      border-left: 5px solid #FF9800;
    }
    
    .reservation-card {
      background-color: #F3E5F5;
      border-left: 5px solid #9C27B0;
    }
    
    .event-card {
      background-color: #E8EAF6;
      border-left: 5px solid #3F51B5;
    }
    
    .price {
      color: #FF9800;
      font-weight: 500;
    }
    
    .event-date {
      color: #3F51B5;
      font-weight: 500;
    }
    
    /* Button styling */
    .button {
      display: inline-block;
      background-color: ${colors.accent};
      color: white;
      padding: 8px 15px;
      text-decoration: none;
      border-radius: 4px;
      font-weight: 500;
      margin-top: 10px;
    }
    
    /* Footer */
    .footer {
      background-color: #f5f5f5;
      text-align: center;
      padding: 20px;
      color: #666;
      font-size: 14px;
      border-top: 1px solid #e0e0e0;
    }
    
    /* Divider */
    .divider {
      height: 3px;
      background: ${colors.gradient};
      margin: 30px 0;
    }
    
    /* Responsive fixes */
    @media (max-width: 600px) {
      .header {
        padding: 20px;
      }
      
      .content {
        padding: 15px;
      }
      
      .activity {
        flex-direction: column;
      }
      
      .time-badge {
        flex-direction: row;
        padding: 8px;
        justify-content: flex-start;
        min-width: auto;
      }
      
      .emoji {
        margin-bottom: 0;
        margin-right: 10px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Your ${destination} Adventure</h1>
      <p>${tripPlan.duration ? `${tripPlan.duration}-Day Personalized Travel Plan` : 'Personalized Travel Plan'}</p>
    </div>
    
    <div class="content">
      <p>Dear Traveler,</p>
      
      <p>We're excited to share your personalized travel plan for your upcoming adventure to ${destination}! 
      This itinerary is designed to give you the perfect balance of must-see attractions, local experiences, 
      and free time to explore on your own.</p>
      
      <div class="divider"></div>
      
      <!-- Itinerary Section -->
      <div class="section">
        <h2 class="section-title">Your Itinerary</h2>
        
        ${tripPlan.itinerary && tripPlan.itinerary.map((day, index) => `
          <div class="day">
            <details class="day-details">
              <summary class="day-header">
                Day ${index + 1}: ${formatDayAndDate(day.date)}
              </summary>
              <div class="day-content">
                ${generateActivitiesHTML(day.activities)}
              </div>
            </details>
          </div>
        `).join('')}
      </div>
      
      <div class="divider"></div>
      
      <!-- Travel Tips Section -->
      <div class="section">
        <h2 class="section-title">Travel Tips</h2>
        ${processTravelTips(tripPlan.travelTips)}
      </div>
      
      <div class="divider"></div>
      
      <!-- Accommodation Section -->
      <div class="section">
        <h2 class="section-title">Where to Stay</h2>
        ${processHotels(tripPlan.hotelRecommendations)}
      </div>
      
      <div class="divider"></div>
      
      <!-- Flights Section -->
      <div class="section">
        <h2 class="section-title">Flight Options</h2>
        ${processFlights(tripPlan.flightRecommendations)}
      </div>
      
      <div class="divider"></div>
      
      <!-- Dining Section -->
      <div class="section">
        <h2 class="section-title">Where to Eat</h2>
        ${processDining(tripPlan.diningOptions)}
      </div>
      
      <div class="divider"></div>
      
      <!-- Reservations Section -->
      <div class="section">
        <h2 class="section-title">Recommended Reservations</h2>
        ${processReservations(tripPlan.reservations)}
      </div>
      
      ${tripPlan.localEvents && tripPlan.localEvents.length > 0 ? `
        <div class="divider"></div>
        
        <!-- Local Events Section -->
        <div class="section">
          <h2 class="section-title">Local Events</h2>
          ${processEvents(tripPlan.localEvents)}
        </div>
      ` : ''}
    </div>
    
    <div class="footer">
      <p><strong>Travel AI Guide</strong> - Your Personal Travel Assistant</p>
      <p>Safe travels and enjoy your adventure in beautiful ${destination}!</p>
      <p><small>This email was generated based on your trip specifications.</small></p>
    </div>
  </div>
</body>
</html>
  `;
};

module.exports = generateEmailContent;