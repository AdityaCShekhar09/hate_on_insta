import React, { useState } from 'react';
import { motion } from 'framer-motion';
 import { HiArrowUpTray, HiSpeakerWave } from 'react-icons/hi2'; ;

const Features = () => {
  const [audioFile, setAudioFile] = useState(null);
  const [transcribedText, setTranscribedText] = useState('');
  const [hate, setHate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setError('');
    } else {
      setError('Please upload an audio file');
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith('audio/')) {
      setAudioFile(file);
      setError('');
    } else {
      setError('Please upload an audio file');
    }
  };

  const handleConvertAudioToText = async () => {
    if (!audioFile) {
      setError('Please select an audio file first.');
      return;
    }

    setLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('file', audioFile);

    try {
      const response = await fetch('http://localhost:5050/transcribe', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Failed to transcribe audio');

      const data = await response.json();
      setTranscribedText(data.transcription);
      setHate(data.result);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to analyze audio. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 p-8">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto py-12"
      >
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-white mb-4">
            Audio Content Analysis
          </h1>
          <p className="text-xl text-white/90">
            Convert and analyze audio content for harmful speech
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30"
        >
          <div 
            className="border-2 border-dashed border-white/40 rounded-xl p-8
                     hover:border-white/60 transition-colors duration-300"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <div className="text-center space-y-6">
              <div className="flex justify-center">
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                > <HiSpeakerWave size={24} style={{color:"tomato"}}/>
                </motion.div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">
                  {audioFile ? audioFile.name : 'Drop your audio file here'}
                </h3>
                <p className="text-white/80">
                  or
                </p>
                <div>
                  <label className="cursor-pointer">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-white/20 
                               rounded-lg hover:bg-white/30 transition-colors duration-300"
                    >
                      <HiArrowUpTray size={24} style={{color:"tomato"}} />
                      <span className="text-white font-medium">Choose File</span>
                    </motion.div>
                    <input
                      type="file"
                      accept="audio/*"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
              
              {error && (
                <p className="text-red-400">{error}</p>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleConvertAudioToText}
            disabled={!audioFile || loading}
            className={`w-full mt-6 px-6 py-4 rounded-xl text-white font-bold text-xl
                     bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600
                     hover:from-red-600 hover:via-orange-500 hover:to-yellow-400
                     transition-all duration-500 transform
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-lg hover:shadow-xl`}
          >
            {loading ? (
              <div className="flex items-center justify-center space-x-3">
                <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <span>Analyze Audio</span>
            )}
          </motion.button>
        </motion.div>

        {/* Results Section */}
        {transcribedText && (
          <motion.div 
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Analysis Results</h2>
            <div className="space-y-6">
              <div className="bg-white/30 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-3">Transcription</h3>
                <p className="text-white/90 text-lg leading-relaxed">{transcribedText}</p>
              </div>
              {hate && (
                <div className="bg-white/30 rounded-xl p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">Analysis</h3>
                  <p className="text-white/90 text-lg">{hate}</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Features;