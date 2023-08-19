import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useSelector } from "react-redux";

const Map = () => {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  const [lng, lat] = [2.3964, 47.0815];

  const mapContainerRef = useRef(null);
  const [mapInstance, setMapInstance] = useState(null);

  const stateCoordiante = useSelector((state) => state.clientAdresse);

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 3,
    });

    map.on("load", () => {
      setMapInstance(map);
    });

    map.dragPan.disable();
    map.scrollZoom.disable();

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (mapInstance && stateCoordiante) {
      const [newLng, newLat] = stateCoordiante;
      mapInstance.flyTo({
        center: [newLng, newLat],
        zoom: 18, // Ajustez le niveau de zoom souhaité lors du recentrage
      });
    }
  }, [stateCoordiante, mapInstance]);

  return (
    <div
      ref={mapContainerRef}
      style={{
        width: "100%",
        height: "223px",
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <style jsx>{`
        .mapboxgl-ctrl-attrib {
          font-size: 10px !important;
        }
      `}</style>
    </div>
  );
};

export default Map;
