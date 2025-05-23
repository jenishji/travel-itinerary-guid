import React from 'react';
import { X, ChevronRight, User } from 'lucide-react';

const InvitedTripsModal = ({ trips, onClose, onSelectInviter }) => {
  // Group trips by inviter
  const tripsByInviter = trips.reduce((acc, trip) => {
    const inviterKey = trip.inviterId;
    if (!acc[inviterKey]) {
      acc[inviterKey] = {
        inviterName: trip.inviterName,
        trips: []
      };
    }
    acc[inviterKey].trips.push(trip);
    return acc;
  }, {});



  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">Trip Invitations</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        {Object.keys(tripsByInviter).length === 0 ? (
          <p className="text-center text-gray-500">No trip invitations</p>
        ) : (
          <div className="space-y-4">
            {Object.entries(tripsByInviter).map(([inviterId, inviterData]) => (
              <div
                key={inviterId}
                className="border rounded-lg p-4 hover:bg-blue-50 cursor-pointer"
                onClick={() => onSelectInviter(inviterData.inviterName, inviterData.trips)}
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-3">
                    <User className="text-blue-500" />
                    <div>
                      <h3 className="text-lg font-semibold text-blue-700">
                        {inviterData.inviterName}
                      </h3>
                    </div>
                  </div>
                  <ChevronRight className="text-blue-500" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvitedTripsModal;