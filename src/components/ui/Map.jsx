import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const Map = ({ latitude, longitude }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([latitude, longitude], 13);
    }
  }, [latitude, longitude]);

  return (
    <MapContainer
      center={[latitude, longitude]}
      zoom={13}
      style={{ height: "100%", width: "100%" }}
      whenCreated={(mapInstance) => {
        mapRef.current = mapInstance;
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[latitude, longitude]}>
        <Popup>
          A location: [{latitude}, {longitude}]
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
