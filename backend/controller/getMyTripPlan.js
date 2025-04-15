const TripResponse = require("../model/tripData");

exports.getMyTripPlan = async (req, res) => {
  try {
    // Assume an authentication middleware has set req.userId
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please log in.",
      });
    }
    
    const trip = await TripResponse.findOne({ userId });
    
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: "No trip plan found for this user.",
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

exports.deleteMyTripPlan = async (req, res) => {
  try {
    // Import your Trip model at the top of the file
    // const Trip = require('../model/trip');
    
    // Find and delete the trip plan associated with the user
    const deletedTrip = await TripResponse.findOneAndDelete({ userId: req.userId });
    
    if (!deletedTrip) {
      return res.status(404).json({
        success: false,
        message: 'No trip plan found to delete'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Trip plan deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting trip plan',
      error: error.message
    });
  }
};
