import React from 'react';
import './ListingResponseMap.css';

const ListingResponseMap = ({ listings }) => {
  return (
    <div className="listing-map">
      {listings.map((listing) => (
        <div key={listing.id} className="map-container">
          <h3>{listing.address}</h3>
          <div>
            <iframe
              width="600"
              height="450"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?key=YOUR_GOOGLE_MAPS_API_KEY&q=${listing.latitude},${listing.longitude}`}
            ></iframe>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingResponseMap;
