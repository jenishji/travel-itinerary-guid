const mongoose = require("mongoose");

const TripResponseSchema = new mongoose.Schema({
  // ... existing fields ...
  invitedUsers: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
  }],
  // Add method to check if a user is invited
//   isUserInvited: function(userId) {
//     return this.invitedUsers.includes(userId);
//   }
});

TripResponseSchema.methods.isUserInvited = function(userId) {
    return this.invitedUsers.includes(userId);
  };

// When accepting an invite, update the trip's invited users
TripResponseSchema.methods.addInvitedUser = function(userId) {
  if (!this.invitedUsers.includes(userId)) {
    this.invitedUsers.push(userId);
    return this.save();
  }
  return this;
};

module.exports = mongoose.models.TripResponse || mongoose.model("TripResponse", TripResponseSchema);