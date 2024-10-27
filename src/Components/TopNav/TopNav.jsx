import { Navbar } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const TopNav = () => {
  return (
    <Navbar className="bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 shadow-xl fixed w-full z-50 border-b border-white/20 backdrop-blur-sm" fluid rounded>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center"
      >
        <Navbar.Brand href="https://flowbite-react.com">
          <span className="self-center whitespace-nowrap text-2xl font-bold text-white hover:scale-105 transition-transform duration-300 drop-shadow-md">
            Instagram Hate Detection
          </span>
        </Navbar.Brand>
      </motion.div>

      <Navbar.Toggle className="hover:bg-white/10 focus:ring-0 transition-colors duration-300" />
      
      <Navbar.Collapse>
        <motion.div 
          className="flex flex-col md:flex-row gap-6 md:gap-8 items-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {[
            { to: "/", text: "Home" },
            { to: "/detect", text: "Detect" },
            { to: "/audio", text: "Audio" },
            { to: "/how-it-works", text: "How it works" },
            { to: "/contact", text: "Contact" }
          ].map((item, index) => (
            <motion.div
              key={item.to}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1,
                scale: {
                  type: "spring",
                  stiffness: 300
                }
              }}
            >
              <Link 
                to={item.to}
                className="relative text-lg font-medium text-white hover:text-yellow-100 transition-colors duration-300 group px-4 py-2"
              >
                {item.text}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white/60 transition-all duration-300 group-hover:w-full rounded-full shadow-glow" />
                {/* Glow effect on hover */}
                <span className="absolute inset-0 rounded-lg bg-white/0 group-hover:bg-white/10 transition-colors duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default TopNav;
