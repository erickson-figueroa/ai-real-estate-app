import React from 'react';
import './ListingResponse.css';
import ListingResponseMap from '../ListingResponseMap/ListingResponseMap';

const ListingResponse = ({ listingsWithResponses = [] }) => {
  return (
    <div className="listing-response">
      {listingsWithResponses.map(({ listing, response }, index) => (
        <div key={listing.id} className="listing-container">
          <div className="listing-details">
            <div className="listing-card">
              <img src={listing.image} alt={`Listing ${index + 1}`} className="listing-image" />
              <h2>Listing {index + 1}</h2>
              <p>{listing.address}</p>
              <p>{listing.neighborhood}</p>
              <p>Price: {listing.price}</p>
              <p>Rooms: {listing.rooms}</p>
              <p>Bathrooms: {listing.bathrooms}</p>
              <p>Type: {listing.type}</p>
              <p>Realtor: {listing.realtor}</p>
              <p>{response || "No response available"}</p>
            </div>
          </div>
          <div className="listing-map">
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
      ))}
    </div>
  );
};

export default ListingResponse;
