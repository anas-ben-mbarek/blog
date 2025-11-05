import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const About = () => {
  const skills = ['React', 'WordPress', 'JavaScript', 'TailwindCSS', 'Node.js', 'PHP'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen pt-24 px-4"
    >
      <div className="container mx-auto max-w-4xl">
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold text-center mb-12"
        >
          About Me
        </motion.h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="w-full max-w-sm mx-auto">
              <div className="w-64 h-64 mx-auto rounded-full bg-gradient-to-br from-blue-400 to-purple-600 p-1">
                <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-6xl">👨‍💻</span>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h2 className="text-3xl font-bold mb-4">Hi, I'm Anas</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              I'm a passionate full-stack developer with a love for creating beautiful, 
              functional web experiences. With expertise in React and WordPress, I bridge 
              the gap between modern JavaScript frameworks and powerful CMS solutions.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              This blog is where I share my thoughts on web development, design trends, 
              and the latest technologies shaping our digital world. Join me on this 
              journey as we explore the endless possibilities of the web!
            </p>
            
            <div className="flex space-x-4 mb-8">
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                <FiGithub size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="#" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                <FiLinkedin size={24} />
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-8 text-center">Skills & Technologies</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {skills.map((skill, index) => (
              <motion.span
                key={skill}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-primary text-white rounded-full font-medium"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;