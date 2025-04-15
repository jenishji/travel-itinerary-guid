import React, { useState, useEffect, useRef, useContext } from 'react';
import { ChevronDown, MapPin, X, Search, Globe } from 'lucide-react';
import axios from 'axios';
import { UserContext } from '../context/UserContext'; // Adjust the path as needed

const CountrySelector = ({ onSelectCountry }) => {
  const { userLocation, isLoadingLocation } = useContext(UserContext);
  const [countries, setCountries] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [hasUserSelectedCountry, setHasUserSelectedCountry] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Fetch countries from REST Countries API
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://restcountries.com/v3.1/all?fields=name,cca2,flags');
        
        // Sort countries alphabetically by name
        const sortedCountries = response.data
          .map(country => ({
            code: country.cca2,
            name: country.name.common,
            flag: country.flags.svg || country.flags.png
          }))
          .sort((a, b) => a.name.localeCompare(b.name));

        // Add "Worldwide" as the first option (without a flag image)
        setCountries([
          { code: 'WW', name: 'Worldwide', isGlobe: true },
          ...sortedCountries
        ]);
        
        setIsLoading(false);
      } catch (err) {
        console.error('Error fetching countries:', err);
        setError('Failed to load countries');
        setIsLoading(false);
      }
    };

    fetchCountries();
  }, []);

  // Set the selected country based on user's location ONLY if user hasn't manually selected a country
  useEffect(() => {
    // Only set the country from location if the user hasn't made a manual selection yet
    if (!hasUserSelectedCountry && !isLoadingLocation && countries.length > 0) {
      if (userLocation && userLocation.countryCode) {
        const foundCountry = countries.find(c => c.code === userLocation.countryCode);
        
        if (foundCountry) {
          setSelectedCountry(foundCountry);
          if (onSelectCountry) onSelectCountry(foundCountry.name);
        } else {
          // Fallback to Worldwide if country not found
          const worldwide = countries.find(c => c.code === 'WW');
          if (worldwide) {
            setSelectedCountry(worldwide);
            if (onSelectCountry) onSelectCountry(worldwide.name);
          }
        }
      } else {
        // If loading location failed or location is not available, default to Worldwide
        const worldwide = countries.find(c => c.code === 'WW');
        if (worldwide) {
          setSelectedCountry(worldwide);
          if (onSelectCountry) onSelectCountry(worldwide.name);
        }
      }
    }
  }, [userLocation, isLoadingLocation, countries, onSelectCountry, hasUserSelectedCountry]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setSearchTerm('');
  };

  const handleSelectCountry = (country) => {
    setSelectedCountry(country);
    setHasUserSelectedCountry(true); // Mark that user has manually selected a country
    setIsOpen(false);
    if (onSelectCountry) onSelectCountry(country.name);
  };

  const filteredCountries = countries.filter(country => 
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative w-full max-w-md mx-auto" ref={dropdownRef}>
      <div 
        className="flex items-center justify-between bg-white border border-gray-300 rounded-lg px-4 py-3 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300"
        onClick={toggleDropdown}
      >
        <div className="flex items-center">
          <MapPin size={20} className="text-blue-600 mr-2" />
          {selectedCountry ? (
            <div className="flex items-center">
              {selectedCountry.isGlobe ? (
                <Globe size={20} className="text-blue-500 mr-2" />
              ) : (
                <img 
                  src={selectedCountry.flag} 
                  alt={`${selectedCountry.name} flag`} 
                  className="w-6 h-4 mr-2 object-cover rounded-sm shadow-sm" 
                />
              )}
              <span className="font-medium">{selectedCountry.name}</span>
            </div>
          ) : isLoading || isLoadingLocation ? (
            <span className="text-gray-500">Loading locations...</span>
          ) : (
            <span className="text-gray-500">Select a destination</span>
          )}
        </div>
        <ChevronDown 
          size={20} 
          className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'transform rotate-180' : ''}`} 
        />
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full bg-white rounded-lg shadow-lg z-20 border border-gray-200">
          <div className="p-3 border-b border-gray-200">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search countries..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button 
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto py-2">
            {isLoading ? (
              <div className="flex justify-center items-center py-4">
                <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                <span className="ml-2 text-gray-600">Loading countries...</span>
              </div>
            ) : error ? (
              <div className="text-red-500 text-center p-4">{error}</div>
            ) : filteredCountries.length === 0 ? (
              <div className="text-gray-500 text-center p-4">No countries found</div>
            ) : (
              filteredCountries.map(country => (
                <div
                  key={country.code}
                  className={`flex items-center px-4 py-2 cursor-pointer hover:bg-blue-50 transition-colors ${
                    selectedCountry?.code === country.code ? 'bg-blue-100' : ''
                  }`}
                  onClick={() => handleSelectCountry(country)}
                >
                  {country.isGlobe ? (
                    <Globe size={20} className="text-blue-500 mr-3" />
                  ) : (
                    <img 
                      src={country.flag} 
                      alt={`${country.name} flag`}
                      className="w-6 h-4 mr-3 object-cover rounded-sm shadow-sm" 
                    />
                  )}
                  <span className="font-medium">{country.name}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CountrySelector;