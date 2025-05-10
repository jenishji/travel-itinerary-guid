import React from 'react';
import { X, ChevronRight, MapPin } from 'lucide-react';

const InviterTripsModal = ({ inviterName, trips, onClose, onSelectTrip }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-800">
            {inviterName}'s Trips
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>

        <div className="space-y-4">
          {trips.map(trip => (
            <div
              key={trip._id}
              className="border rounded-lg p-4 hover:bg-blue-50 cursor-pointer"
              onClick={() => onSelectTrip(trip)}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MapPin className="text-blue-500" size={20} />
                    <h3 className="text-lg font-semibold text-blue-700">
                      {trip.destination} Trip
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500">
                    Trip Date: {new Date(trip.date).toLocaleDateString()}
                  </p>
                </div>
                <ChevronRight className="text-blue-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InviterTripsModal;