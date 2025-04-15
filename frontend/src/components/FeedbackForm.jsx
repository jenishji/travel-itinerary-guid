import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FeedbackForm = ({ userLocation, onSubmit, onCancel, destination }) => {
  const [formData, setFormData] = useState({
    userName: '',
    userLocation: userLocation || '',
    destination: destination || '',
    rating: 5,
    comment: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <label className="block text-gray-700 font-medium mb-2" htmlFor="userName">
            Your Name*
          </label>
          <input
            id="userName"
            name="userName"
            type="text"
            required
            value={formData.userName}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Enter your name"
          />
        </motion.div>
        
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <label className="block text-gray-700 font-medium mb-2" htmlFor="userLocation">
            Your Location
          </label>
          <input
            id="userLocation"
            name="userLocation"
            type="text"
            value={formData.userLocation}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-gray-50"
            readOnly={userLocation ? true : false}
          />
        </motion.div>
        
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <label className="block text-gray-700 font-medium mb-2" htmlFor="rating">
            Rating*
          </label>
          <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setFormData({ ...formData, rating: star })}
                className={`text-3xl focus:outline-none transition-colors ${star <= formData.rating ? 'text-yellow-400' : 'text-gray-300'}`}
              >
                ★
              </button>
            ))}
            <span className="ml-2 text-gray-600">({formData.rating}/5)</span>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <label className="block text-gray-700 font-medium mb-2" htmlFor="comment">
            Comments*
          </label>
          <textarea
            id="comment"
            name="comment"
            required
            value={formData.comment}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
            placeholder="Share your experience with this trip plan..."
          ></textarea>
        </motion.div>
      </div>
      
      <div className="mt-6 flex justify-end space-x-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md transition duration-300 flex items-center"
          >
            <span className="mr-1">✕</span> Cancel
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center"
        >
          <span className="mr-1">✓</span> Submit Feedback
        </button>
      </div>
      
      {/* Visual feedback indicator */}
      <div className="mt-4 text-center text-sm text-gray-500">
        Your feedback helps us improve our trip recommendations!
      </div>
    </form>
  );
};

export default FeedbackForm;