const TripResponse = require("../model/tripData");

exports.deleteTripPlan = async (req, res) => {
  try {
    // Ensure the auth middleware sets req.userId from the token
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access. Please log in.",
      });
    }

    // Delete the trip plan that belongs to this user.
    // Make sure your TripResponse schema has a field (e.g., 'user') that stores the user ID.
    const deletedTrip = await TripResponse.findOneAndDelete({ user: userId });
    if (!deletedTrip) {
      return res.status(404).json({
        success: false,
        message: "Trip plan not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Trip plan deleted successfully.",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error deleting trip plan.",
      error: error.message,
    });
  }
};
