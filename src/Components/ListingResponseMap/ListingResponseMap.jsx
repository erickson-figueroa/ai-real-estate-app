import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-fullscreen/dist/leaflet.fullscreen.css';
import 'leaflet-fullscreen';
import locationIcon from '../../assets/location.png';

const ListingResponseMap = ({ latitude, longitude, mapId, address, neighborhood, price }) => {
  const [map, setMap] = useState(null);
  const [selectedPOI, setSelectedPOI] = useState([]);
  const [showPOIList, setShowPOIList] = useState(false);

  const poiTypes = {
    'Bus stops': 'bus_station',
    'Cafes': 'cafe',
    'Groceries': 'supermarket',
    'Stores': 'shop',
    'Day care': 'childcare',
    'Nightlife': 'nightclub',
    'Restaurants': 'restaurant',
    'Parks': 'park',
    'Schools': 'school',
    'Community Center': 'community_centre',
    'Drug Store': 'pharmacy',
    'Clinic': 'clinic',
  };

  useEffect(() => {
    const newMap = L.map(mapId, {
      fullscreenControl: true, // Add fullscreen control to the map
      fullscreenControlOptions: {
        position: 'topleft', // Position the fullscreen button
      },
    }).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(newMap);

    const customIcon = L.icon({
      iconUrl: locationIcon,
      iconSize: [50, 50], // size of the icon
      iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -50], // point from which the popup should open relative to the iconAnchor
    });

    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(newMap);
    marker.bindPopup(`
      <div>
        <strong>${address}</strong><br />
        ${neighborhood}<br />
        Price: ${price}
      </div>
    `).openPopup();

    setMap(newMap);

    return () => {
      newMap.remove();
    };
  }, [latitude, longitude, mapId, address, neighborhood, price]);

  const handlePOIChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedPOI([...selectedPOI, value]);
    } else {
      setSelectedPOI(selectedPOI.filter((poi) => poi !== value));
    }
  };

  const handleApplyPOI = () => {
    if (map && selectedPOI.length > 0) {
      selectedPOI.forEach((poi) => {
        const query = `[out:json];
          node(around:1000, ${latitude}, ${longitude})["amenity"="${poiTypes[poi]}"];
          out body;`;
        const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query)}`;

        fetch(overpassUrl)
          .then((response) => response.json())
          .then((data) => {
            data.elements.forEach((element) => {
              const poiMarker = L.marker([element.lat, element.lon]).addTo(map);
              poiMarker.bindPopup(`<div><strong>${poi}</strong><br/>${element.tags.name || ''}</div>`);
            });
          })
          .catch((err) => console.error('Error fetching POI:', err));
      });
    }
  };

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <div id={mapId} style={{ height: '100%', width: '100%' }} />

      <button
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          zIndex: 1000,
          padding: '10px',
          backgroundColor: '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
        }}
        onClick={() => setShowPOIList(!showPOIList)}
      >
        Point of Interest
      </button>

      {showPOIList && (
        <div
          style={{
            position: 'absolute',
            top: '50px',
            right: '10px',
            zIndex: 1000,
            padding: '10px',
            backgroundColor: '#fff',
            border: '1px solid #ccc',
            borderRadius: '5px',
          }}
        >
          <h4>Select POIs</h4>
          {Object.keys(poiTypes).map((poi) => (
            <div key={poi}>
              <input
                type="checkbox"
                id={poi}
                value={poi}
                onChange={handlePOIChange}
              />
              <label htmlFor={poi} style={{ marginLeft: '5px' }}>
                {poi}
              </label>
            </div>
          ))}
          <button
            style={{
              marginTop: '10px',
              padding: '10px',
              backgroundColor: '#28a745',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
            onClick={handleApplyPOI}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default ListingResponseMap;
