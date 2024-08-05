import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListingResponse.css';
import ListingResponseMap from '../ListingResponseMap/ListingResponseMap';
import { formatPrice } from '../../utils/formatPrice.jsx'; // Import the utility function

// Import images
import fakeHouse1 from '../../assets/fake-house-1.jpg';
import fakeHouse2 from '../../assets/fake-house-2.jpg';
import fakeHouse3 from '../../assets/fake-house-3.jpg';

const ListingResponse = ({ listingsWithResponses = [] }) => {
  const [userInput, setUserInput] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedListing, setSelectedListing] = useState(null);
  const [additionalFieldsVisible, setAdditionalFieldsVisible] = useState(false);

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSend = () => {
    // Handle the send action here (e.g., send a query to the server)
    console.log(userInput);
    setUserInput("");
  };

  const handleCheckAvailability = (listing) => {
    setSelectedListing(listing);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedListing(null);
    setAdditionalFieldsVisible(false); // Reset the visibility state
  };

  const handleViewMoreDetails = (listing) => {
    setSelectedListing(listing);
    setDetailsModalVisible(true);
  };

  const handleCloseDetailsModal = () => {
    setDetailsModalVisible(false);
    setSelectedListing(null);
  };

  const listingImages = [fakeHouse1, fakeHouse2, fakeHouse3]; // Array of images

  return (
    <div className="container mt-5 custom-mt-5">
      <div className="row">
        {listingsWithResponses.map(({ listing, response }, index) => (
          <div key={listing.id} className="col-md-12 mb-4">
            <div className="row no-gutters">
              <div className="col-md-8">
                <div className="card card-equal-height">
                  <div className="row no-gutters">
                    <div className="col-md-4">
                      <img src={listingImages[index % listingImages.length]} alt={`Listing ${index + 1}`} className="card-img" />
                      <div className="price-category">
                        <h2><strong>MREA Index Price: </strong><span className="badge text-bg-warning">{listing.price_category}</span></h2>
                        <br /><hr />
                        <button type="button" className="btn btn-info view-more-detail-btn" onClick={() => handleViewMoreDetails(listing)}>View more details</button>
                        <button
                          type="button"
                          className="btn btn-info view-more-detail-btn"
                          onClick={() => handleCheckAvailability(listing)}
                        >
                          Check availability
                        </button>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">Listing {index + 1}</h5>
                        <p className="card-text"><strong>Address:</strong> {listing.address}</p>
                        <p className="card-text"><strong>Neighborhood:</strong> {listing.neighborhood}</p>
                        <p className="card-text"><strong>Price:</strong> {formatPrice(listing.price)}</p>
                        <p className="card-text"><strong>Rooms:</strong> {listing.rooms}</p>
                        <p className="card-text"><strong>Bathrooms:</strong> {listing.bathrooms}</p>
                        <p className="card-text"><strong>Type:</strong> {listing.type}</p>
                        <p className="card-text"><strong>Realtor:</strong> {listing.realtor}</p>
                        <p className="card-text shadow p-3 mb-5 bg-body-secondary rounded">{response || "No response available"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card card-equal-height mx-1">
                  <div className="card-body">
                    <ListingResponseMap
                      latitude={listing.latitude}
                      longitude={listing.longitude}
                      mapId={`map-${listing.id}`}
                      address={listing.address}
                      neighborhood={listing.neighborhood}
                      price={formatPrice(listing.price)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Check Availability Modal */}
      {modalVisible && selectedListing && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Check Availability: MLS® Number <span className='text-warning'>{selectedListing.id}</span></h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <input 
                      type="text" 
                      className="form-control" 
                      id="recipient-name" 
                      placeholder='Full name*' 
                      onFocus={() => setAdditionalFieldsVisible(true)}
                    />
                  </div>
                  {additionalFieldsVisible && (
                    <>
                      <div className="mb-3">
                        <input 
                          type="email" 
                          className="form-control" 
                          id="email" 
                          placeholder='Email*' 
                        />
                      </div>
                      <div className="mb-3">
                        <input 
                          type="tel" 
                          className="form-control" 
                          id="phone" 
                          placeholder='Phone Number*' 
                        />
                      </div>
                    </>
                  )}
                  <div className="mb-3">
                    <textarea 
                      className="form-control" 
                      id="message-text" 
                      placeholder='Custom Message: I saw a home and would like to know more about it.'
                    ></textarea>
                  </div>
                </form>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button type="button" className="btn btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z" />
                  </svg> Send message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View More Details Modal */}
      {detailsModalVisible && selectedListing && (
        <div className="modal fade show" style={{ display: 'block' }} tabIndex="-1">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Listing Details: MLS® Number <span className='text-warning'>{selectedListing.id}</span></h5>
                <button type="button" className="btn-close" aria-label="Close" onClick={handleCloseDetailsModal}></button>
              </div>
              <div className="modal-body">
                <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button className="nav-link active" id="pills-listing-tab" data-bs-toggle="pill" data-bs-target="#pills-listing" type="button" role="tab" aria-controls="pills-listing" aria-selected="true">Listing Details</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-census-tab" data-bs-toggle="pill" data-bs-target="#pills-census" type="button" role="tab" aria-controls="pills-census" aria-selected="false">Census Data</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-walkscore-tab" data-bs-toggle="pill" data-bs-target="#pills-walkscore" type="button" role="tab" aria-controls="pills-walkscore" aria-selected="false">Walkscore</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-airquality-tab" data-bs-toggle="pill" data-bs-target="#pills-airquality" type="button" role="tab" aria-controls="pills-airquality" aria-selected="false">Air Quality</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-crime-tab" data-bs-toggle="pill" data-bs-target="#pills-crime" type="button" role="tab" aria-controls="pills-crime" aria-selected="false">Crime Index</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-assessment-tab" data-bs-toggle="pill" data-bs-target="#pills-assessment" type="button" role="tab" aria-controls="pills-assessment" aria-selected="false">Property Assessment</button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button className="nav-link" id="pills-insect-tab" data-bs-toggle="pill" data-bs-target="#pills-insect" type="button" role="tab" aria-controls="pills-insect" aria-selected="false">Insect Data</button>
                  </li>
                </ul>
                <div className="tab-content" id="pills-tabContent">
                  <div className="tab-pane fade show active" id="pills-listing" role="tabpanel" aria-labelledby="pills-listing-tab">
                    <div className="row">
                      <div className="col-md-4">
                        <h5 className="card-title">Listing Details</h5>
                        <p className="card-text"><strong>Address:</strong> {selectedListing.address}</p>
                        <p className="card-text"><strong>Neighborhood:</strong> {selectedListing.neighborhood}</p>
                        <p className="card-text"><strong>Price:</strong> {formatPrice(selectedListing.price)}</p>
                        <p className="card-text"><strong>Rooms:</strong> {selectedListing.rooms}</p>
                        <p className="card-text"><strong>Bathrooms:</strong> {selectedListing.bathrooms}</p>
                        <p className="card-text"><strong>Type:</strong> {selectedListing.type}</p>
                        <p className="card-text"><strong>Realtor:</strong> {selectedListing.realtor}</p>
                      </div>
                      <div className="col-md-4">
                      <p className="card-text"><strong>Additional info 1:</strong> {}</p>
                      <p className="card-text"><strong>Additional info 2:</strong> {}</p>
                      <p className="card-text"><strong>Additional info 3:</strong> {}</p>
                      <p className="card-text"><strong>Additional info 4:</strong> {}</p>
                      <p className="card-text"><strong>Additional info 5:</strong> {}</p>
                      <p className="card-text"><strong>Additional info 6:</strong> {}</p>
                      <p className="card-text"><strong>Additional info 7:</strong> {}</p>
                      <p className="card-text"><strong>Additional info 8:</strong> {}</p>
                      </div>
                      <div className="col-md-4">
                        <ListingResponseMap
                          latitude={selectedListing.latitude}
                          longitude={selectedListing.longitude}
                          mapId={`map-modal-${selectedListing.id}`}
                          address={selectedListing.address}
                          neighborhood={selectedListing.neighborhood}
                          price={formatPrice(selectedListing.price)}
                        /> 
                        button with point of interest here!
                      </div>
                    </div>
                    <div className="row">
                    <div className="col-md-4">
                    <p className="card-text"><strong>[Icon ] Features </strong> {}</p>
                    <p className="card-text">Air Conditioning-Central{}</p>
                    <p className="card-text">Bar wet{}</p>
                    <p className="card-text">Closet Organizers{}</p>
                    <p className="card-text">Cook Top{}</p>
                    <p className="card-text">Deck{}</p>
                    <p className="card-text">High-Efficiency Furnace{}</p>
                    <p className="card-text">Hot Tub{}</p>
                    <p className="card-text">Laundry - Second Floor{}</p>
                    <p className="card-text">Laundry - Main Floor{}</p>
                    <p className="card-text">Patio{}</p>
                    <p className="card-text">Pool-Indoor{}</p>
                    </div>
                    <div className="col-md-4">
                    <p className="card-text"><strong>[Icon ] Blinds </strong> {}</p>
                    <p className="card-text"><strong>[Icon ] Bar Fridge </strong> {}</p>
                    <p className="card-text">Dryers - Two{}</p>
                    <p className="card-text">Dishwasher{}</p>
                    <p className="card-text">Garage door opener{}</p>
                    <p className="card-text">Garage door opener remote(s){}</p>
                    <p className="card-text">Microwave{}</p>
                    <p className="card-text">Stove{}</p>
                    <p className="card-text">Window Coverings{}</p>
                    <p className="card-text">Washers - Two{}</p>
                    </div>
                    </div>
                  </div>
                  <div className="tab-pane fade" id="pills-census" role="tabpanel" aria-labelledby="pills-census-tab">
                    Census Data content goes here.
                  </div>
                  <div className="tab-pane fade" id="pills-walkscore" role="tabpanel" aria-labelledby="pills-walkscore-tab">
                    Walkscore content goes here.
                  </div>
                  <div className="tab-pane fade" id="pills-airquality" role="tabpanel" aria-labelledby="pills-airquality-tab">
                    Air Quality content goes here.
                  </div>
                  <div className="tab-pane fade" id="pills-crime" role="tabpanel" aria-labelledby="pills-crime-tab">
                    Crime Index content goes here.
                  </div>
                  <div className="tab-pane fade" id="pills-assessment" role="tabpanel" aria-labelledby="pills-assessment-tab">
                    Property Assessment content goes here.
                  </div>
                  <div className="tab-pane fade" id="pills-insect" role="tabpanel" aria-labelledby="pills-insect-tab">
                    Insect Data content goes here.
                  </div>
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-center">
                <button type="button" className="btn btn-primary" onClick={handleCloseDetailsModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListingResponse;
