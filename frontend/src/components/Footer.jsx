import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Mail, Shield, FileText, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-800 to-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1: About */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Travel AI Guide</h3>
            <p className="text-gray-400 text-sm mb-4">
              Your AI-powered travel companion for personalized itineraries and unique adventures around the world.
            </p>
            <div className="flex space-x-3 mt-4">
              <a href="#" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
                <Linkedin size={18} />
              </a>
              <a href="#" className="hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Column 2: Explore */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/destinations" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <MapPin size={16} className="mr-2" />
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/guides" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <MapPin size={16} className="mr-2" />
                  Travel Guides
                </Link>
              </li>
              <li>
                <Link to="/tips" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <MapPin size={16} className="mr-2" />
                  Tips & Tricks
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <MapPin size={16} className="mr-2" />
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link to="/promotions" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <MapPin size={16} className="mr-2" />
                  Special Offers
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Support */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <FileText size={16} className="mr-2" />
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <Mail size={16} className="mr-2" />
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <FileText size={16} className="mr-2" />
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <FileText size={16} className="mr-2" />
                  Help Center
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <Shield size={16} className="mr-2" />
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <FileText size={16} className="mr-2" />
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <FileText size={16} className="mr-2" />
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link to="/accessibility" className="text-gray-400 hover:text-white text-sm flex items-center transition-colors">
                  <FileText size={16} className="mr-2" />
                  Accessibility
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Subscription */}
        <div className="mt-12 bg-gray-800 p-6 rounded-lg">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="text-white text-lg font-semibold mb-2">Join Our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-4">
              Subscribe to receive travel tips, special offers, and AI-powered travel insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="px-4 py-2 bg-gray-700 text-white rounded-md flex-grow focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section with Copyright */}
        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© 2025 Travel AI Guide. All rights reserved.</p>
            <div className="mt-4 md:mt-0">
              <ul className="flex flex-wrap justify-center space-x-4">
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms</Link></li>
                <li><Link to="/sitemap" className="hover:text-white transition-colors">Sitemap</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;