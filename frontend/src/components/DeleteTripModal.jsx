// src/components/DeleteTripModal.jsx
import React from 'react';
import { motion } from 'framer-motion';

const DeleteTripModal = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl"
      >
        <h3 className="text-xl font-bold text-gray-800 mb-4">Delete Current Trip Plan?</h3>
        <p className="text-gray-600 mb-6">
          You already have an active trip plan. Creating a new one will delete your current plan. Are you sure you want to continue?
        </p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Delete & Continue
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteTripModal;