import React from 'react';
import { motion } from 'framer-motion';

import Sir from '../img/Vasudeva_Sir-removebg-preview.png'
import Aditya from '../img/Shekar_img.jpg'
import Darshan from '../img/Darshan.jpg'
import Gurudatt from '../img/Gurudatt-removebg-preview.png'
import Hardhik from '../img/Hardhik1-removebg-preview.png'
const Contact = () => {

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500">
      <div className="container mx-auto px-4 py-16">
        {/* Project Guide Section */}
        <motion.div 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h1 className="text-4xl font-bold text-white mb-12">Project Guide</h1>
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="inline-block"
          >
            <div className="w-64 h-64 mx-auto mb-4 overflow-hidden shadow-xl">
              <img
                src={Sir}
                alt={"Mr.Vasudeva Pai"}
                className="w-full h-full object-contain"
              />
            </div>
            <h2 className="text-2xl font-semibold text-white">{"Mr.Vasudeva Pai"}</h2>
            <p className="text-white opacity-90">{"Assistant Professor Gd-III"}</p>
          </motion.div>
        </motion.div>

        {/* Team Members Section */}
        <div>
          <h2 className="text-3xl font-bold text-white text-center mb-12">Team Members</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <motion.div
                key={"Aditya"}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay:  0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:shadow-2xl transition-shadow"
              >
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden shadow-lg">
                  <img
                    src={Aditya}
                    alt="Aditya"
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{"Aditya C Shekar"}</h3>
                <p className="text-white opacity-90">{"4NM21IS007"}</p>
              </motion.div>


              <motion.div
                key={"Darshan"}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay:  0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:shadow-2xl transition-shadow"
              >
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden shadow-lg">
                  <img
                    src={Darshan}
                    alt={"Darshan"}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{"Darshan Harish Salian"}</h3>
                <p className="text-white opacity-90">{"4NM21IS040"}</p>
              </motion.div>

              <motion.div
                key={"Gurudatt"}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:shadow-2xl transition-shadow"
              >
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden shadow-lg">
                  <img
                    src={Gurudatt}
                    alt={"Gurudatt"}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{"Gurudatt Ashok Mallya"}</h3>
                <p className="text-white opacity-90">{"4NM21IS048"}</p>
              </motion.div>


              <motion.div
                key={"Hardhik"}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay:  0.2 }}
                whileHover={{ 
                  scale: 1.05,
                  transition: { duration: 0.2 }
                }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center hover:shadow-2xl transition-shadow"
              >
                <div className="w-40 h-40 mx-auto mb-4 overflow-hidden shadow-lg">
                  <img
                    src={Hardhik}
                    alt={"Hardhik"}
                    className="w-full h-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{"Hardhik Chinthan P"}</h3>
                <p className="text-white opacity-90">{"4NM21IS049"}</p>
              </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
