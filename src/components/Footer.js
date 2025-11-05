import React from 'react';
import { Link } from 'react-router-dom';
import { FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-100 dark:bg-gray-800 mt-20"
    >
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">MyBlog</h3>
            <p className="text-gray-600 dark:text-gray-400">
              A modern blog by Anas, built with React and WordPress.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-primary">Home</Link></li>
              <li><Link to="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary">Blog</Link></li>
              <li><Link to="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Technology</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Design</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Lifestyle</a></li>
              <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary">Business</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                <FiGithub size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                <FiLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            © 2024 MyBlog by Anas. All rights reserved.
          </p>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;