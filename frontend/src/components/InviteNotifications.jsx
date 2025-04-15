import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
    Bell, 
    UserCheck, 
    UserX,
} from 'lucide-react';

const InviteNotifications = ({ user, onInviteAccept, containerRef }) => {
    const [invites, setInvites] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
  
    // Fetch pending invites
    const fetchPendingInvites = async () => {
      if (!user) return;
  
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:4000/api/v1/trip/invites', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setInvites(response.data.invites);
      } catch (error) {
        console.error('Error fetching invites:', error);
      }
    };
  
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event) => {
        // Check if the click is outside both the dropdown and the container (if provided)
        const isOutsideDropdown = dropdownRef.current && !dropdownRef.current.contains(event.target);
        const isOutsideContainer = !containerRef || (containerRef.current && containerRef.current.contains(event.target));
        
        if (isOutsideDropdown && isOutsideContainer) {
          setIsDropdownOpen(false);
        }
      };
  
      if (isDropdownOpen) {
        document.addEventListener('mousedown', handleClickOutside);
      }
      
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isDropdownOpen, containerRef]);
  
    // Force close method that can be called from parent components
    const closeDropdown = () => {
      setIsDropdownOpen(false);
    };
  
    // Expose the close method to parent components if needed
    React.useImperativeHandle(containerRef, () => ({
      closeDropdown
    }), []);
  
    // Respond to invite
    const handleInviteResponse = async (inviteId, status) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.put(
          `http://localhost:4000/api/v1/trip/invite/${inviteId}`, 
          { status },
          { headers: { 'Authorization': `Bearer ${token}` } }
        );
        
        if (response.data.success) {
          // If accepted, you might want to trigger viewing the trip
          if (status === 'accepted') {
            onInviteAccept(response.data.tripId);
          }
    
          // Remove the invite from the list
          setInvites(prevInvites => 
            prevInvites.filter(invite => invite._id !== inviteId)
          );
    
          toast.success(
            status === 'accepted' 
              ? 'Trip invite accepted!' 
              : 'Trip invite declined.'
          );
          
          // Close the dropdown after responding
          setIsDropdownOpen(false);
        }
      } catch (error) {
        toast.error('Failed to respond to invite');
      }
    };
  
    // Fetch invites when component mounts or user changes
    useEffect(() => {
      fetchPendingInvites();
    }, [user]);
  
    // If no user, return null
    if (!user) return null;
  
    return (
      <div className="relative" ref={dropdownRef}>
        <motion.div 
          className="relative cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <Bell 
            className="text-blue-600 hover:text-blue-800" 
            size={24} 
          />
          {invites.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {invites.length}
            </span>
          )}
        </motion.div>
  
        {/* Invite Dropdown */}
        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-64 md:w-80 bg-white rounded-lg shadow-xl border border-gray-100 z-50">
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-3 text-blue-800">
                Trip Invites
              </h4>
              {invites.length === 0 ? (
                <p className="text-gray-500 text-center">No pending invites</p>
              ) : (
                invites.map(invite => (
                  <div 
                    key={invite._id} 
                    className="flex items-center justify-between p-3 bg-blue-50 rounded-lg mb-2"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {invite.inviterId.name} invited you to 
                        <span className="ml-1 text-blue-600">
                          {invite.tripId.destination} Trip
                        </span>
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(invite.tripId.date).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex space-x-2 ml-2 flex-shrink-0">
                      <button
                        onClick={() => handleInviteResponse(invite._id, 'accepted')}
                        className="bg-green-100 text-green-600 p-2 rounded-full hover:bg-green-200"
                      >
                        <UserCheck size={16} />
                      </button>
                      <button
                        onClick={() => handleInviteResponse(invite._id, 'rejected')}
                        className="bg-red-100 text-red-600 p-2 rounded-full hover:bg-red-200"
                      >
                        <UserX size={16} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  export default InviteNotifications;