import React, { useState } from 'react';
import axios from 'axios';
import ListingResponse from '../ListingResponse/ListingResponse';
import './ChatInterface.css';

// Importing images
import home1 from '../../assets/home-1.jpg';
import home2 from '../../assets/home-2.jpg';
import home3 from '../../assets/home-3.jpg';
import home4 from '../../assets/home-4.jpg';
import home5 from '../../assets/home-5.jpg';
import home6 from '../../assets/home-6.jpg';
import home7 from '../../assets/home-7.jpg';
import home8 from '../../assets/home-8.jpg';
import home9 from '../../assets/home-9.jpg';
import home10 from '../../assets/home-10.jpg';

function ChatInterface() {
  const [userInput, setUserInput] = useState("");
  const [listingsWithResponses, setListingsWithResponses] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSend = async (input) => {
    if (input.trim()) {
      try {
        const response = await axios.post('/api/query', { query: input });
        setListingsWithResponses(response.data);
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
      <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top p-3">
        <div className="container-fluid">
          <a className="navbar-brand fw-semibold" href="#"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-buildings" viewBox="0 0 16 16">
  <path d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022M6 8.694 1 10.36V15h5zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5z"/>
  <path d="M2 11h1v1H2zm2 0h1v1H4zm-2 2h1v1H2zm2 0h1v1H4zm4-4h1v1H8zm2 0h1v1h-1zm-2 2h1v1H8zm2 0h1v1h-1zm2-2h1v1h-1zm0 2h1v1h-1zM8 7h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zM8 5h1v1H8zm2 0h1v1h-1zm2 0h1v1h-1zm0-2h1v1h-1z"/>
</svg> AI Real Estate Finder</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">Post your listing</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Help</a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <span className="badge custom-text-bg-primary mx-3 px-3 p-2"> Your Account </span>
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">Sign Up</a></li>
                  <li><a className="dropdown-item" href="#">Log In</a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {!showResults && (
        <>
          <div className="header mt-5 pt-5">
            <div className="fs-1 text d-flex justify-content-center fw-semibold mt-1">
              Find the perfect home with the help of AI
            </div>
            <div className="fs-4 text d-flex justify-content-center mt-4">
              Express what you need. We do the rest.
            </div>
          </div>
          <div className="input-group mb-3 input-container mt-3">
            <input
              type="text"
              placeholder="Describe your desired home here..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="form-control"
            />
            <button onClick={() => handleSend(userInput)} className="btn btn-outline-secondary">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
              </svg> Search
            </button>
          </div>
          <div id="carouselExampleCaptions" className="carousel slide mt-1" data-bs-ride="carousel">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="3" aria-label="Slide 4"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="4" aria-label="Slide 5"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="5" aria-label="Slide 6"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="6" aria-label="Slide 7"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="7" aria-label="Slide 8"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="8" aria-label="Slide 9"></button>
              <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="9" aria-label="Slide 10"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={home1} className="d-block w-100" alt="Home 1" />
                <div className="carousel-caption d-none d-md-block">
                  <p className='custom-bg-dark p-2 rounded-top-1 rounded-bottom-1'>I am looking for a house with 3 bedrooms, 2 bathrooms, and a yard in a safe neighborhood.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={home2} className="d-block w-100" alt="Home 2" />
                <div className="carousel-caption d-none d-md-block">
                  <p className='custom-bg-dark p-2 rounded-top-1 rounded-bottom-1'>I need a condo with 2 bedrooms, gym, pool, and nearby public transport.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={home3} className="d-block w-100" alt="Home 3" />
                <div className="carousel-caption d-none d-md-block">
                  <p className='custom-bg-dark p-2 rounded-top-1 rounded-bottom-1'>I need a spacious house with 4 bedroom, 2 bathrooms, beautiful yard, and covered parking.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={home4} className="d-block w-100" alt="Home 4" />
                <div className="carousel-caption d-none d-md-block">
                  <p className='custom-bg-dark p-2 rounded-top-1 rounded-bottom-1'>Find me a townhouse with 4 bedrooms, a garage, and a small garden.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={home5} className="d-block w-100" alt="Home 5" />
                <div className="carousel-caption d-none d-md-block">
                  <p className='custom-bg-dark p-2 rounded-top-1 rounded-bottom-1'>Looking for a house with pool, yard, minimum 3 bedrooms, and close to downtown.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={home6} className="d-block w-100" alt="Home 6" />
                <div className="carousel-caption d-none d-md-block">
                  <p className='custom-bg-dark p-2 rounded-top-1 rounded-bottom-1'>I want an apartment with a basement, 2-car garage, and an open floor plan.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={home7} className="d-block w-100" alt="Home 7" />
                <div className="carousel-caption d-none d-md-block">
                  <p className='custom-bg-dark p-2 rounded-top-1 rounded-bottom-1'>Looking for an apartment with 3 bedrooms and a balcony with city view.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={home8} className="d-block w-100" alt="Home 8" />
                <div className="carousel-caption d-none d-md-block">
                  <p className='custom-bg-dark p-2 rounded-top-1 rounded-bottom-1'>I need a penthouse with 2 bedrooms, a rooftop terrace, and a gym.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={home9} className="d-block w-100" alt="Home 9" />
                <div className="carousel-caption d-none d-md-block">
                  <p className='custom-bg-dark p-2 rounded-top-1 rounded-bottom-1'>I am looking for a modern apartment with 1 bedroom and a home office.</p>
                </div>
              </div>
              <div className="carousel-item">
                <img src={home10} className="d-block w-100" alt="Home 10" />
                <div className="carousel-caption d-none d-md-block">
                  <p className='custom-bg-dark p-2 rounded-top-1 rounded-bottom-1'>Find me a cozy cottage with 2 bedrooms, a fireplace, and a garden.</p>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </>
      )}
      {showResults && (
        <ListingResponse listingsWithResponses={listingsWithResponses} />
      )}
    </div>
  );
}

export default ChatInterface;
