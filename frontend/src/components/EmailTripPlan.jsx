import React, { useState } from 'react';
import { X, Send } from 'lucide-react';

const EmailTripPlan = ({ tripId, onClose ,onEmailSent}) => {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setMessage(''); // Clear previous messages
    
    try {
      // Send request to your backend API
      const response = await fetch('http://localhost:4000/api/v1/sendTripEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          tripId: tripId
        }),
      });
      
      const data = await response.json();
      
      if (data.success) {
        setIsSuccess(true);
        setMessage('Trip plan sent successfully!');
        alert('Trip plan sent successfully!');
        onEmailSent();
        setEmail('');
      } else {
        setIsSuccess(false);
        setMessage('Failed to send trip plan: ' + (data.message || 'Unknown error'));
        alert('Failed to send trip plan: ' + (data.message || 'Unknown error'));
        console.error('Server error:', data);
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setIsSuccess(false);
      setMessage('Failed to send trip plan. Please try again.');
    } finally {
      setIsSending(false);
      
      // Auto-hide success message after 5 seconds
      if (isSuccess) {
        setTimeout(() => {
          setMessage('');
        }, 5000);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        
        <h2 className="text-xl font-bold mb-4">Email Trip Plan</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          
          <button
            type="submit"
            disabled={isSending}
            className={`w-full flex items-center justify-center gap-2 py-2 px-4 rounded-md text-white ${
              isSending ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {isSending ? 'Sending...' : (
              <>
                <Send size={16} />
                <span>Send Trip Plan</span>
              </>
            )}
          </button>
        </form>
        
        {message && (
          <div className={`mt-4 p-3 rounded-md ${
            isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailTripPlan;