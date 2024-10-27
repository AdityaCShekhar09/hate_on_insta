import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InstagramDetect = () => {
  const [postUrl, setPostUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    if (!postUrl) {
      setError("Please paste an Instagram post link");
      return;
    }

    setLoading(true);
    setError('');

    const apiUrl = "https://api.apify.com/v2/acts/apify~instagram-scraper/run-sync-get-dataset-items";
    const token = "apify_api_wNelAvOWeeYEwnecpknyDE6oyUAWYv0tQKby";
    const input = {
      directUrls: [postUrl],
      resultsType: 'comments',
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(input),
      });

      if (!response.ok) throw new Error('Failed to fetch comments');
      
      const data = await response.json();

      const hateSpeechResponse = await fetch('http://localhost:5050/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ comments: data }),
      });

      if (!hateSpeechResponse.ok) throw new Error('Failed to analyze comments');

      const hateComments = await hateSpeechResponse.json();
      setComments(hateComments);
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to analyze comments. Please try again.');
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
            Instagram Content Analysis
          </h1>
          <p className="text-xl text-white/90">
            Analyze Instagram post comments for harmful content
          </p>
        </motion.div>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30"
        >
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="block text-white text-xl font-semibold mb-4">
                Instagram Post Link
              </label>
              <div className="relative">
                <input 
                  className="w-full px-6 py-4 rounded-xl bg-white/50 border border-white/40 
                           placeholder-gray-500 text-gray-800 focus:outline-none 
                           focus:ring-2 focus:ring-yellow-400 transition-all duration-300
                           text-lg"
                  type="text" 
                  placeholder="https://www.instagram.com/..."
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                />
                {error && (
                  <p className="text-red-500 mt-2">{error}</p>
                )}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={fetchComments}
                disabled={loading}
                className={`w-full px-6 py-4 rounded-xl text-white font-bold text-xl
                         bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600
                         hover:from-red-600 hover:via-orange-500 hover:to-yellow-400
                         transition-all duration-500 transform
                         disabled:opacity-50 disabled:cursor-not-allowed
                         shadow-lg hover:shadow-xl`}
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-3">
                    <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Analyzing...</span>
                  </div>
                ) : (
                  <span>Analyze Content</span>
                )}
              </motion.button>
            </div>
          </div>
        </motion.div>
        {console.log(comments.length)}
        {/* Results Section */}
{comments.length > 0 && (
  <motion.div 
    initial={{ y: 40, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="mt-8 bg-white/20 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/30"
  >
    <h2 className="text-2xl font-bold text-white mb-6">Analysis Results</h2>
    <div className="space-y-4">
      {comments.map((comment, index) => (
        <motion.div 
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white/30 rounded-xl p-6 shadow-lg hover:shadow-xl
                   transition-all duration-300 hover:bg-white/40"
        >
          <p className="text-white text-lg">
            <strong>
              <a 
                href={`https://www.instagram.com/${comment.username}/`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {comment.username}
              </a>:
            </strong> {comment.text}
          </p>
        </motion.div>
      ))}
    </div>
  </motion.div>
)}

      </motion.div>
    </div>
  );
};

export default InstagramDetect;