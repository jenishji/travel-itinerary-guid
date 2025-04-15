import React, { useState } from 'react';
import FeedbackForm from './FeedbackForm';
import EmailTripPlan from './EmailTripPlan';
import { motion } from 'framer-motion';
import { IoMdCloseCircle } from "react-icons/io";
import InviteFriendModal from './InviteFriend';
import { UserPlus } from 'lucide-react';

const TripPlan = ({ tripData, onFeedbackSubmit, onClose }) => {
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [showEmailForm, setShowEmailForm] = useState(false);
  const [activeTab, setActiveTab] = useState('itinerary');
  const [showInviteModal, setShowInviteModal] = useState(false);
  
  const tabs = [
    { id: 'itinerary', label: 'Itinerary' },
    { id: 'tips', label: 'Travel Tips' },
    { id: 'hotels', label: 'Hotels' },
    { id: 'flights', label: 'Flights' },
    { id: 'dining', label: 'Dining' },
    { id: 'reservations', label: 'Reservations' },  // Added Reservations tab
    { id: 'events', label: 'Local Events' },
  ];

  const handleEmailPlan = () => {
    setShowEmailForm(true);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <button 
              onClick={onClose}
              className="absolute top-4 right-5 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              <IoMdCloseCircle />
            </button>
      <div className="bg-gradient-to-r from-blue-700 to-blue-600 text-white p-6 flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">{tripData.destination} Trip Plan</h2>
          <p className="mt-2 opacity-90">
            {new Date(tripData.date).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} • {tripData.itinerary.length} days
          </p>
        </div>
        <div className="flex space-x-2 flex-wrap gap-3">
          <motion.button
            onClick={handleEmailPlan}
            className="bg-white text-blue-700 hover:bg-blue-50 font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Email Trip Plan
          </motion.button>
          <motion.button
            onClick={() => setShowFeedbackForm(true)}
            className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Provide Feedback
          </motion.button>
          <motion.button
            onClick={() => setShowInviteModal(true)}
            className="bg-green-400 hover:bg-green-500 text-blue-900 font-medium py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-sm flex items-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <UserPlus className="mr-2" size={18} />
            Invite Friend
          </motion.button>
        </div>
    </div>

    {showInviteModal && (
        <InviteFriendModal 
          tripId={tripData._id}
          onClose={() => setShowInviteModal(false)}
          onInviteSent={() => {
            // Optional: Add any additional logic after invite is sent
          }}
        />
      )}

    {/* Render EmailTripPlan Modal */}
    {showEmailForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <EmailTripPlan 
            tripId={tripData._id}
            onEmailSent={() => setShowEmailForm(false)}
            onCancel={() => setShowEmailForm(false)}
          />
        </div>
      )}
      
      {/* Tab Navigation */}
      <div className="flex overflow-x-auto bg-blue-50 border-b border-blue-100 py-1 px-2">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-5 py-3 text-sm font-medium mx-1 rounded-t-lg whitespace-nowrap transition-all duration-300 ${
              activeTab === tab.id
                ? 'text-blue-700 bg-white shadow-sm border-b-2 border-blue-500'
                : 'text-gray-600 hover:text-blue-700 hover:bg-white/50'
            }`}
            whileHover={{ y: -2 }}
            whileTap={{ y: 0 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
      
      {/* Tab Content */}
      <motion.div 
        className="p-6"
        key={activeTab}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeTab === 'itinerary' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-800">Your Itinerary</h3>
            {tripData.itinerary.map((day, index) => (
              <motion.div 
                key={index} 
                className="mb-6 pb-6 border-b border-gray-200 last:border-b-0"
                variants={itemVariants}
              >
                <h4 className="text-lg font-semibold mb-3 flex items-center">
                  <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2">
                    {index + 1}
                  </span>
                  <span>
                    {new Date(day.date).toLocaleDateString('en-US', { 
                      weekday: 'long',
                      month: 'short', 
                      day: 'numeric' 
                    })}
                  </span>
                </h4>
                <div className="space-y-4">
                  {day.activities && day.activities.map((timeSlot, actIndex) => {
                    // Get the time of day (key) and activity details (value)
                    const timeOfDay = Object.keys(timeSlot)[0];
                    const activityDetails = timeSlot[timeOfDay];
                    
                    if (!activityDetails || !activityDetails.activityName) {
                      return null;
                    }
                    
                    return (
                      <motion.div 
                        key={actIndex} 
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100 shadow-sm"
                        whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                        transition={{ duration: 0.2 }}
                      >
                        <h5 className="font-medium text-blue-800 capitalize flex items-center">
                          {timeOfDay === 'morning' && (
                            <span className="mr-2">🌅</span>
                          )}
                          {timeOfDay === 'afternoon' && (
                            <span className="mr-2">☀️</span>
                          )}
                          {timeOfDay === 'evening' && (
                            <span className="mr-2">🌙</span>
                          )}
                          {timeOfDay}
                        </h5>
                        <p className="mt-1 font-semibold text-gray-800">{activityDetails.activityName}</p>
                        {activityDetails.estimatedDuration && (
                          <p className="mt-1 text-gray-700">
                            <span className="font-medium">Duration:</span> {activityDetails.estimatedDuration}
                          </p>
                        )}
                        {activityDetails.location && (
                          <p className="mt-1 text-gray-700">
                            <span className="font-medium">Location:</span> {activityDetails.location}
                          </p>
                        )}
                        {activityDetails.routeInformation && (
                          <p className="mt-1 text-gray-700">
                            <span className="font-medium">How to get there:</span> {activityDetails.routeInformation}
                          </p>
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        {activeTab === 'tips' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-800">Travel Tips</h3>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 shadow-sm border border-blue-100">
              <ul className="space-y-3">
                {tripData.travelTips && tripData.travelTips.map((tip, index) => {
                  // Handle both string and object formats
                  let tipContent = "";
                  let tipTitle = "";
                  
                  if (typeof tip === 'string') {
                    tipContent = tip;
                  } else if (typeof tip === 'object') {
                    const key = Object.keys(tip)[0];
                    tipTitle = key;
                    tipContent = tip[key];
                  }
                  
                  return (
                    <motion.li 
                      key={index} 
                      className="text-gray-700"
                      variants={itemVariants}
                    >
                      {tipTitle && (
                        <p className="font-semibold text-blue-700 mb-1">{tipTitle}</p>
                      )}
                      <div className="flex items-start">
                        <span className="text-blue-500 mr-2 mt-1">✦</span>
                        <span>{tipContent}</span>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          </motion.div>
        )}
        
        {activeTab === 'hotels' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-800">Hotel Recommendations</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {tripData.hotelRecommendations && tripData.hotelRecommendations.map((hotel, index) => (
                <motion.div 
                  key={index} 
                  className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-all duration-300 bg-white"
                  variants={itemVariants}
                  whileHover={{ 
                    y: -5, 
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" 
                  }}
                >
                  <h4 className="font-semibold text-lg text-blue-700">{hotel.hotelName}</h4>
                  <p className="text-yellow-600 font-medium mt-2 flex items-center">
                    <span className="mr-1">💰</span> {hotel.pricingDetails}
                  </p>
                  {hotel.websiteLink && hotel.websiteLink !== "N/A" && (
                    <a 
                      href={hotel.websiteLink} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-blue-600 mt-3 text-sm flex items-center hover:text-blue-800 transition-colors duration-300"
                    >
                      <span className="mr-1">🔗</span> Visit Website
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
            
            {/* Permanent Booking Website Links */}
            <motion.div 
              className="mt-8 bg-blue-50 p-5 rounded-lg border border-blue-100"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold mb-3 text-blue-800">Book Hotels from These Popular Websites</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <a 
                  href="https://www.booking.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white p-3 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Booking.com
                </a>
                <a 
                  href="https://www.hotels.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white p-3 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Hotels.com
                </a>
                <a 
                  href="https://www.expedia.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white p-3 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Expedia
                </a>
                <a 
                  href="https://www.agoda.com/" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="bg-white p-3 rounded-lg text-center shadow-sm hover:shadow-md transition-all duration-300 transform hover:-translate-y-1"
                >
                  Agoda
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeTab === 'flights' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-800">Flight Recommendations</h3>
            {tripData.flightRecommendations && tripData.flightRecommendations.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {tripData.flightRecommendations.map((flight, index) => (
                  <motion.div 
                    key={index} 
                    className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-lg p-4 text-center border border-blue-100 shadow-sm"
                    variants={itemVariants}
                    whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                  >
                    <h4 className="font-semibold text-lg text-blue-700">{flight.flightName}</h4>
                    <p className="text-blue-600 text-sm mb-2">{flight.pricingDetails}</p>
                    {flight.bookingWebsiteURL && (
                      <a 
                        href={flight.bookingWebsiteURL} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-blue-700 font-medium flex items-center justify-center"
                      >
                        <span className="mr-2">✈️</span> Book Now
                      </a>
                    )}
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-gray-600 italic">
                No flight recommendations needed for this trip.
              </div>
            )}
          </motion.div>
        )}

        
        {activeTab === 'dining' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-800">Dining Options</h3>
            {tripData.diningOptions && tripData.diningOptions.length > 0 && (
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {tripData.diningOptions.map((option, index) => {
                    // Handle both object format and string format
                    let restaurantName, cuisine, priceRange;
                    
                    if (typeof option === 'string') {
                      // Parse the string format "RestaurantName, Cuisine, PriceRange"
                      const parts = option.split(',').map(part => part.trim());
                      restaurantName = parts[0];
                      cuisine = parts.length > 1 ? parts[1] : '';
                      priceRange = parts.length > 2 ? parts[2] : '';
                    } else if (typeof option === 'object') {
                      restaurantName = option.restaurantName;
                      cuisine = option.cuisine;
                      priceRange = option.priceRange;
                    }
                    
                    return (
                      <motion.div 
                        key={index} 
                        className="bg-white p-4 rounded-lg shadow-sm"
                        variants={itemVariants}
                        whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                      >
                        <p className="font-medium flex items-center text-blue-700">
                          <span className="mr-2">🍽️</span> {restaurantName}
                        </p>
                        {cuisine && <p className="text-sm text-gray-600">Cuisine: {cuisine}</p>}
                        {priceRange && <p className="text-sm text-gray-600">Price: {priceRange}</p>}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* New Reservations Tab */}
        {activeTab === 'reservations' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-800">Recommended Reservations</h3>
            {tripData.reservations && tripData.reservations.length > 0 ? (
              <div className="space-y-4">
                {tripData.reservations.map((reservation, index) => {
                  // Handle different object structures
                  const attractionName = reservation["Name of the attraction/activity"] || reservation.attractionName;
                  const bookingLink = reservation["Booking link"] || reservation.bookingLink;
                  const timeframe = reservation["Recommended booking timeframe"] || reservation.bookingTimeframe;
                  const cost = reservation["Estimated cost per person"] || reservation.estimatedCost;
                  
                  return (
                    <motion.div 
                      key={index} 
                      className="bg-white rounded-lg shadow-sm border border-blue-100 p-5"
                      variants={itemVariants}
                      whileHover={{ scale: 1.01, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    >
                      <h4 className="font-semibold text-blue-700 text-lg flex items-center">
                        <span className="mr-2">🎟️</span> {attractionName}
                      </h4>
                      
                      {timeframe && (
                        <p className="text-gray-700 mt-2">
                          <span className="font-medium">When to book:</span> {timeframe}
                        </p>
                      )}
                      
                      {cost && (
                        <p className="text-gray-700 mt-1">
                          <span className="font-medium">Cost:</span> {cost}
                        </p>
                      )}
                      
                      {bookingLink && bookingLink !== "N/A" && (
                        <a 
                          href={bookingLink} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="mt-3 bg-blue-600 text-white py-2 px-4 rounded-lg inline-flex items-center hover:bg-blue-700 transition-colors duration-300 text-sm font-medium"
                        >
                          <span className="mr-1">📅</span> Book Now
                        </a>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-600 italic p-4 bg-blue-50 rounded-lg">
                No advance reservations needed for this trip. Most attractions can be booked on arrival.
              </div>
            )}
            
            {/* General Booking Tips */}
            <motion.div 
              className="mt-8 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border border-blue-100"
              variants={itemVariants}
            >
              <h4 className="text-lg font-semibold mb-2 text-blue-800">Reservation Tips</h4>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">✦</span>
                  <span>Book popular activities in advance, especially during peak seasons.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">✦</span>
                  <span>Consider using GetYourGuide or Viator for last-minute activity bookings.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-500 mr-2 mt-1">✦</span>
                  <span>Check cancellation policies before booking - look for free cancellation options.</span>
                </li>
              </ul>
            </motion.div>
          </motion.div>
        )}
        
        {activeTab === 'events' && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-xl font-bold mb-4 text-blue-800">Local Events</h3>
            {tripData.localEvents && tripData.localEvents.length > 0 ? (
              <div className="space-y-4">
                {tripData.localEvents.map((event, index) => {
                  // Handle different event object structures
                  const eventName = event.eventName || event.name;
                  const eventDate = event.date;
                  const eventDescription = event.description;
                  
                  return (
                    <motion.div 
                      key={index} 
                      className="border-l-4 border-blue-500 pl-4 pb-3 bg-gradient-to-r from-white to-blue-50 p-4 rounded-r-lg shadow-sm"
                      variants={itemVariants}
                      whileHover={{ x: 5, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
                    >
                      <h4 className="font-semibold text-blue-700">{eventName}</h4>
                      {eventDate && (
                        <p className="text-sm text-blue-500">
                          📅 {new Date(eventDate).toLocaleDateString('en-US', { 
                            weekday: 'long',
                            month: 'short', 
                            day: 'numeric' 
                          })}
                        </p>
                      )}
                      {eventDescription && (
                        <p className="mt-2 text-gray-700">{eventDescription}</p>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-600 italic">
                No local events found. Ask locals or search on local websites for upcoming events.
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
      
      {/* Feedback Form Modal */}
      {showFeedbackForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="text-yellow-400 mr-2">★</span>
                Share Your Feedback
              </h3>
              <FeedbackForm 
                userLocation={tripData.userLocation} 
                destination={tripData.destination}
                onSubmit={(data) => {
                  onFeedbackSubmit(data);
                  setShowFeedbackForm(false);
                }}
                onCancel={() => setShowFeedbackForm(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
};

export default TripPlan;