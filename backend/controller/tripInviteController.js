const TripResponse = require('../model/TripResponse');
const TripInvitation = require('../model/TripInvitation');
const User = require('../model/user');

exports.sendTripInvite = async (req, res) => {

  try {
    const { tripId, invitedUserEmail } = req.body;
    const inviterId = req.userId;

    // Verify trip exists and belongs to inviter
    const trip = await TripResponse.findOne({ 
      _id: tripId, 
      userId: inviterId 
    });

    if (!trip) {
      return res.status(404).json({ 
        success: false, 
        message: 'Trip not found or you are not the trip owner' 
      });
    }

    // Find invited user
    const invitedUser = await User.findOne({ email: invitedUserEmail });
    
    if (!invitedUser) {
      return res.status(404).json({ 
        success: false, 
        message: 'User not found' 
      });
    }

    // Check if invite already exists
    const existingInvite = await TripInvitation.findOne({
      tripId,
      inviterId,
      invitedUserId: invitedUser._id,
      status: 'pending'
    });

    if (existingInvite) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invite already sent' 
      });
    }

    // Create new invite
    const invite = new TripInvitation({
      tripId,
      inviterId,
      invitedUserId: invitedUser._id
    });

    await invite.save();

    res.status(201).json({ 
      success: true, 
      message: 'Invite sent successfully',
      invite 
    });
  } catch (error) {
    console.error('Error sending trip invite:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

exports.getPendingInvites = async (req, res) => {
  try {
    const invites = await TripInvitation.find({
      invitedUserId: req.userId,
      status: 'pending'
    })
    .populate('tripId', 'destination date')
    .populate('inviterId', 'name');

    res.status(200).json({ 
      success: true, 
      invites 
    });
  } catch (error) {
    console.error('Error getting invites:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};


exports.respondToInvite = async (req, res) => {
  try {
    const { status } = req.body; // 'accepted' or 'rejected'
    const { inviteId } = req.params;

    const invite = await TripInvitation.findOneAndUpdate(
      { 
        _id: inviteId, 
        invitedUserId: req.userId,
        status: 'pending' 
      },
      { status },
      { new: true }
    ).populate('tripId');

    if (!invite) {
      return res.status(404).json({ 
        success: false, 
        message: 'Invite not found' 
      });
    }

    res.status(200).json({ 
      success: true, 
      invite 
    });
  } catch (error) {
    console.error('Error responding to invite:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error' 
    });
  }
};

exports.getInvitedTrips = async (req, res) => {
    try {
      const acceptedInvites = await TripInvitation.find({
        invitedUserId: req.userId,
        status: 'accepted'
      })
      .populate({
        path: 'tripId',
        select: 'destination date itinerary' // Only select necessary fields
      })
      .populate({
        path: 'inviterId',
        select: 'name'
      });
  
      const invitedTrips = acceptedInvites.map(invite => ({
        _id: invite.tripId._id,
        destination: invite.tripId.destination,
        date: invite.tripId.date,
        inviterName: invite.inviterId.name,
        itinerary: invite.tripId.itinerary
      }));
  
      res.status(200).json({
        success: true,
        invitedTrips
      });
    } catch (error) {
      console.error('Error getting invited trips:', error);
      res.status(500).json({
        success: false,
        message: 'Server error'
      });
    }
  };

