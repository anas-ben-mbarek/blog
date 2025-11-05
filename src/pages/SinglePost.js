import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const SinglePost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
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

  useEffect(() => {
    const fetchRelatedPosts = async () => {
      try {
        // Fetch 4 recent posts excluding the current one
        const response = await axios.get(`${window.wpData.apiUrl}posts?per_page=4&exclude=${id}`);
        setRelatedPosts(response.data);
      } catch (error) {
        console.error('Error fetching related posts:', error);
      }
    };

    if (post) {
      fetchRelatedPosts();
    }
  }, [post, id]);

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
      className="min-h-screen pt-24 px-4 pb-16"
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
        
        {post.featured_media ? (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-96 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg mb-8"
          />
        ) : null}
        
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="prose prose-lg dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 pt-12 border-t border-gray-200 dark:border-gray-700"
          >
            <h2 className="text-3xl font-bold mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost, index) => (
                <motion.div
                  key={relatedPost.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Link to={`/post/${relatedPost.id}`} className="block">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
                      <div className="h-48 bg-gradient-to-r from-blue-400 to-purple-500" />
                      <div className="p-6">
                        <h3 
                          className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300"
                          dangerouslySetInnerHTML={{ __html: relatedPost.title.rendered }}
                        />
                        <div 
                          className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-4"
                          dangerouslySetInnerHTML={{ __html: relatedPost.excerpt.rendered }}
                        />
                        <div className="flex items-center text-primary font-medium">
                          Read More <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </motion.article>
  );
};

export default SinglePost;