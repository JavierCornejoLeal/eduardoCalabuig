import React, { useEffect, useRef } from "react";

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
    if (!window.google) {
      const script = document.createElement("script");
      script.src =
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyCPN_ICzYJyIsW_7ZNX7P2Z1TcsodRSD0s&callback=initMap`;
      script.async = true;
      script.defer = true;
      window.document.body.appendChild(script);
      window.initMap = initMap;
    } else {
      initMap();
    }

    function initMap() {
      const centerPos = { lat: 38.841977501166625, lng: 0.11241428137456375 };

      const map = new window.google.maps.Map(mapaRef.current, {
        center: centerPos,
        zoom: 16,
        styles: estilosMapa,
        mapTypeControl: false, // Oculta el control Mapa/Satélite
      });

      new window.google.maps.Marker({
        position: centerPos,
        map: map,
        title: "Mi ubicación",
      });
    }
  }, []);

  return <div ref={mapaRef} style={{ width: "100%", height: "450px" }} />;
}

export default Mapa;
