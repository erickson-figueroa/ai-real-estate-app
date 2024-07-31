import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const ListingResponseMap = ({ latitude, longitude, mapId, address, neighborhood, price }) => {
  useEffect(() => {
    const map = L.map(mapId).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const marker = L.marker([latitude, longitude]).addTo(map);

    marker.bindPopup(`
      <div>
        <strong>${address}</strong><br />
        ${neighborhood}<br />
        Price: ${price}
      </div>
    `);

    return () => {
      map.remove();
    };
  }, [latitude, longitude, mapId, address, neighborhood, price]);

  return <div id={mapId} style={{ height: '400px', width: '100%' }} />;
};

export default ListingResponseMap;
