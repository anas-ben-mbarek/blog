import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiArrowLeft } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${window.wpData.apiUrl}posts/${id}`);
        setPost(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Post not found</h2>
          <Link to="/blog" className="text-primary hover:underline">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 px-4"
    >
      <div className="container mx-auto max-w-4xl">
        <Link to="/blog" className="inline-flex items-center text-primary hover:underline mb-8">
          <FiArrowLeft className="mr-2" /> Back to Blog
        </Link>
        
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-6"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex items-center text-gray-600 dark:text-gray-400 mb-8 space-x-6"
        >
          <span className="flex items-center">
            <FiCalendar className="mr-2" />
            {new Date(post.date).toLocaleDateString()}
          </span>
          <span className="flex items-center">
            <FiUser className="mr-2" />
            {post.author_name || 'Anas'}
          </span>
        </motion.div>
        
        {post.featured_media && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-8"
          />
        )}
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </div>
    </motion.article>
  );
};

export default SinglePost;