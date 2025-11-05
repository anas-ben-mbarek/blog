import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser } from 'react-icons/fi';

const BlogCard = ({ post, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
    >
      {post.featured_media && (
        <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500"></div>
      )}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">
          <Link 
            to={`/post/${post.id}`}
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            className="hover:text-primary transition-colors"
          />
        </h3>
        <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4 space-x-4">
          <span className="flex items-center">
            <FiCalendar className="mr-1" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="flex items-center">
            <FiUser className="mr-1" />
            {post.author_name || 'Anas'}
          </span>
        </div>
        <div 
          className="text-gray-700 dark:text-gray-300 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
        />
        <Link 
          to={`/post/${post.id}`}
          className="inline-block mt-4 text-primary hover:underline"
        >
          Read More →
        </Link>
      </div>
    </motion.div>
  );
};

export default BlogCard;