import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { motion, useScroll } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import Button from '../common/Button';

const categories = [
  { name: 'Watches', path: '/category/watches' },
  { name: 'Jewelry', path: '/category/jewelry' },
  { name: 'Accessories', path: '/category/accessories' },
  { name: 'Collectibles', path: '/category/collectibles' }
];

const LuxuryNavbar = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { scrollY } = useScroll();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { items } = useSelector(state => state.cart);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <motion.header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-luxury-black/90">
      {/* Top Bar with Categories */}
      <div className="border-b border-luxury-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-12 space-x-8">
            {categories.map((category) => (
              <Link
                key={category.path}
                to={category.path}
                className="text-sm text-luxury-cream hover:text-luxury-gold transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Site Name */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-serif text-luxury-gold">VelvetCoin</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-auto px-8">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
                placeholder="Search luxury items..."
                className="w-full bg-luxury-charcoal border-luxury-gray-700 text-luxury-cream rounded-md pl-10 pr-4 py-2 focus:border-luxury-gold focus:ring-luxury-gold"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-luxury-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Auth & Cart */}
          <div className="flex items-center space-x-6">
            <Link to="/cart" className="relative group">
              <div className="text-luxury-cream hover:text-luxury-gold transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-luxury-gold text-luxury-black text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                    {items.length}
                  </span>
                )}
              </div>
            </Link>

            {isAuthenticated ? (
              <div className="relative">
                <Button
                  variant="text"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2"
                >
                  <span>{user.username}</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </Button>

                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-luxury-charcoal border border-luxury-gray-800 rounded-md shadow-lg py-1">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-luxury-cream hover:bg-luxury-black hover:text-luxury-gold"
                    >
                      Profile
                    </Link>
                    <Link
                      to="/orders"
                      className="block px-4 py-2 text-sm text-luxury-cream hover:bg-luxury-black hover:text-luxury-gold"
                    >
                      Orders
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-luxury-cream hover:bg-luxury-black hover:text-luxury-gold"
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login">
                  <Button variant="text" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm">
                    Register
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default LuxuryNavbar;