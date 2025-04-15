import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // User state
  const [user, setUser] = useState(null);
  
  // Location states
  const [userLocation, setUserLocation] = useState(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(true);
  const [locationError, setLocationError] = useState(null);
  
  // Fetch user's location on component mount
  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              
              // Use reverse geocoding to get country from coordinates
              const response = await axios.get(
                `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
              );
              
              const locationData = {
                countryCode: response.data.countryCode,
                countryName: response.data.countryName,
                latitude,
                longitude,
                city: response.data.city,
                principalSubdivision: response.data.principalSubdivision, // State/province
              };
              
              setUserLocation(locationData);
              setIsLoadingLocation(false);
            } catch (err) {
              console.error('Error getting location details:', err);
              setLocationError('Failed to get location details');
              setIsLoadingLocation(false);
            }
          },
          (error) => {
            console.error('Error getting geolocation:', error);
            setLocationError(`Geolocation error: ${error.message}`);
            setIsLoadingLocation(false);
          }
        );
      } else {
        setLocationError('Geolocation is not supported by this browser');
        setIsLoadingLocation(false);
      }
    };

    getUserLocation();
  }, []);

  return (
    <UserContext.Provider value={{ 
      user, 
      setUser, 
      userLocation, 
      isLoadingLocation, 
      locationError 
    }}>
      {children}
    </UserContext.Provider>
  );
};