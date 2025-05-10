import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import InviteNotifications from './InviteNotifications';
import { 
  MapPin, 
  LogOut, 
  User, 
  Plane, 
  LogIn, 
  UserPlus,
  Share2,
  Menu,
  X
} from 'lucide-react';

// Mobile Menu Component (Separate from NavBar)
const MobileMenu = ({ user, onLogout, onViewTripPlan, onViewInvitedTrips, onAcceptInvite, isOpen, onClose }) => {
  const navigate = useNavigate();
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Prevent scrolling of the body when menu is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Re-enable scrolling when menu is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  const slideVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'tween', duration: 0.3 } },
    exit: { x: '100%', opacity: 0, transition: { type: 'tween', duration: 0.3 } }
  };

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black/50 z-40"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={overlayVariants}
      >
        <motion.div
          ref={menuRef}
          className="fixed top-0 right-0 h-full bg-white shadow-xl z-40 overflow-y-auto"
          style={{ maxWidth: "320px", width: "85%" }}
          variants={slideVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex justify-between items-center p-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-blue-600">Menu</h2>
            <button 
              onClick={onClose} 
              className="p-2 text-gray-500 hover:text-red-500 rounded-full"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="p-6 space-y-6">
            {user ? (
              <>
                <div className="flex items-center space-x-3 text-blue-800 bg-blue-50 px-4 py-3 rounded-lg">
                  <User size={20} />
                  <span className="font-medium truncate">{user.name}</span>
                </div>
                
                <button
                  onClick={() => {
                    onViewTripPlan();
                    onClose();
                  }}
                  className="flex items-center space-x-3 w-full bg-blue-100 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <MapPin size={20} />
                  <span>My Trip Plan</span>
                </button>
                
                <button
                  onClick={() => {
                    onViewInvitedTrips();
                    onClose();
                  }}
                  className="flex items-center space-x-3 w-full bg-teal-100 text-teal-700 px-4 py-3 rounded-lg hover:bg-teal-200 transition-colors"
                >
                  <Share2 size={20} />
                  <span>Invited Trips</span>
                </button>
                
                <button
                  onClick={() => {
                    onLogout();
                    navigate('/');
                    onClose();
                  }}
                  className="flex items-center space-x-3 w-full text-red-600 border border-red-300 px-4 py-3 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    navigate('/login');
                    onClose();
                  }}
                  className="flex items-center space-x-3 w-full bg-blue-100 text-blue-700 px-4 py-3 rounded-lg hover:bg-blue-200 transition-colors"
                >
                  <LogIn size={20} />
                  <span>Login</span>
                </button>
                
                <button
                  onClick={() => {
                    navigate('/signup');
                    onClose();
                  }}
                  className="flex items-center space-x-3 w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-3 rounded-lg hover:from-yellow-500 hover:to-yellow-400 transition-colors shadow-md"
                >
                  <UserPlus size={20} />
                  <span>Sign Up</span>
                </button>
              </>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const NavBar = ({ user, onLogout, onViewTripPlan, onAcceptInvite, onViewInvitedTrips }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const desktopNotificationRef = useRef(null);
  const mobileNotificationRef = useRef(null);
  
  // Determine if we're on the home page (with Hero)
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  // Dynamic navbar styles based on home page and scroll state
  const navbarClasses = isHomePage 
    ? scrolled 
      ? "fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md shadow-md border-b border-blue-100 transition-all duration-300"
      : "fixed top-0 left-0 right-0 z-30 bg-transparent transition-all duration-300"
    : "fixed top-0 left-0 right-0 z-30 bg-white/90 backdrop-blur-md shadow-md border-b border-blue-100";

  // Logo and text styles based on home page and scroll state
  const logoTextClasses = isHomePage && !scrolled
    ? "text-xl sm:text-2xl font-bold text-white group-hover:text-yellow-300 transition-all"
    : "text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent group-hover:from-blue-500 group-hover:to-blue-700 transition-all";

  const logoIconClasses = isHomePage && !scrolled
    ? "text-white group-hover:text-yellow-300 group-hover:rotate-12 transition-all duration-300"
    : "text-blue-600 group-hover:rotate-12 transition-transform duration-300";

  // User info display styles
  const userInfoClasses = isHomePage && !scrolled
    ? "flex items-center space-x-2 text-white bg-blue-800/40 backdrop-blur-sm px-3 py-2 rounded-full"
    : "flex items-center space-x-2 text-blue-800 bg-blue-50 px-3 py-2 rounded-full";

  // Button styles for authenticated users
  const tripPlanButtonClasses = isHomePage && !scrolled
    ? "flex items-center space-x-2 bg-blue-600/40 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-blue-700/50 transition-colors"
    : "flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors";

  const invitedTripsButtonClasses = isHomePage && !scrolled
    ? "flex items-center space-x-2 bg-teal-600/40 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-teal-700/50 transition-colors"
    : "flex items-center space-x-2 bg-teal-100 text-teal-700 px-4 py-2 rounded-full hover:bg-teal-200 transition-colors";

  const logoutButtonClasses = isHomePage && !scrolled
    ? "flex items-center space-x-2 text-white border border-white/50 px-4 py-2 rounded-full hover:bg-white/10 hover:text-red-500 hover:border-red-700 transition-colors"
    : "flex items-center space-x-2 text-red-600 hover:text-white border border-red-300 px-4 py-2 rounded-full hover:bg-red-600 transition-colors duration-600";

  // Button styles for non-authenticated users
  const loginButtonClasses = isHomePage && !scrolled
    ? "flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full hover:bg-white/30 transition-colors"
    : "flex items-center space-x-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full hover:bg-blue-200 transition-colors";

  // Menu icon color
  const menuIconClasses = isHomePage && !scrolled ? "text-white" : "text-blue-600";

  return (
    <>
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={navbarClasses}
      >
        <div className="mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link 
              to="/" 
              className="flex items-center space-x-2 sm:space-x-3 group z-10"
            >
              <Plane className={logoIconClasses} size={28} />
              <span className={logoTextClasses}>Traven</span>
            </Link>

            {/* Mobile Navigation Icons */}
            <div className="flex items-center space-x-4 lg:hidden">
              {/* Mobile Notification Bell */}
              {user && (
                <div className="z-50">
                  <InviteNotifications 
                    user={user} 
                    onInviteAccept={(tripId) => {
                      onAcceptInvite(tripId);
                    }} 
                    isTopLayer={true}
                  />
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <Menu size={24} className={menuIconClasses} />
              </button>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              {user ? (
                <>
                  <div className="flex items-center space-x-4 xl:space-x-6">
                    <div className={userInfoClasses}>
                      <User size={18} />
                      <span className="font-medium">{user.name}</span>
                    </div>

                    <motion.button
                      onClick={onViewTripPlan}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={tripPlanButtonClasses}
                    >
                      <MapPin size={18} />
                      <span>My Trip Plan</span>
                    </motion.button>

                    <motion.button
                      onClick={onViewInvitedTrips}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={invitedTripsButtonClasses}
                    >
                      <Share2 size={18} />
                      <span>Invited Trips</span>
                    </motion.button>

                    <InviteNotifications 
                      user={user} 
                      onInviteAccept={(tripId) => {
                        onAcceptInvite(tripId);
                      }} 
                    />

                    <motion.button
                      onClick={() => {
                        onLogout();
                        navigate('/');
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={logoutButtonClasses}
                    >
                      <LogOut size={18} />
                      <span>Logout</span>
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-4">
                    <motion.button
                      onClick={() => navigate('/login')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={loginButtonClasses}
                    >
                      <LogIn size={18} />
                      <span>Login</span>
                    </motion.button>

                    <motion.button
                      onClick={() => navigate('/signup')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 px-4 py-2 rounded-full hover:from-yellow-500 hover:to-yellow-400 transition-colors shadow-md"
                    >
                      <UserPlus size={18} />
                      <span>Sign Up</span>
                    </motion.button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Separate Mobile Menu Component */}
      <MobileMenu 
        user={user}
        onLogout={onLogout}
        onViewTripPlan={onViewTripPlan}
        onViewInvitedTrips={onViewInvitedTrips}
        onAcceptInvite={onAcceptInvite}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
      />
    </>
  );
};

export default NavBar;