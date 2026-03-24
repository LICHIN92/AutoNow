import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const position = [11.692147326430353, 75.74824380426563]; // Kerala

function Map() {
  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={position}>
        <Popup>Your Location 🚕</Popup>
      </Marker>

    </MapContainer>
  );
}

export default Map;