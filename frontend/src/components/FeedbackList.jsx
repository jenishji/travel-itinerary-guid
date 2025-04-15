// src/components/FeedbackList.jsx
import React from 'react';
import { motion } from 'framer-motion';

const FeedbackList = ({ feedbacks }) => {
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

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Traveler Feedback</h2>
          <div className="bg-blue-50 rounded-lg p-8 max-w-lg mx-auto border border-blue-100 shadow-sm">
            <div className="text-6xl mb-4">🧳</div>
            <p className="text-gray-600">No feedback available yet. Be the first to share your experience!</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-blue-800 mb-2 text-center">Traveler Feedback</h2>
        <p className="text-center text-gray-600 mb-10 max-w-2xl mx-auto">See what our travelers have to say about their experiences</p>
      </motion.div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {feedbacks.map((feedback) => (
          <motion.div 
            key={feedback._id} 
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100"
            variants={itemVariants}
            whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-blue-700 font-bold mr-3">
                  {feedback.userName.charAt(0).toUpperCase()}
                </div>
                <h3 className="font-bold text-lg text-gray-800">{feedback.userName}</h3>
              </div>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-lg ${i < feedback.rating ? 'text-yellow-400' : 'text-gray-300'}`}>
                    ★
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-1 rounded inline-block mb-3">
              <p className="text-blue-700 font-medium text-sm">
                <span className="mr-1">🌍</span> {feedback.destination}
              </p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-100 mb-3">
              <p className="text-gray-700">{feedback.comment}</p>
            </div>
            
            <p className="text-gray-500 text-sm flex items-center">
              <span className="mr-1">🕒</span>
              {new Date(feedback.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              })}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default FeedbackList;