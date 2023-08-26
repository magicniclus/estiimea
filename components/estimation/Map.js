import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import { useDispatch, useSelector } from "react-redux";
import { MapPinIcon } from "@heroicons/react/20/solid";

const Map = (props) => {
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const height = props.height || "223px";

  const dispatch = useDispatch();

  const stateCoordinate = useSelector(
    (state) => state.clientInfomation?.coordinates
  );

  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  const defaultCoordinates = [2.3964, 47.0815];

  const [lng, lat] = stateCoordinate || defaultCoordinates;

  const [showIcon, setShowIcon] = useState(false);

  const markerRef = useRef(null);

  const mapContainerRef = useRef(null);
  const mapInstance = useRef(null);

  useEffect(() => {
    dispatch({
      type: "MAP_IS_LOADING",
      payload: true,
    });
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: stateCoordinate ? 18 : 3,
    });

    map.on("load", () => {
      mapInstance.current = map;

      const el = document.createElement("div");
      el.className = "marker";

      dispatch({
        type: "MAP_IS_LOADING",
        payload: false, // Vous pourriez mettre false si la carte a fini de charger, ou true au début du chargement (selon ce que vous voulez accomplir)
      });

      const initialMarker = new mapboxgl.Marker(el)
        .setLngLat([lng, lat])
        .addTo(mapInstance.current);
      markerRef.current = initialMarker;
    });

    map.dragPan.disable();
    map.scrollZoom.disable();

    return () => map.remove();
  }, []);

  useEffect(() => {
    if (!mapInstance.current) return; // Ajoutez cette ligne pour vérifier

    if (stateCoordinate) {
      const [newLng, newLat] = stateCoordinate;

      if (markerRef.current) {
        markerRef.current.setLngLat([newLng, newLat]);
        setShowIcon(false);

        mapInstance.current.flyTo({
          center: [newLng, newLat],
          zoom: 18,
          speed: 2.4,
          onEnd: () => {
            setShowIcon(true);
          },
        });
      }
    } else {
      mapInstance.current.flyTo({
        center: [lng, lat],
        zoom: 3,
        speed: 7,
      });
    }
  }, [stateCoordinate]);

  useEffect(() => {
    if (stateCoordinate) {
      setShowIcon(true);
      const timer = setTimeout(() => {}, 4000);

      return () => clearTimeout(timer);
    } else setShowIcon(false);
  }, [stateCoordinate]);

  return (
    <div
      ref={mapContainerRef}
      className="relative"
      style={{
        width: "100%",
        height: height,
        borderRadius: "5px",
        overflow: "hidden",
      }}
    >
      <style jsx>{`
        .mapboxgl-ctrl-attrib {
          font-size: 10px !important;
        }
      `}</style>
      {stateCoordinate && showIcon ? (
        <MapPinIcon
          className="h-10 w-10 absolute top-[40%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition-opacity ease-out duration-1000"
          style={{ color: secondaryColor }}
        />
      ) : null}
    </div>
  );
};

export default Map;
