const mongoose = require('mongoose');

const TripInvitationSchema = new mongoose.Schema({
  tripId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TripResponse',
    required: true
  },
  inviterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  invitedUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    default: () => new Date(+new Date() + 7*24*60*60*1000) // 7 days from now
  }
});

// Index to ensure unique pending invites
TripInvitationSchema.index(
  { tripId: 1, inviterId: 1, invitedUserId: 1, status: 1 }, 
  { unique: true }
);

module.exports = mongoose.model('TripInvitation', TripInvitationSchema);