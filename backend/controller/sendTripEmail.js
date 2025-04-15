const nodemailer = require('nodemailer');
const TripResponse = require('../model/tripData');
const generateEmailContent = require('./generateEmailContent'); 


exports.sendTripEmail = async (req, res) => {
  const { email, tripId } = req.body;

  try {
    // Retrieve the trip plan from the database
    const tripPlan = await TripResponse.findById(tripId);
    if (!tripPlan) {
      return res.status(404).json({ success: false, message: 'Trip plan not found.' });
    }

    // Create a transporter using your email service credentials
    let transporter = nodemailer.createTransport({
      service: 'Gmail', // Change as needed (e.g., 'SendGrid', 'Mailgun', etc.)
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER, // Your email address
        pass: process.env.EMAIL_PASS  // Your email password or app-specific password
      }
    });

    // let mailOptions = {
    //     from: process.env.EMAIL_USER,
    //     to: email,
    //     subject: `Your Trip Plan to destination`,
    //     text: "hello",
    //   };


    // Set up the email options
    let mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Trip Plan to ${tripPlan.destination}`,
      html: generateEmailContent(tripPlan)
    };

    // Send the email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ success: false, message: "Failed to send email.", error: error.message });
      }
      return res.status(200).json({ success: true, message: "Trip plan emailed successfully." });
    });
  } catch (err) {
    console.error("Error in sendTripEmail:", err);
    return res.status(500).json({ success: false, message: "An error occurred while sending email.", error: err.message });
  }
};
