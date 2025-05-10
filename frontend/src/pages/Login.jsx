import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserContext } from '../context/UserContext';
import { Toaster, toast } from 'react-hot-toast';
import { 
  Mail, 
  Lock, 
  Plane, 
  Mountain, 
  Map, 
  Sun, 
  Cloud 
} from 'lucide-react';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.data.success) {
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        
        toast.success(`Welcome back, ${response.data.user.name}!`, {
          icon: '✈️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        });
        
        navigate('/');
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error logging in. Please try again.';
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

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white relative overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Decorative Travel Icons */}
      <motion.div 
        className="absolute top-10 left-10 text-blue-300"
        animate={{ 
          rotate: [0, 10, -10, 0],
          scale: [1, 1.1, 0.9, 1]
        }}
        transition={{ 
          duration: 5, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <Mountain size={60} />
      </motion.div>
      
      <motion.div 
        className="absolute bottom-10 right-10 text-yellow-400"
        animate={{ 
          y: [0, 20, -20, 0],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 6, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <Sun size={50} />
      </motion.div>
      
      <motion.div 
        className="absolute top-20 right-20 text-blue-200"
        animate={{ 
          x: [0, 30, -30, 0],
          rotate: [0, 15, -15, 0]
        }}
        transition={{ 
          duration: 7, 
          repeat: Infinity,
          repeatType: "reverse" 
        }}
      >
        <Cloud size={70} />
      </motion.div>

      {/* Login Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-8 space-y-8 bg-white/90 backdrop-blur-sm shadow-2xl rounded-2xl relative z-10"
      >
        {/* Plane Icon */}
        <motion.div 
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-600 p-4 rounded-full shadow-lg"
          initial={{ rotate: -20 }}
          animate={{ 
            rotate: [0, 10, -10, 0],
            y: [0, -10, 10, 0]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            repeatType: "reverse" 
          }}
        >
          <Plane size={40} color="white" />
        </motion.div>

        <div className="text-center mt-8">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-2 flex items-center justify-center">
            <Map size={30} className="mr-2 text-blue-600" />
            Travel AI Guide
          </h2>
          <p className="text-gray-500">Login to your adventure</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 flex items-center">
              <Mail size={18} className="mr-2 text-blue-600" />
              Email
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                id="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 flex items-center">
              <Lock size={18} className="mr-2 text-blue-600" />
              Password
            </label>
            <div className="relative">
              <input
                type="password"
                name="password"
                id="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 pl-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 space-x-2"
          >
            <Plane size={20} />
            <span>Login</span>
          </motion.button>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;