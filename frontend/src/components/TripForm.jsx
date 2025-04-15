import React, { useState, useEffect, useContext } from 'react';
import { IoMdCloseCircle } from "react-icons/io";
import { FaMapMarkerAlt, FaCalendarAlt, FaHourglass, FaUserAlt, FaMoneyBillWave, FaMapMarkedAlt, FaPlaneDeparture } from "react-icons/fa";
import { MdDirections } from "react-icons/md";
import { GiMountainClimbing } from "react-icons/gi";
import { BiRun } from "react-icons/bi";
import { UserContext } from '../context/UserContext'; // Adjust the path as needed

const TripForm = ({ onSubmit, onCancel, isLoading, initialData }) => {
  const { userLocation, isLoadingLocation, locationError } = useContext(UserContext);
  
  const [formData, setFormData] = useState({
    destination: initialData?.destination || '',
    date: '',
    duration: '',
    userLocation: '',
    budget: '',
    visitNearby: false,
    pace: 'Moderate',
    tripType: 'Adventure',
    tripPurpose: 'Vacation'
  });
  
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [isLoadingDestinations, setIsLoadingDestinations] = useState(false);
  const [isLoadingLocations, setIsLoadingLocations] = useState(false);

  // Pace options for the trip
  const paceOptions = [
    { value: 'Relaxed', label: 'Relaxed - Fewer activities, more downtime, late starts' },
    { value: 'Moderate', label: 'Moderate - Balanced mix of activities and downtime' },
    { value: 'High-Energy', label: 'High-Energy - Packed schedule, early starts, late finishes' },
    { value: 'Intense', label: 'Intense - Very busy schedule with minimal downtime' }
  ];

  // Trip type options
  const tripTypeOptions = [
    'Adventure', 'Relaxation', 'Cultural Immersion', 'Foodie Tour', 'Historical', 
    'Nature', 'Shopping', 'Beach', 'Winter Sports', 'City Exploration', 'Mixed Experience'
  ];

  // Trip purpose options
  const tripPurposeOptions = [
    'Vacation', 'Family Trip', 'Solo Travel', 'Honeymoon', 'Anniversary', 
    'Bachelor/Bachelorette Party', 'Business', 'Educational Tour', 'Religious Pilgrimage', 'Sports Event'
  ];

  // Set user location from context when it becomes available
  useEffect(() => {
    if (userLocation && userLocation.countryName) {
      // Format location string similar to what the mapbox API would return
      const formattedLocation = userLocation.city 
        ? `${userLocation.city}, ${userLocation.principalSubdivision}, ${userLocation.countryName}`
        : userLocation.countryName;
        
      setFormData(prevData => ({
        ...prevData,
        userLocation: formattedLocation
      }));
    }
  }, [userLocation]);

  // Set initial form data if provided
  useEffect(() => {
    if (initialData) {
      setFormData(prevData => ({
        ...prevData,
        ...initialData
      }));
    }
  }, [initialData]);

// Function to fetch destination suggestions from API
const fetchDestinationSuggestions = async (query) => {
  if (!query || query.length < 2) {
    setDestinationSuggestions([]);
    return;
  }
  
  setIsLoadingDestinations(true);
  try {
    // Using OpenStreetMap Nominatim API (completely free)
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`,
      {
        headers: {
          // Adding a User-Agent header is required by Nominatim's usage policy
          'User-Agent': 'TripPlannerApp/1.0'
        }
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch suggestions');
    
    const data = await response.json();
    
    const suggestions = data.map(place => {
      // Format the place name in a user-friendly way
      const name = place.name || '';
      const city = place.address?.city || place.address?.town || place.address?.village || '';
      const state = place.address?.state || '';
      const country = place.address?.country || '';
      
      let displayName = '';
      if (city && city !== name) displayName = city;
      else if (name) displayName = name;
      
      if (state) displayName += (displayName ? ', ' : '') + state;
      if (country) displayName += (displayName ? ', ' : '') + country;
      
      return displayName || place.display_name;
    });
    
    // Remove duplicates
    const uniqueSuggestions = [...new Set(suggestions)];
    setDestinationSuggestions(uniqueSuggestions);
  } catch (error) {
    console.error('Error fetching destination suggestions:', error);
    // Fallback to provide some suggestions based on input
    const fallbackSuggestions = [
      "Paris, France", "New York, USA", "Tokyo, Japan", "London, UK", "Rome, Italy",
      "Barcelona, Spain", "Sydney, Australia", "Dubai, UAE", "Bangkok, Thailand"
    ].filter(place => place.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
    setDestinationSuggestions(fallbackSuggestions);
  } finally {
    setIsLoadingDestinations(false);
  }
};

// Function to fetch location suggestions
const fetchLocationSuggestions = async (query) => {
  if (!query || query.length < 2) {
    setLocationSuggestions([]);
    return;
  }
  
  setIsLoadingLocations(true);
  try {
    // Using the same Nominatim API for location suggestions
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&addressdetails=1&limit=5`,
      {
        headers: {
          'User-Agent': 'TripPlannerApp/1.0'
        }
      }
    );
    
    if (!response.ok) throw new Error('Failed to fetch suggestions');
    
    const data = await response.json();
    
    const suggestions = data.map(place => {
      // Format the place name in a user-friendly way
      const name = place.name || '';
      const city = place.address?.city || place.address?.town || place.address?.village || '';
      const state = place.address?.state || '';
      const country = place.address?.country || '';
      
      let displayName = '';
      if (city && city !== name) displayName = city;
      else if (name) displayName = name;
      
      if (state) displayName += (displayName ? ', ' : '') + state;
      if (country) displayName += (displayName ? ', ' : '') + country;
      
      return displayName || place.display_name;
    });
    
    // Remove duplicates
    const uniqueSuggestions = [...new Set(suggestions)];
    setLocationSuggestions(uniqueSuggestions);
  } catch (error) {
    console.error('Error fetching location suggestions:', error);
    // Fallback
    const fallbackSuggestions = [
      "San Francisco, California, USA", "Chicago, Illinois, USA", "Austin, Texas, USA",
      "Seattle, Washington, USA", "Boston, Massachusetts, USA"
    ].filter(place => place.toLowerCase().includes(query.toLowerCase())).slice(0, 5);
    setLocationSuggestions(fallbackSuggestions);
  } finally {
    setIsLoadingLocations(false);
  }
};

  // Debounce function to limit API calls
  const debounce = (func, delay) => {
    let timeoutId;
    return function(...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  // Create debounced versions of our API calls
  const debouncedFetchDestinations = React.useCallback(
    debounce(fetchDestinationSuggestions, 300),
    []
  );

  const debouncedFetchLocations = React.useCallback(
    debounce(fetchLocationSuggestions, 300),
    []
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Trigger API calls for autocomplete
    if (name === 'destination') {
      debouncedFetchDestinations(value);
    } else if (name === 'userLocation') {
      debouncedFetchLocations(value);
    }
  };

  const handleSuggestionClick = (suggestion, field) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: suggestion
    }));
    
    if (field === 'destination') {
      setDestinationSuggestions([]);
    } else if (field === 'userLocation') {
      setLocationSuggestions([]);
    }
  };

  // Use location from context instead of getting it again
  const useContextLocation = () => {
    if (userLocation && userLocation.countryName) {
      // Format location string similar to what the mapbox API would return
      const formattedLocation = userLocation.city 
        ? `${userLocation.city}, ${userLocation.principalSubdivision}, ${userLocation.countryName}`
        : userLocation.countryName;
        
      setFormData(prevData => ({
        ...prevData,
        userLocation: formattedLocation
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg relative overflow-hidden 
                  border-t-8 border-blue-600">
      {/* Background decorative elements */}
      <div className="absolute -right-20 -top-20 w-40 h-40 bg-blue-100 rounded-full opacity-20"></div>
      <div className="absolute -left-20 -bottom-20 w-40 h-40 bg-green-100 rounded-full opacity-20"></div>
      
      <div className="text-center mb-6">
        <FaPlaneDeparture className="inline-block text-4xl text-blue-600 mb-2" />
        <h2 className="text-2xl font-bold text-gray-800">Plan Your Adventure</h2>
        <p className="text-gray-600">Fill in the details to create your perfect trip</p>
      </div>
      
      <button 
        onClick={onCancel} 
        className="absolute top-4 right-5 text-gray-500 hover:text-red-500 text-xl font-bold transition-colors duration-300"
      >
        <IoMdCloseCircle className="text-2xl" />
      </button>
      
      <form onSubmit={handleSubmit} className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="col-span-1 md:col-span-2">
            <label className="text-gray-700 font-medium mb-2 flex items-center" htmlFor="destination">
              <FaMapMarkerAlt className="mr-2 text-blue-600" />
              Destination*
            </label>
            <div className="relative">
              <input
                id="destination"
                name="destination"
                type="text"
                required
                value={formData.destination}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="Enter city, country, or region"
              />
              {isLoadingDestinations && (
                <div className="absolute right-3 top-3">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                </div>
              )}
              {destinationSuggestions.length > 0 && (
                <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-y-auto">
                  {destinationSuggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                      onClick={() => handleSuggestionClick(suggestion, 'destination')}
                    >
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center" htmlFor="date">
              <FaCalendarAlt className="mr-2 text-blue-600" />
              Start Date*
            </label>
            <input
              id="date"
              name="date"
              type="date"
              required
              value={formData.date}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center" htmlFor="duration">
              <FaHourglass className="mr-2 text-blue-600" />
              Duration (days)*
            </label>
            <input
              id="duration"
              name="duration"
              type="number"
              required
              min="1"
              max="30"
              value={formData.duration}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Number of days"
            />
          </div>

          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center" htmlFor="userLocation">
              <FaUserAlt className="mr-2 text-blue-600" />
              Your Location*
            </label>
            <div className="relative flex">
              <input
                id="userLocation"
                name="userLocation"
                type="text"
                required
                value={formData.userLocation}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                placeholder="City, State, Country"
              />
              <button 
                type="button"
                onClick={useContextLocation}
                disabled={isLoadingLocation}
                className="bg-blue-600 text-white px-3 rounded-r-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
              >
                {isLoadingLocation ? (
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                ) : (
                  <FaMapMarkedAlt />
                )}
              </button>
              {isLoadingLocations && (
                <div className="absolute right-12 top-3">
                  <svg className="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                  </svg>
                </div>
              )}
              {locationSuggestions.length > 0 && (
                <div className="absolute z-20 w-full left-0 mt-12 bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-y-auto">
                  {locationSuggestions.map((suggestion, index) => (
                    <div 
                      key={index}
                      className="px-4 py-2 hover:bg-blue-50 cursor-pointer flex items-center"
                      onClick={() => handleSuggestionClick(suggestion, 'userLocation')}
                    >
                      <FaMapMarkerAlt className="mr-2 text-blue-600" />
                      {suggestion}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {locationError && <p className="text-red-500 mt-1 text-sm">{locationError}</p>}
          </div>
          
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center" htmlFor="budget">
              <FaMoneyBillWave className="mr-2 text-blue-600" />
              Budget (USD)*
            </label>
            <input
              id="budget"
              name="budget"
              required
              type="number"
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
              placeholder="Your travel budget"
            />
          </div>
          
          {/* Trip Pace Selection */}
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center" htmlFor="pace">
              <BiRun className="mr-2 text-blue-600" />
              Trip Pace*
            </label>
            <select
              id="pace"
              name="pace"
              required
              value={formData.pace}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              {paceOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          
          {/* Trip Type Selection */}
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center" htmlFor="tripType">
              <GiMountainClimbing className="mr-2 text-blue-600" />
              Trip Type*
            </label>
            <select
              id="tripType"
              name="tripType"
              required
              value={formData.tripType}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              {tripTypeOptions.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>
          
          {/* Trip Purpose Selection */}
          <div>
            <label className="text-gray-700 font-medium mb-2 flex items-center" htmlFor="tripPurpose">
              <MdDirections className="mr-2 text-blue-600" />
              Trip Purpose*
            </label>
            <select
              id="tripPurpose"
              name="tripPurpose"
              required
              value={formData.tripPurpose}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
            >
              {tripPurposeOptions.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purpose}
                </option>
              ))}
            </select>
          </div>
          
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center p-3 bg-blue-50 rounded-md border border-blue-100 transition-all duration-300 hover:bg-blue-100">
              <input
                id="visitNearby"
                name="visitNearby"
                type="checkbox"
                checked={formData.visitNearby}
                onChange={handleChange}
                className="h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label className="ml-2 text-gray-700 flex items-center" htmlFor="visitNearby">
                <FaMapMarkedAlt className="mr-2 text-blue-600" />
                Include nearby attractions
              </label>
            </div>
          </div>
        </div>
        
        <div className="mt-8 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className={`bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md transition duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Generating...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <FaPlaneDeparture className="mr-2" />
                Generate Trip Plan
              </div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TripForm;