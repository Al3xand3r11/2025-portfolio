"use client";

import { useState, useCallback } from "react";
import { MapContainer, TileLayer, CircleMarker } from "react-leaflet";
import type { Map } from "leaflet";
import "leaflet/dist/leaflet.css";

interface LocationMapProps {
  lat: number;
  lng: number;
}

export default function LocationMap({ lat, lng }: LocationMapProps) {
  const [ready, setReady] = useState(false);

  const whenReady = useCallback(() => {
    setReady(true);
  }, []);

  return (
    <MapContainer
      center={[lat, lng]}
      zoom={15}
      scrollWheelZoom={false}
      zoomControl={false}
      dragging={false}
      doubleClickZoom={false}
      touchZoom={false}
      keyboard={false}
      attributionControl={false}
      className="w-full h-full"
      whenReady={whenReady}
    >
      {ready && (
        <>
          <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
          <CircleMarker
            center={[lat, lng]}
            radius={5}
            pathOptions={{
              fillColor: "#ffffff",
              fillOpacity: 0.9,
              color: "#ffffff",
              weight: 2,
              opacity: 0.4,
            }}
          />
        </>
      )}
    </MapContainer>
  );
}
