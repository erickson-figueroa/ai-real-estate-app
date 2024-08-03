import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import locationIcon from '../../assets/location.png';

const ListingResponseMap = ({ latitude, longitude, mapId, address, neighborhood, price }) => {
  useEffect(() => {
    const map = L.map(mapId).setView([latitude, longitude], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    const customIcon = L.icon({
      iconUrl: locationIcon,
      iconSize: [50, 50], // size of the icon
      iconAnchor: [25, 50], // point of the icon which will correspond to marker's location
      popupAnchor: [0, -50] // point from which the popup should open relative to the iconAnchor
    });

    const marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(map);
    marker.bindPopup(`
      <div>
        <strong>${address}</strong><br />
        ${neighborhood}<br />
        Price: ${price}
      </div>
    `).openPopup();

    return () => {
      map.remove();
    };
  }, [latitude, longitude, mapId, address, neighborhood, price]);

  return <div id={mapId} style={{ height: '100%', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }} />;
};

export default ListingResponseMap;
