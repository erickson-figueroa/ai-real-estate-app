import React, { useState } from 'react';
import axios from 'axios';
import ListingsResponse from '../ListingResponse/ListingResponse';
import ListingResponseMap from '../ListingResponseMap/ListingResponseMap';
import './ChatInterface.css';

function ChatInterface() {
  const [userInput, setUserInput] = useState("");
  const [listings, setListings] = useState([]);
  const [responses, setResponses] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSend = async (input) => {
    if (input.trim()) {
      try {
        const response = await axios.post('/api/query', { query: input });
        const { listings, responses } = response.data;
        setListings(listings);
        setResponses(responses);
        setShowResults(true);
        setUserInput("");
      } catch (error) {
        console.error("Error processing query:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSend(e.target.value);
    }
  };

  return (
    <div className="ChatInterface">
      {!showResults && (
        <div className="welcome-section">
          <div className="header">
            <div className="logo">
              <img src="https://via.placeholder.com/50" alt="Logo" />
            </div>
            <div className="welcome-text">
              Find the perfect home for you and yours with the help of AI
            </div>
          </div>
          <div className="examples">
            <div className="example">
              <img src="https://via.placeholder.com/40" alt="Example 1" />
              <p>I am looking for a house with 3 bedrooms, 2 bathrooms, and a yard in a safe neighborhood.</p>
            </div>
            <div className="example">
              <img src="https://via.placeholder.com/40" alt="Example 2" />
              <p>Show me apartments with 2 bedrooms and a gym nearby public transport.</p>
            </div>
            <div className="example">
              <img src="https://via.placeholder.com/40" alt="Example 3" />
              <p>I need a condo with 1 bedroom, a swimming pool, and covered parking.</p>
            </div>
          </div>
        </div>
      )}
      {showResults && (
        <>
          <ListingsResponse listings={listings} responses={responses} />
          <ListingResponseMap listings={listings} />
        </>
      )}
      <div className="input-container">
        <input
          type="text"
          placeholder="Describe your desired home here..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={() => handleSend(userInput)}>Send</button>
      </div>
    </div>
  );
}

export default ChatInterface;
