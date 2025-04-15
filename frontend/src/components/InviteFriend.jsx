import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { 
    UserPlus,
    Mail
  } from 'lucide-react';

const InviteFriendModal = ({ 
    tripId, 
    onClose, 
    onInviteSent 
  }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  
    const handleInvite = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      
      const token = localStorage.getItem('token');
      
      // Validate token exists
      if (!token) {
        toast.error('Please log in again');
        setIsLoading(false);
        return;
      }
    
      try {
        // Create a new axios instance with the token
        const authAxios = axios.create({
          baseURL: 'http://localhost:4000/api/v1',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
    
        const response = await authAxios.post('/trip/invite', {
          tripId,
          invitedUserEmail: email
        });
    
        if (response.data.success) {
          toast.success('Invite sent successfully!');
          onInviteSent();
          onClose();
        }
      } catch (error) {
        // More detailed error handling
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          toast.error(
            error.response.data.message || 
            'Failed to send invite. Please log in again.'
          );
        } else if (error.request) {
          // The request was made but no response was received
          toast.error('No response from server. Check your connection.');
        } else {
          // Something happened in setting up the request
          toast.error('Error setting up the invite request');
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <UserPlus className="mr-2 text-blue-600" />
            Invite a Friend
          </h3>
          <form onSubmit={handleInvite} className="space-y-4">
            <div>
              <label 
                htmlFor="invite-email" 
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Friend's Email
              </label>
              <input 
                id="invite-email"
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your friend's email"
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Mail className="mr-2" />
                {isLoading ? 'Sending...' : 'Send Invite'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  export default InviteFriendModal