import React, { useRef } from 'react';
import { motion } from 'framer-motion';

const FeedbackList = ({ feedbacks }) => {
  const scrollContainerRef = useRef(null);

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
    hidden: { x: 20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 450; // Increased scroll amount for wider cards
      const newScrollPosition = scrollContainerRef.current.scrollLeft + (direction === 'left' ? -scrollAmount : scrollAmount);
      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth'
      });
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

      <div className="relative max-w-6xl mx-auto px-4">
        {/* Scroll buttons */}
        <button 
          onClick={() => scroll('left')} 
          className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg focus:outline-none text-blue-600"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <button 
          onClick={() => scroll('right')} 
          className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg focus:outline-none text-blue-600"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-auto pb-4 hide-scrollbar" 
          style={{ 
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none',  /* IE and Edge */
          }}
        >
          <motion.div
            className="flex space-x-6 px-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ minWidth: 'max-content' }}
          >
            {feedbacks.map((feedback) => (
              <motion.div
                key={feedback._id}
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border border-gray-100 w-96 flex-shrink-0"
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
        
        {/* Scroll indicator dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {feedbacks.length > 0 && (
            [...Array(Math.min(5, feedbacks.length))].map((_, index) => (
              <div 
                key={index} 
                className="h-2 w-2 rounded-full bg-blue-300 hover:bg-blue-500 cursor-pointer"
                onClick={() => {
                  if (scrollContainerRef.current) {
                    const cardWidth = 400; // Increased approximate width of a card with margin
                    scrollContainerRef.current.scrollTo({
                      left: index * cardWidth,
                      behavior: 'smooth'
                    });
                  }
                }}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedbackList;