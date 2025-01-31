import React, { useEffect, useRef } from "react";

const GoogleMapComponent: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.google || !mapRef.current) return;

    const map = new google.maps.Map(mapRef.current, {
      center: { lat: -33.9, lng: 151.2 },
      zoom: 10,
      mapId: "DEMO_MAP_ID",
    });

    const locations = [
      { lat: -33.890542, lng: 151.274856, title: "Bondi Beach" },
      { lat: -33.923036, lng: 151.259052, title: "Coogee Beach" },
      { lat: -34.028249, lng: 151.157507, title: "Cronulla Beach" },
      { lat: -33.800101, lng: 151.287478, title: "Manly Beach" },
      { lat: -33.950198, lng: 151.259302, title: "Maroubra Beach" },
    ];

    locations.forEach(({ lat, lng, title }) => {
      const marker = new google.maps.marker.AdvancedMarkerElement({
        position: { lat, lng },
        title,
        content: (() => {
          const img = document.createElement("img");
          img.src =
            "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
          img.className = "flag-icon";
          return img;
        })(),
      });
      marker.map = map;
    });
  }, []);

  return <div ref={mapRef} style={{ height: "100vh", width: "100%" }} />;
};

export default GoogleMapComponent;
