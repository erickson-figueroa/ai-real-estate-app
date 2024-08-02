import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListingResponse.css';
import ListingResponseMap from '../ListingResponseMap/ListingResponseMap';

const ListingResponse = ({ listingsWithResponses = [] }) => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = () => {
    // Handle the send action here (e.g., send a query to the server)
    console.log(userInput);
    setUserInput("");
  };

  return (
    <div className="container mt-4">
      <div className="row">
        {listingsWithResponses.map(({ listing, response }, index) => (
          <div key={listing.id} className="col-md-12 mb-4">
            <div className="row no-gutters">
              <div className="col-md-8">
                <div className="card">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={listing.image} alt={`Listing ${index + 1}`} className="card-img" />
                      <div className="price-category">
                        <strong>MREA Index Price:</strong> {listing.price_category}
                        <br></br>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Listing {index + 1}</h5>
                        <p className="card-text"><strong>Address:</strong> {listing.address}</p>
                        <p className="card-text"><strong>Neighborhood:</strong> {listing.neighborhood}</p>
                        <p className="card-text"><strong>Price:</strong> {listing.price}</p>
                        <p className="card-text"><strong>Rooms:</strong> {listing.rooms}</p>
                        <p className="card-text"><strong>Bathrooms:</strong> {listing.bathrooms}</p>
                        <p className="card-text"><strong>Type:</strong> {listing.type}</p>
                        <p className="card-text"><strong>Realtor:</strong> {listing.realtor}</p>
                        <p className="card-text">{response || "No response available"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-custom-margin">
                  <div className="card-body">
                    <ListingResponseMap
                      latitude={listing.latitude}
                      longitude={listing.longitude}
                      mapId={`map-${listing.id}`}
                      address={listing.address}
                      neighborhood={listing.neighborhood}
                      price={listing.price}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Describe your desired home here..."
          value={userInput}
          onChange={handleInputChange}
          className="input-box"
        />
        <button onClick={handleSend} className="send-button">Send</button>
      </div>
    </div>
  );
};

export default ListingResponse;
