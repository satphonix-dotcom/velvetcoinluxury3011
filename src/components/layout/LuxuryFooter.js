import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const LuxuryFooter = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'Watches', path: '/category/watches' },
        { name: 'Jewelry', path: '/category/jewelry' },
        { name: 'Accessories', path: '/category/accessories' },
        { name: 'New Arrivals', path: '/new-arrivals' }
      ]
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', path: '/contact' },
        { name: 'Shipping Information', path: '/shipping' },
        { name: 'Returns & Exchanges', path: '/returns' },
        { name: 'Order Tracking', path: '/orders' },
        { name: 'FAQ', path: '/faq' }
      ]
    },
    {
      title: 'About',
      links: [
        { name: 'Our Story', path: '/about' },
        { name: 'Careers', path: '/careers' },
        { name: 'Press', path: '/press' },
        { name: 'Blog', path: '/blog' }
      ]
    },
    {
      title: 'Legal',
      links: [
        { name: 'Terms of Service', path: '/terms' },
        { name: 'Privacy Policy', path: '/privacy' },
        { name: 'Cookie Policy', path: '/cookies' },
        { name: 'Accessibility', path: '/accessibility' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Instagram', url: '#', icon: 'instagram' },
    { name: 'Twitter', url: '#', icon: 'twitter' },
    { name: 'Facebook', url: '#', icon: 'facebook' },
    { name: 'LinkedIn', url: '#', icon: 'linkedin' }
  ];

  return (
    <footer className="bg-luxury-charcoal border-t border-luxury-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Newsletter Section */}
        <div className="py-12 border-b border-luxury-gray-800">
          <div className="max-w-xl mx-auto text-center">
            <h3 className="text-2xl font-serif text-luxury-cream mb-4">
              Join the Elite
            </h3>
            <p className="text-luxury-gray-400 mb-6">
              Subscribe to receive exclusive offers and updates on new arrivals
            </p>
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 bg-luxury-black border border-luxury-gray-700 text-luxury-cream px-4 py-2 rounded-md focus:outline-none focus:border-luxury-gold"
              />
              <button className="bg-luxury-gold text-luxury-black px-6 py-2 rounded-md hover:bg-luxury-gold-light transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-luxury-gold font-serif text-lg mb-4">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-luxury-gray-400 hover:text-luxury-gold transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-luxury-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <span className="text-luxury-gold font-serif text-xl">
                VelvetCoin
              </span>
              <span className="text-luxury-gray-400 text-sm">
                © {new Date().getFullYear()} All rights reserved
              </span>
            </div>
            <div className="flex space-x-6">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1 }}
                  className="text-luxury-gray-400 hover:text-luxury-gold transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {social.name}
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LuxuryFooter;