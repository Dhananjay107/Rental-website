import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4 text-teal-400">RentHub</h3>
            <p className="text-gray-300 mb-6 text-sm leading-relaxed">
              The marketplace for renting anything you need. 
              Save money, reduce waste, and access quality items 
              without the commitment of ownership.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-teal-400 transition-colors">
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Browse All Items
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/list-item" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  List Your Item
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=cameras" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Cameras
                </Link>
              </li>
              <li>
                <Link to="/products?category=party-supplies" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Party Supplies
                </Link>
              </li>
              <li>
                <Link to="/products?category=tools" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Tools
                </Link>
              </li>
              <li>
                <Link to="/products?category=formal-wear" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Formal Wear
                </Link>
              </li>
              <li>
                <Link to="/products?category=electronics" className="text-gray-300 hover:text-teal-400 transition-colors text-sm">
                  Electronics
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin size={18} className="mt-1 mr-2 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">
                  123 Main Street, Seattle, WA 98101
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="mr-2 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">(555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="mr-2 text-teal-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">support@renthub.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} RentHub. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link to="/sitemap" className="text-gray-400 hover:text-teal-400 transition-colors text-sm">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;