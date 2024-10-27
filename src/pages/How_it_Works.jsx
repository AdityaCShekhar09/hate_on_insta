import React, { useState } from 'react';
import { motion } from 'framer-motion';

const How_it_Works = () => {
  const [selectedId, setSelectedId] = useState(null);
  
  const contents = [
    {
      id: 1,
      h1: "Data Collection",
      p: "A dataset containing comments and their corresponding labels (e.g., 'Hate' or 'Non-Hate') is stored in a CSV file (train.csv). This dataset is loaded using the Pandas library, which allows for easy manipulation and preparation for further processing",
      icon: "📊"
    },
    {
      id: 2,
      h1: "Data Preprocessing",
      p: "This involves normalizing the text by converting it to lowercase and applying other cleaning techniques. After that, the comments are tokenized",
      icon: "🔄"
    },
    {
      id: 3,
      h1: "Feature Extraction",
      p: "The target labels—whether a comment is hateful or not—are extracted from the dataset to train the model. The feature extraction process ensures that the model focuses on important textual features to make accurate predictions.",
      icon: "🎯"
    },
    {
      id: 4,
      h1: "Model Creation",
      p: "A Bidirectional Long Short-Term Memory (Bi-LSTM) neural network. Bi-LSTM is chosen for its ability to capture both forward and backward dependencies within the text sequence, making it effective for text analysis",
      icon: "🧠"
    },
    {
      id: 5,
      h1: "Model Training, Prediction, and Evaluation",
      p: "The Bi-LSTM model is trained using the training split. Once trained, it generates predictions in binary format for each comment in the test set. After predictions are made, key metrics like accuracy, precision, and recall are calculated",
      icon: "📈"
    },
    {
      id: 6,
      h1: "Integration",
      p: "Users provide an Instagram post URL, and the Apify API is used to fetch the comments from the post. These comments undergo the same preprocessing steps (such as normalization and tokenization) to match the input format required by the model. Additionally, if any audio data is present in the comments, it is converted to text using an audio-to-text conversion module",
      icon: "🔄"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      y: 20
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-yellow-300 via-orange-400 to-red-500 p-8 flex justify-center items-center">
      <div className="bg-white/10 w-[90%] max-w-4xl rounded-xl backdrop-blur-lg shadow-2xl border border-white/20 p-6 overflow-hidden">
        <h1 className="text-4xl font-bold text-white mb-8 text-center">
          How it Works
        </h1>
        
        <motion.div 
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {contents.map((item) => (
            <motion.div
              key={item.id}
              variants={itemVariants}
              className="group"
              whileHover={{ scale: 1.02 }}
              onClick={() => setSelectedId(selectedId === item.id ? null : item.id)}
            >
              <div className={`
                bg-white/20 backdrop-blur-md rounded-lg p-6
                transform transition-all duration-300 ease-in-out
                hover:bg-white/30 hover:shadow-xl
                border border-white/30
                cursor-pointer
                ${selectedId === item.id ? 'scale-105' : ''}
              `}>
                <div className="flex items-center gap-4">
                  <span className="text-4xl">{item.icon}</span>
                  <div className="flex-1">
                    <h2 className="text-2xl font-semibold text-white mb-2 group-hover:text-yellow-200 transition-colors">
                      {item.h1}
                    </h2>
                    <p className={`
                      text-white/90 leading-relaxed
                      transition-all duration-300
                      ${selectedId === item.id ? 'opacity-100' : 'opacity-80'}
                    `}>
                      {item.p}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default How_it_Works;