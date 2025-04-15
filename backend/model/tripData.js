const mongoose = require("mongoose");

const TripResponseSchema = new mongoose.Schema({
  destination: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  userLocation: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  
  // Structured itinerary with activities for each part of the day
  itinerary: [{
    date: { type: String, required: true },
    activities: [{
      morning: {
        activityName: String,
        estimatedDuration: String,
        location: String,
        routeInformation: String
      },
      afternoon: {
        activityName: String,
        estimatedDuration: String,
        location: String,
        routeInformation: String
      },
      evening: {
        activityName: String,
        estimatedDuration: String,
        location: String,
        routeInformation: String
      }
    }]
  }],
  
  // Travel tips with specific categories
  travelTips: [{
    type: mongoose.Schema.Types.Mixed
  }],
  
  // Hotel recommendations with pricing and website
  hotelRecommendations: [{
    hotelName: String,
    pricingDetails: String,
    websiteLink: String
  }],
  
  // Flight recommendations (skipped if user is near destination)
  flightRecommendations: [{
    flightName: String,
    pricingDetails: String,
    bookingWebsiteURL: String
  }],
  
  // Dining options with name, cuisine and price range
  diningOptions: { type: [String] },
  
  // Local events from external API
  localEvents: [{
    eventName: String,
    date: String,
    description: String,
    url: String
  }],
  
  // Activities requiring reservations with valid booking links
  reservations: [{
    "Name of the attraction/activity": String,
    "Booking link": String,
    "Recommended booking timeframe": String,
    "Estimated cost per person": String
  }],
  
  status: { type: String, required: true },
  expiresAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

// TTL index for automatic document expiration
TripResponseSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("TripResponse", TripResponseSchema);