// controller/getTripDetails.js
const TripResponse = require("../model/tripData");

exports.getTripDetails = async (req, res) => {
  try {
    const { tripId } = req.params;
    const trip = await TripResponse.findById(tripId);
    
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "Trip plan not found",
      });
    }
    
    res.status(200).json({
      success: true,
      tripPlan: trip,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving trip plan",
      error: error.message,
    });
  }
};
