import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { Toaster, toast } from 'react-hot-toast';
import { UserContext } from '../context/UserContext';
import NavBar from '../components/NavBar';
import Hero from '../components/Hero';
import DeleteTripModal from '../components/DeleteTripModal';
import TripForm from '../components/TripForm';
import TripPlan from '../components/TripPlan';
import DestinationsByTheme from '../components/DestinationsByTheme';
import FeedbackList from '../components/FeedbackList';
import Footer from '../components/Footer';
import AirplaneTransition from '../components/AirplaneTransition';
import InvitedTripsModal from '../components/InvitedTripsModal';



// const [showMyTrips, setShowMyTrips] = useState(false);

// {showMyTrips && user && (
//   <MyTripPlans 
//     token={localStorage.getItem('token')}
//     onSelectTrip={(trip) => {
//       setTripPlan(trip);
//       setShowMyTrips(false);
//     }}
//     onClose={() => setShowMyTrips(false)}
//   />
// )}



const HomePage = () => {
  const { user, setUser } = useContext(UserContext);
  const [tripPlan, setTripPlan] = useState(null);
  const [showTripForm, setShowTripForm] = useState(false);
  const [feedbackList, setFeedbackList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showTransition, setShowTransition] = useState(false);
  const [transitionData, setTransitionData] = useState(null);
  const [initialTripData, setInitialTripData] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [hasTripPlan, setHasTripPlan] = useState(false);
  const [currentTripPlan, setCurrentTripPlan] = useState(null);

  const [showInvitedTripsModal, setShowInvitedTripsModal] = useState(false);
  const [invitedTrips, setInvitedTrips] = useState([]);

  // Add new function to fetch invited trips
  const fetchInvitedTrips = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/trip/invited');
      if (response.data.success) {
        setInvitedTrips(response.data.invitedTrips);
        setShowInvitedTripsModal(true);
      }
    } catch (error) {
      console.error('Error fetching invited trips:', error);
      toast.error('Failed to fetch invited trips', {
        style: {
          borderRadius: '10px',
          background: '#f7f7f8',
          border: '1px solid #ff4136',
          color: '#ff4136',
        }
      });
    }
  };

  const handleSelectInvitedTrip = (trip) => {
    setCurrentTripPlan(trip);
    setShowInvitedTripsModal(false);
  };


  // Memoize handleLogout to prevent recreation on each render
  const handleLogout = useCallback(() => {
    setUser(null);
    setHasTripPlan(false);
    localStorage.removeItem('token');
    // Remove the default authorization header
    delete axios.defaults.headers.common['Authorization'];
    
    // Show logout toast
    toast.success('Logged out successfully!', {
      icon: '👋',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      }
    });
  }, [setUser]);

  // Fetch feedback from the API
  const fetchFeedback = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/feedback');
      if (response.data.success) {
        setFeedbackList(response.data.feedbacks);
      }
    } catch (err) {
      console.error('Error fetching feedback:', err);
    }
  }, []);

  // Check if the user has an existing trip plan
  const checkExistingTripPlan = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/trip/my');
      if (response.data.success && response.data.tripPlan) {
        setHasTripPlan(true);
      } else {
        setHasTripPlan(false);
      }
    } catch (err) {
      console.error("Error checking trip plan", err);
      setHasTripPlan(false);
    }
  }, []);

  // On mount, check if user is logged in via token
  useEffect(() => {
    const checkAuthStatus = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Set default Authorization header for all requests
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Fetch user data
          const response = await axios.get('http://localhost:4000/api/v1/user/me');
          if (response.data.success) {
            setUser(response.data.user);
            
            // Show welcome back toast
            toast.success(`Welcome back, ${response.data.user.name}!`, {
              icon: '✈️',
              style: {
                borderRadius: '10px',
                background: '#333',
                color: '#fff',
              }
            });
            
            // Check if user has an existing trip plan
            checkExistingTripPlan();
          }
        } catch (err) {
          console.error("Auth token verification failed:", err);
          // Clear invalid token
          handleLogout();
          
          // Show error toast
          toast.error('Your session has expired. Please log in again.', {
            style: {
              borderRadius: '10px',
              background: '#f7f7f8',
              border: '1px solid #ff4136',
              color: '#ff4136',
            }
          });
        }
      }
    };
    
    checkAuthStatus();
    fetchFeedback();
  }, [handleLogout, setUser, checkExistingTripPlan, fetchFeedback]);

  // Fetch the logged-in user's current trip plan
  const handleViewTripPlan = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/v1/trip/my');
      if (response.data.success && response.data.tripPlan) {
        setTripPlan(response.data.tripPlan);
        
        // Optional: Show toast about viewing trip plan
        toast.success('Trip plan loaded successfully!', {
          icon: '🗺️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        });
        
        return { tripPlan: response.data.tripPlan };
      } else {
        // Show toast if no trip plan exists
        toast.error('No trip plan exists. Generate a trip first!', {
          icon: '🌎',
          style: {
            borderRadius: '10px',
            background: '#f7f7f8',
            border: '1px solid #ff4136',
            color: '#ff4136',
          }
        });
        
        setTripPlan(null);
        return null;
      }
    } catch (err) {
      console.error("Error fetching trip plan", err);
      
      // Show error toast
      toast.error('Error fetching trip plan', {
        style: {
          borderRadius: '10px',
          background: '#f7f7f8',
          border: '1px solid #ff4136',
          color: '#ff4136',
        }
      });
      
      return null;
    }
  };

  const handleGenerateTrip = async () => {
    // If user is logged in and has an existing trip plan, show delete confirmation
    if (user && hasTripPlan) {
      setShowDeleteModal(true);
    } else {
      setShowTripForm(true);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      // Delete the current trip plan
      const response = await axios.delete('http://localhost:4000/api/v1/trip/my');
      if (response.data.success) {
        setShowDeleteModal(false);
        setHasTripPlan(false);
        setShowTripForm(true);
        
        // Show success toast
        toast.success('Previous trip plan deleted successfully!', {
          icon: '🗑️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        });
      } else {
        setError('Failed to delete trip plan. Please try again.');
        
        // Show error toast
        toast.error('Failed to delete trip plan. Please try again.', {
          style: {
            borderRadius: '10px',
            background: '#f7f7f8',
            border: '1px solid #ff4136',
            color: '#ff4136',
          }
        });
      }
    } catch (err) {
      console.error("Error deleting trip plan", err);
      const errorMessage = err.response?.data?.message || 'Error deleting trip plan.';
      setError(errorMessage);
      
      // Show error toast
      toast.error(errorMessage, {
        style: {
          borderRadius: '10px',
          background: '#f7f7f8',
          border: '1px solid #ff4136',
          color: '#ff4136',
        }
      });
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleTripSubmit = async (formData) => {
    setIsLoading(true);
    setError('');
    localStorage.setItem('destination', formData.destination);
    try {
      const response = await axios.post('http://localhost:4000/api/v1/createtrip', {
        ...formData,
        ...(user && { userId: user.id })
      });
      if (response.data.success) {
        setTransitionData(response.data.tripPlan);
        setTimeout(() => {
          setShowTransition(true);
        }, 1500);
        
        // Update hasTripPlan state
        if (user) {
          setHasTripPlan(true);
        }
        
        // Show success toast
        toast.success('Trip plan generated successfully!', {
          icon: '🌍',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        });
      } else {
        setError('Failed to generate trip plan. Please try again.');
        setIsLoading(false);
        
        // Show error toast
        toast.error('Failed to generate trip plan. Please try again.', {
          style: {
            borderRadius: '10px',
            background: '#f7f7f8',
            border: '1px solid #ff4136',
            color: '#ff4136',
          }
        });
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error generating trip plan.';
      setError(errorMessage);
      setIsLoading(false);
      
      // Show error toast
      toast.error(errorMessage, {
        style: {
          borderRadius: '10px',
          background: '#f7f7f8',
          border: '1px solid #ff4136',
          color: '#ff4136',
        }
      });
    }
  };

  const handleTransitionComplete = () => {
    setShowTransition(false);
    setShowTripForm(false);
    setTripPlan(transitionData);
    setIsLoading(false);
  };

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/v1/feedback', {
        ...feedbackData,
        tripId: tripPlan?._id
      });
      if (response.data.success) {
        fetchFeedback();
        
        // Show success toast
        toast.success('Thank you for your feedback!', {
          icon: '👍',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        });
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      
      // Show error toast
      toast.error('Failed to submit feedback. Please try again.', {
        style: {
          borderRadius: '10px',
          background: '#f7f7f8',
          border: '1px solid #ff4136',
          color: '#ff4136',
        }
      });
    }
  };

  const handlePlanTrip = (destination) => {
    if (user && hasTripPlan) {
      setInitialTripData({ destination: destination.name });
      setShowDeleteModal(true);
    } else {
      setInitialTripData({ destination: destination.name });
      setShowTripForm(true);
    }
  };

  const handleAcceptInvite = async (tripId) => {
    try {
      // Fetch the trip details for the accepted invite
      const response = await axios.get(`http://localhost:4000/api/v1/trips/${tripId}`);
      setCurrentTripPlan(response.data.trip);
    } catch (error) {
      console.error('Error fetching trip details:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <Toaster position="top-right" />
      
      {showTransition && (
        <AirplaneTransition onAnimationComplete={handleTransitionComplete} />
      )}

      

      {/* If no full-screen TripForm/TripPlan is open, show main content */}
      {!showTripForm && !tripPlan && (
        <>
          {showInvitedTripsModal && (
        <InvitedTripsModal 
          trips={invitedTrips}
          onClose={() => setShowInvitedTripsModal(false)}
          onSelectTrip={handleSelectInvitedTrip}
        />
          )}
          <NavBar user={user} onLogout={handleLogout} 
          onViewTripPlan={handleViewTripPlan} 
          onAcceptInvite={handleAcceptInvite}
          onViewInvitedTrips={fetchInvitedTrips}
          />
          <Hero 
            onGenerateTrip={handleGenerateTrip}
            showDeleteModal={showDeleteModal}
            onConfirmDelete={handleConfirmDelete}
            onCancelDelete={handleCancelDelete}
          />
          {/* Delete Trip Modal */}
          {showDeleteModal && (
            <DeleteTripModal 
              onConfirm={handleConfirmDelete}
              onCancel={handleCancelDelete}
            />
          )}
          <DestinationsByTheme onPlanTrip={handlePlanTrip} />
          <div className="container mx-auto px-4 py-8">
            <FeedbackList feedbacks={feedbackList} />
          </div>
          <Footer />
        </>
      )}

      {/* Full-screen TripForm when generating a trip */}
      {showTripForm && !tripPlan && (
        <div className="container mx-auto py-10">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
            Plan Your Perfect Adventure
          </h2>
          <TripForm
            onSubmit={handleTripSubmit}
            onCancel={() => setShowTripForm(false)}
            isLoading={isLoading}
            initialData={initialTripData}
          />
          {error && (
            <div className="mt-6 max-w-2xl mx-auto">
              <p className="text-red-500 text-center p-4 bg-red-50 rounded-lg border border-red-100">
                {error}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Show generated TripPlan */}
      {tripPlan && (
        <div className="container mx-auto px-4 py-8">
          <TripPlan 
            tripData={tripPlan} 
            onFeedbackSubmit={handleFeedbackSubmit}
            onClose={() => setTripPlan(null)}
          />
        </div>
      )}
    </div>
  );
};

export default HomePage;