import React, { useState } from 'react';
import './App.css';
import Loading from './Loading/Loading';

const App = () => {
  const [postUrl, setPostUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [view, setView] = useState('input'); // New state to toggle between views
  const [audioFile, setAudioFile] = useState(null); // New state to store the selected audio file

  const fetchComments = async () => {
    if (!postUrl) {
      alert("Please Paste the Link");
      return;
    }

    setLoading(true);
    const apiUrl = process.env.REACT_APP_URL;
    const token = process.env.REACT_APP_API;
    const input = {
      directUrls: [postUrl],
      resultsType: 'comments'
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(input)
      });

      const data = await response.json();

      // Send comments to Flask backend to detect hate speech
      const hateSpeechResponse = await fetch('http://localhost:5050/detect', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ comments: data })
      });

      const hateComments = await hateSpeechResponse.json();
      setComments(hateComments);
      setView('comments'); // Switch to comments view
      
    } catch (error) {
      console.error('Error fetching comments:', error);
      alert("Unable to fetch");
    } finally {
      setLoading(false);
    }
  };

  const handleAudioFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setAudioFile(file); // Set the selected audio file
      console.log("Selected audio file:", file.name);
    }
  };

  return (
    <div className="App">
      {loading ? (
        <Loading />
      ) : (
        <div className="container">
          {view === 'input' ? (
            <>
              <h1>Instagram Hate Comment Fetcher</h1>
              <input
                type="text"
                value={postUrl}
                onChange={(e) => setPostUrl(e.target.value)}
                placeholder="Enter Instagram Post URL"
              />
              <button onClick={fetchComments} disabled={loading}>
                Fetch Comments
              </button>

              {/* New button to select audio file */}
              <button onClick={() => document.getElementById('audioFileInput').click()}>
                Select Audio File
              </button>

              {/* Hidden file input */}
              <input 
                type="file" 
                id="audioFileInput" 
                accept=".mp3" 
                style={{ display: 'none' }} 
                onChange={handleAudioFileChange} 
              />

              {/* Show the selected file's name */}
              {audioFile && <p>Selected file: {audioFile.name}</p>}
            </>
          ) : (
            <>
              <div id="comments" className='comments'>
                {comments.length > 0 ? (
                  comments.map((comment, index) => (
                    <div key={index}>
                      <p>
                        <a 
                          href={`https://www.instagram.com/${comment.username}/`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                        >
                          {comment.username}
                        </a>: {comment.text}
                      </p>
                    </div>
                  ))
                ) : (
                  <p>No hate comments found</p>
                )}
              </div>
              <button onClick={() => setView('input')}>
                Back to Input
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
