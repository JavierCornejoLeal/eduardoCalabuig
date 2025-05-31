// src/components/Mapa.jsx
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const estilosMapa = [
  {
    featureType: "poi",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
  {
    featureType: "transit",
    elementType: "all",
    stylers: [{ visibility: "off" }],
  },
];

function Mapa() {
  const mapaRef = useRef(null);

  useEffect(() => {
    if (!mapaRef.current) return;

    // 1) Configuramos el Loader incluyendo la librería 'marker'
    const loader = new Loader({
      apiKey: "AIzaSyCPN_ICzYJyIsW_7ZNX7P2Z1TcsodRSD0s",
      version: "weekly",
      libraries: ["marker"], // <-- Muy importante para que exista google.maps.marker.AdvancedMarkerElement
    });

    // 2) Cargamos la librería
    loader
      .load()
      .then((google) => {
        // 3) Una vez cargado todo, inicializamos el mapa
        const centerPos = {
          lat: 38.841977501166625,
          lng: 0.11241428137456375,
        };

        const mapInstance = new google.maps.Map(mapaRef.current, {
          center: centerPos,
          zoom: 16,
          mapTypeControl: false,
          mapId: "e8e516b8dca92c4bd4c811fc",
        });

        // 4) Ahora sí existe google.maps.marker.AdvancedMarkerElement
        new google.maps.marker.AdvancedMarkerElement({
          position: centerPos,
          map: mapInstance,
          title: "Mi ubicación",
        });
      })
      .catch((e) => {
        console.error("Error al cargar Google Maps:", e);
      });
  }, []);

  return <div ref={mapaRef} style={{ width: "100%", height: "450px" }} />;
}

export default Mapa;
