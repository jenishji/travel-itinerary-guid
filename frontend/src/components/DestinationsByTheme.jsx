import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { ChevronLeft, ChevronRight, MapPin, Calendar, Heart } from 'lucide-react';
import CountrySelector from './CountrySelector';

const DestinationsByTheme = ({ onPlanTrip }) => {
  const [themes, setThemes] = useState([
    { id: 1, name: 'Beach Destinations', icon: '🏖️', color: 'from-blue-400 to-teal-300', bgImage: '/api/placeholder/400/320' },
    { id: 2, name: 'Mountain Retreats', icon: '🏔️', color: 'from-emerald-500 to-green-400', bgImage: '/api/placeholder/400/320' },
    { id: 3, name: 'City Breaks', icon: '🏙️', color: 'from-purple-500 to-indigo-500', bgImage: '/api/placeholder/400/320' },
    { id: 4, name: 'Adventure Trips', icon: '🧗', color: 'from-amber-500 to-orange-400', bgImage: '/api/placeholder/400/320' },
    { id: 5, name: 'Honeymoon Spots', icon: '💑', color: 'from-pink-500 to-rose-400', bgImage: '/api/placeholder/400/320' },
    { id: 6, name: 'Family Vacations', icon: '👨‍👩‍👧‍👦', color: 'from-sky-500 to-blue-400', bgImage: '/api/placeholder/400/320' },
    { id: 7, name: 'Cultural Tours', icon: '🏛️', color: 'from-amber-400 to-yellow-300', bgImage: '/api/placeholder/400/320' },
    { id: 8, name: 'Wildlife Safaris', icon: '🦁', color: 'from-lime-500 to-green-400', bgImage: '/api/placeholder/400/320' },
  ]);
  
  const [selectedTheme, setSelectedTheme] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('Worldwide');
  const [destinations, setDestinations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [expandedDestination, setExpandedDestination] = useState(null); 
  const [favorites, setFavorites] = useState([]);
  
  const scrollContainerRef = useRef(null);
  
  // Animation effect when destinations load
  useEffect(() => {
    if (destinations.length > 0) {
      const cards = document.querySelectorAll('.destination-card');
      cards.forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('animate-fade-in');
        }, index * 100);
      });
    }
  }, [destinations]);
  
  // Effect to fetch destinations when theme or country changes
  useEffect(() => {
    if (selectedTheme) {
      fetchDestinations(selectedTheme.id, selectedCountry);
    }
  }, [selectedTheme, selectedCountry]);
  
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };
  
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };
  
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    // The effect will handle fetching destinations if needed
  };
  
  const handleThemeSelect = (theme) => {
    setSelectedTheme(theme);
    // The effect will handle fetching destinations
  };
  
  const fetchDestinations = async (themeId, country) => {
    setIsLoading(true);
    setError(null);
    setExpandedDestination(null);
    
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/destinations/theme/${themeId}`, {
        params: { country }
      });
      
      if (response.data.success) {
        setDestinations(response.data.destinations);
      } else {
        setError('Failed to load destinations');
      }
    } catch (err) {
      setError('Error fetching destinations. Please try again.');
      console.error('Error fetching destinations:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleExpandDestination = (id) => {
    setExpandedDestination(expandedDestination === id ? null : id);
  };
  
  const toggleFavorite = (id) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="my-16 px-6">
      <h2 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
        Discover Your Perfect Getaway
      </h2>
      
      {/* Country Selector */}
      <div className="mb-8">
        <CountrySelector onSelectCountry={handleCountrySelect} />
      </div>
      
      {/* Themes Scrollable Container */}
      <div className="relative mb-16">
        <button 
          onClick={scrollLeft} 
          className="absolute -left-3 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Scroll left"
        >
          <ChevronLeft size={20} />
        </button>
        
        <div 
          ref={scrollContainerRef}
          className="flex overflow-x-auto py-6 px-10 scrollbar-hide snap-x gap-6"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {themes.map(theme => (
            <div 
              key={theme.id}
              className={`flex-shrink-0 w-52 h-52 rounded-xl shadow-md snap-start cursor-pointer transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden ${
                selectedTheme?.id === theme.id ? 'ring-4 ring-blue-500 scale-105' : ''
              }`}
              onClick={() => handleThemeSelect(theme)}
            >
              <div className={`absolute inset-0 bg-gradient-to-tl ${theme.color} opacity-90`}></div>
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="absolute top-3 right-3 bg-white bg-opacity-90 text-blue-800 text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                Top 12
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-4">
                <span className="text-5xl mb-3">{theme.icon}</span>
                <h3 className="text-lg font-bold text-center">{theme.name}</h3>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          onClick={scrollRight} 
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white p-3 rounded-full shadow-lg z-10 hover:bg-gray-100 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="Scroll right"
        >
          <ChevronRight size={20} />
        </button>
      </div>
      
      {/* Destinations Display */}
      {selectedTheme && (
        <div className="mt-10 transition-opacity duration-500 opacity-100">
          <h3 className="text-3xl font-bold mb-8 flex items-center justify-center text-center">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Top 12 {selectedTheme.name} in {selectedCountry}
            </span>
            <span className="text-3xl ml-3">{selectedTheme.icon}</span>
          </h3>
          
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-12 w-12 rounded-full border-4 border-blue-500 border-t-transparent"></div>
            </div>
          ) : error ? (
            <div className="text-red-500 text-center p-6 bg-red-50 rounded-lg">
              <p className="font-medium">{error}</p>
              <button 
                onClick={() => fetchDestinations(selectedTheme.id, selectedCountry)}
                className="mt-3 text-white bg-red-500 hover:bg-red-600 font-medium rounded-lg text-sm px-5 py-2.5 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {destinations.map((destination, index) => (
                <div 
                  key={destination.id} 
                  className="destination-card bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl opacity-0 transform hover:-translate-y-2"
                  style={{ animationFillMode: 'forwards' }}
                >
                  <div className="relative h-56 overflow-hidden group">
                    <img 
                      src={destination.imageUrl} 
                      alt={destination.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-black to-transparent opacity-60"></div>
                    <div className="absolute top-3 left-3 bg-blue-600 text-white font-bold w-8 h-8 flex items-center justify-center rounded-full shadow-md">
                      {index + 1}
                    </div>
                    <button 
                      onClick={(e) => { 
                        e.stopPropagation(); 
                        toggleFavorite(destination.id); 
                      }}
                      className="absolute top-3 right-3 p-2 rounded-full bg-white bg-opacity-80 transition-all duration-300 hover:bg-opacity-100"
                    >
                      <Heart 
                        size={18} 
                        fill={favorites.includes(destination.id) ? "#ef4444" : "none"} 
                        stroke={favorites.includes(destination.id) ? "#ef4444" : "#374151"} 
                      />
                    </button>
                    <div className="absolute bottom-3 left-3 flex items-center text-white">
                      <MapPin size={16} className="mr-1" />
                      <span className="text-sm font-medium">{destination.location}</span>
                    </div>
                  </div>
                  
                  <div className="p-5">
                    <h4 className="text-xl font-bold mb-3 text-gray-800">{destination.name}</h4>
                    <p className="text-gray-500 text-sm mb-4">{destination.shortDescription}</p>
                    
                    <div className={`overflow-hidden transition-all duration-500 ${
                      expandedDestination === destination.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <p className="text-gray-900 mb-5">{destination.longDescription}</p>
                      
                      <div className="flex items-center mb-4 text-sm">
                        <Calendar size={16} className="mr-2 text-blue-600" />
                        <span className="text-gray-700">Best time to visit: {destination.bestTimeToVisit || 'Year-round'}</span>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => toggleExpandDestination(destination.id)}
                      className="text-blue-600 font-medium hover:text-blue-800 transition-colors"
                    >
                      {expandedDestination === destination.id ? 'Read less' : 'Read more'}
                    </button>
                  </div>
                  
                  <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                    <button 
                      onClick={() => onPlanTrip({...destination, country: selectedCountry})}
                      className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white py-3 px-6 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md flex items-center justify-center"
                    >
                      <span>Plan Your Trip</span>
                      <ChevronRight size={18} className="ml-2" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      {/* Add some styling for the fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DestinationsByTheme;