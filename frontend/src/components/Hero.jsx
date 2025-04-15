import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onGenerateTrip, showDeleteModal, onConfirmDelete, onCancelDelete }) => {
  return (
    <div className="relative text-white overflow-hidden">
      <div className="absolute inset-0">
        <img 
          className="w-full h-full object-cover"
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e" // Using placeholder image as external URLs aren't supported
          alt="Travel background" 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-700/50"></div>
      </div>
      
      <div className="relative container mx-auto px-4 py-24 md:py-32 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <motion.h1 
            className="text-4xl md:text-6xl font-bold text-center mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Travel AI Guide
          </motion.h1>
          
          <motion.div
            className="bg-blue-600/30 backdrop-blur-sm py-2 px-4 rounded-lg inline-block mb-4"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <p className="text-blue-100 font-medium">Your Personal Travel Assistant</p>
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl text-center max-w-2xl mb-10 text-blue-50 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Plan your perfect trip with AI assistance. Get personalized itineraries, travel tips, and recommendations tailored to your preferences.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <motion.button 
              onClick={onGenerateTrip}
              className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-blue-900 font-bold py-4 px-10 rounded-full shadow-lg transition duration-300"
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)" }}
              whileTap={{ scale: 0.95 }}
            >
              Generate Trip
            </motion.button>
            
            {showDeleteModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={onCancelDelete}>
                <div className="bg-white rounded-lg shadow-xl" onClick={e => e.stopPropagation()}>
                  {/* The DeleteTripModal component will be rendered from HomePage */}
                </div>
              </div>
            )}
            
            <motion.div 
              className="mt-6 text-blue-200 text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
            >
              <p>No account needed • AI-powered • Instant results</p>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Animated decoration elements */}
        <motion.div 
          className="absolute top-20 right-20 w-24 h-24 rounded-full bg-blue-500/20 backdrop-blur-sm z-0"
          animate={{ 
            y: [0, -30, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{ 
            duration: 6, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-20 left-20 w-32 h-32 rounded-full bg-yellow-500/10 backdrop-blur-sm z-0"
          animate={{ 
            y: [0, 30, 0],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{ 
            duration: 7, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        />
      </div>
    </div>
  );
};

export default Hero;