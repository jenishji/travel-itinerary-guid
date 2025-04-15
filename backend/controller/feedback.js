const Feedback = require("../model/feedmodel");

// Controller to handle feedback submissions
exports.submitFeedback = async (req, res) => {
  try {
    // Extract feedback details from the request body
    const { userName, userLocation, destination, rating, comment, tripId } = req.body;
    
    // Create a new feedback document
    const newFeedback = new Feedback({
      userName,
      userLocation,
      destination: destination || "Unknown Destination", // Fallback if not provided
      rating,
      comment,
      tripId, // tripId helps correlate feedback with a specific trip plan
      createdAt: new Date()
    });
    
    // Save the feedback to the database
    const savedFeedback = await newFeedback.save();
    
    // Respond with the saved feedback
    res.status(200).json({
      success: true,
      message: "Feedback submitted successfully",
      feedback: savedFeedback,
    });
  } catch (error) {
    console.error("Feedback submission error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to submit feedback",
      error: error.message,
    });
  }
};

// Controller to retrieve all feedback
exports.getAllFeedback = async (req, res) => {
  try {
    // Fetch all feedback records from the database
    const feedbacks = await Feedback.find({});

    // Return the feedbacks in the response
    res.status(200).json({
      success: true,
      feedbacks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve feedback",
      error: error.message,
    });
  }
};
