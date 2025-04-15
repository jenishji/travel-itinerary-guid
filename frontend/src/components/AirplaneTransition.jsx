import React, { useState, useEffect } from 'react';
import airplane from '../images/airplane.webp'

const AirplaneTransition = ({ onAnimationComplete }) => {
    const [position, setPosition] = useState(-100); // Start further off-screen to the left
    const [opacity, setOpacity] = useState(0); // Start fully transparent
    const [clouds, setClouds] = useState([]);
    
    useEffect(() => {
      // Start the animation
      const animationId = requestAnimationFrame(animate);
      
      function animate() {
        setPosition(prevPos => {
          // If the airplane has flown across the screen, complete the animation
          if (prevPos > window.innerWidth + 450) {
            onAnimationComplete();
            return prevPos;
          }
          // Otherwise, keep moving the airplane
          return prevPos + 0.06; 
        });
        
        // Calculate opacity based on position
        const screenWidth = window.innerWidth + 300;
        // Fade in during the first 10% of the journey
        // Fade out during the last 10% of the journey
        const newOpacity = 
          position < 0 ? (position + 100) / 100 : // Fade in (from -100 to 0)
          position > screenWidth ? 1 - ((position - screenWidth) / 100) : // Fade out (from screenWidth to screenWidth+100)
          1; // Full opacity in the middle
          
        setOpacity(Math.max(0, Math.min(1, newOpacity))); // Clamp between 0 and 1
  
        // Cloud movement
        setClouds(prevClouds => 
          prevClouds.map(cloud => ({
            ...cloud,
            left: cloud.left - cloud.speed
          }))
        );
        
        if (position <= window.innerWidth + 100) {
          requestAnimationFrame(animate);
        }
      }
      
      return () => cancelAnimationFrame(animationId);
    }, [position, onAnimationComplete]);
  
    const destination = localStorage.getItem('destination') || 'your destination';
    
    return (
      <div className="fixed inset-0 z-50 bg-blue-50 bg-opacity-80 ">
  
        <div className="absolute top-10 right-20 w-32 h-32 bg-yellow-200 rounded-full blur-xl "></div>
  
        {clouds.map(cloud => (
          <div 
            key={cloud.id}
            className="absolute rounded-full bg-gray-900 blur-xl"
            style={{
              left: `${cloud.left}px`,
              top: `${cloud.top}px`,
              width: `${cloud.size}px`,
              height: `${cloud.size * 0.6}px`,
              opacity: cloud.opacity,
              transition: 'opacity 0.5s ease'
            }}
          ></div>
        ))}
  
          <div className='flex justify-center p-10'>
          <div className="inline-block bg-white bg-opacity-80 px-8 py-4 rounded-full shadow-lg text-center mb-60 ">
            <h2 className="text-3xl font-bold text-blue-800">
              <span className="inline-block animate-pulse mr-2">✈️</span> 
              Flying to <span className="text-indigo-700">{destination}</span>
              <span className="animate-bounce inline-block ml-2">.</span>
              <span className="animate-bounce inline-block delay-100">.</span>
              <span className="animate-bounce inline-block delay-200">.</span>
            </h2>
          </div>
          </div>
  
          <div className="flex items-center justify-center">
          <div 
            className="absolute"
            style={{
              left: `${position}px`,
              transform: 'translateX(-80%)',
              opacity: opacity,
              position: 'relative' 
            }}
          >
            {/* Airplane Image */}
            <img
              src={airplane}
              alt="Airplane"
              style={{ position: 'relative' }}
              className='w-[50%] h-[60%]'
            />
            
            {/* Smoke effects - positioned AFTER the airplane */}
            <div 
              className="absolute top-16 right-full flex space-x-1" 
              style={{ transform: 'translateX(-10%)' }}
            >
              {/* Multiple smoke particles with different animations */}
              <div className="w-10 h-10 bg-gray-800 rounded-full opacity-30 animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-800 rounded-full opacity-40 animate-pulse"></div> 
              <div className="w-6 h-6 bg-gray-800 rounded-full opacity-60 animate-pulse"></div>  
              <div className="w-4 h-4 bg-gray-800 rounded-full opacity-80 animate-pulse"></div>
            </div>
            
            {/* Additional smoke trail - positioned AFTER the airplane */}
            <div 
              className="absolute top-16 right-full w-32 h-2 bg-gray-200 rounded-full opacity-10" 
              style={{ transform: 'translateX(-20%)' }}
            ></div>
            <div 
              className="absolute top-20 right-full w-36 h-2 bg-gray-100 rounded-full opacity-15" 
              style={{ transform: 'translateX(-15%)' }}
            ></div>
            <div 
              className="absolute top-20 right-full w-40 h-3 bg-gray-400 rounded-full opacity-20" 
              style={{ transform: 'translateX(-25%)' }}
            ></div>
          </div>
        </div>
      </div>
    );
  };

  
  export default AirplaneTransition;