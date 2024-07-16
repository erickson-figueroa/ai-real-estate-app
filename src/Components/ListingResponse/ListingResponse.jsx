import React from 'react';
import './ListingResponse.css';

const ListingResponse = ({ listings = [], responses = [] }) => {
  return (
    <div className="listing-response">
      {listings.map((listing, index) => (
        <div key={listing.id} className="listing">
          <h2>Listing {index + 1}</h2>
          <p>{listing.address}</p>
          <p>{listing.neighborhood}</p>
          <p>Price: {listing.price}</p>
          <p>Rooms: {listing.rooms}</p>
          <p>Bathrooms: {listing.bathrooms}</p>
          <p>Type: {listing.type}</p>
          <p>Realtor: {listing.realtor}</p>
          <img src={listing.image} alt={`Listing ${index + 1}`} />
          <p>{responses[index] || "No response available"}</p> {/* Adjust this if multiple responses are expected */}
        </div>
      ))}
    </div>
  );
};

export default ListingResponse;
