import React from 'react';
import heroImage from '../img/Hate_Hero.png';
import { Button } from 'flowbite-react';
import { motion } from 'framer-motion';

import { ArrowRight, Shield, AlertTriangle, MessageCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const features = [
    { icon: Shield, text: "Advanced Detection" },
    { icon: AlertTriangle, text: "Real-time Monitoring" },
    { icon: MessageCircle, text: "Audio Detection" }
  ];

  const handleStartDetecting = () => {
    navigate('/detect'); // Navigate to Detect component
  };
  return (
    <div className='min-h-screen overflow-hidden bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 flex justify-center items-center p-6'>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative w-full max-w-7xl mx-auto"
      >
        {/* Decorative Elements */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl rounded-3xl transform rotate-2"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/10 via-orange-400/10 to-red-500/10 rounded-3xl transform -rotate-2"></div>

        {/* Main Content Container */}
        <div className="relative bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Top Section */}
          <div className='grid lg:grid-cols-2 gap-12 p-8 lg:p-12'>
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className='flex flex-col justify-center space-y-8'
            >
              <div className="space-y-4">
                <motion.h1 
                  className='text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <span className='bg-gradient-to-r from-white to-yellow-100 bg-clip-text text-transparent'>
                    Tackling Online Toxicity
                  </span>
                  <br />
                  <span className='text-white/90'>
                    Hate Speech Detection Using Bi-LSTM
                  </span>
                </motion.h1>

                <motion.p 
                  className='text-xl text-white/80 leading-relaxed'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  A real-time solution to detect and moderate hate speech on Instagram through deep learning and speech-to-text technology.
                </motion.p>
              </div>

              {/* Features Grid */}
              <motion.div 
                className="grid grid-cols-3 gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    className="flex flex-col items-center p-4 bg-white/5 rounded-xl backdrop-blur-sm border border-white/10"
                  >
                    <feature.icon className="w-6 h-6 text-white mb-2" />
                    <span className="text-sm text-white/90">{feature.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              {/* CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
              >
                <Button 
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 p-1 shadow-xl"
                >
                  <div className="relative px-8 py-4 flex items-center gap-3 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 rounded-xl transition-all duration-300 group-hover:bg-transparent" onClick={handleStartDetecting}>
                    <span className='font-bold text-2xl text-white'>Start Detecting</span>
                    <ArrowRight className="w-6 h-6 text-white transition-transform duration-300 group-hover:translate-x-2" />
                  </div>
                </Button>
              </motion.div>
            </motion.div>

            {/* Right Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="relative flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-300/30 via-orange-400/30 to-red-500/30 rounded-3xl blur-3xl"></div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img 
                  className='w-full h-full object-contain rounded-2xl shadow-2xl'
                  src={heroImage} 
                  alt="Hate Speech Detection Hero" 
                />
                <div className="absolute inset-0 rounded-2xl border border-white/10"></div>
              </motion.div>
            </motion.div>
          </div>

          {/* Bottom Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3 }}
            className='bg-black/5 border-t border-white/10 p-8 text-center'
          >
            <p className='text-white/90 text-lg leading-relaxed max-w-3xl mx-auto'>
              Our system detects harmful content on Instagram through advanced deep learning models, 
              classifying comments as hate speech or non-hate speech. The speech-to-text feature 
              expands detection capabilities to audio content.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
