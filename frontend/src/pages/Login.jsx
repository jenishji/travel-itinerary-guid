import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import { Toaster, toast } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post('http://localhost:4000/api/v1/login', formData, {
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.data.success) {
        // Store token and update user context
        localStorage.setItem('token', response.data.token);
        setUser(response.data.user);
        
        // Show success toast
        toast.success(`Welcome back, ${response.data.user.name}!`, {
          icon: '✈️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          }
        });
        
        navigate('/'); // Redirect to home page or dashboard
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Error logging in. Please try again.';
      setError(errorMessage);
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-white">
      <Toaster position="top-right" />
      <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-2xl rounded-2xl">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-4">Travel AI Guide</h2>
          <p className="text-gray-500">Login to your adventure</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              value={formData.password}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Login
          </button>
        </form>
        <div className="text-center">
          <p className="mt-2 text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;