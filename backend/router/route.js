const express = require("express");
const router = express.Router();

const { generateTripPlan } = require("../controller/tripDetails");
const { getTripDetails } = require("../controller/getDetails");
const { getMyTripPlan, deleteMyTripPlan } = require("../controller/getMyTripPlan");
const { submitFeedback, getAllFeedback } = require("../controller/feedback");
const { sendTripEmail } = require('../controller/sendTripEmail');
const { getDestinationsByTheme } = require('../controller/destinationController');
const { signup, login, getMe } = require("../controller/authController");
const authMiddleware = require('../middleware/authMiddleware');
const { 
    sendTripInvite, 
    getPendingInvites, 
    respondToInvite,
    getInvitedTrips 
  } = require('../controller/tripInviteController');

router.post("/createtrip", generateTripPlan);
router.get("/trips/:tripId", getTripDetails);
router.get("/trip/my", authMiddleware, getMyTripPlan);
router.delete("/trip/my", authMiddleware, deleteMyTripPlan); // New endpoint to delete trip
router.post("/feedback", submitFeedback);
router.get("/feedback", getAllFeedback);
router.post("/sendTripEmail", sendTripEmail);
router.get('/destinations/theme/:themeId', getDestinationsByTheme);
router.post("/signup", signup);
router.post("/login", login);
router.get("/user/me", authMiddleware, getMe); // New endpoint to get current user

router.post('/trip/invite', authMiddleware, sendTripInvite);
router.get('/trip/invites', authMiddleware, getPendingInvites);
router.put('/trip/invite/:inviteId', authMiddleware, respondToInvite);
router.get('/trip/invited', authMiddleware, getInvitedTrips);


module.exports = router;