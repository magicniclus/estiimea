import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

const SearchMapBar = ({ map }) => {
  const initialAddress = useSelector(
    (state) => state.clientInfomation?.adresse
  );

  const initialCoordinates = useSelector(
    (state) => state.clientInfomation?.coordinates
  );

  const [input, setInput] = useState(initialAddress || "");
  const [suggestions, setSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState(initialCoordinates || null);
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  const [disabled, setDisabled] = useState(true);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const dispatch = useDispatch();
  const router = useRouter();

  const isDashboard = router.asPath.includes("dashboard");

  const handleInputChange = async (e) => {
    setInput(e.target.value);

    if (e.target.value.length > 2) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${mapboxgl.accessToken}&country=fr&proximity=2.349014,48.864716`
      );
      const data = await response.json();

      const addressSuggestions = data.features.filter((feature) =>
        feature.place_type.includes("address")
      );

      setSuggestions(addressSuggestions);
    } else {
      setSuggestions([]);
      setCoordinates(null);
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { coordinates: null },
      });
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setCoordinates(suggestion.geometry.coordinates);
    setInput(suggestion.place_name);
    setSuggestions([]);
  };

  useEffect(() => {
    if (input && coordinates) {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { coordinates: [coordinates[0], coordinates[1]] },
      });
      setDisabled(false);
    } else if (initialAddress) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [input, coordinates]);

  useEffect(() => {
    if (coordinates) {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { coordinates: [coordinates[0], coordinates[1]] },
      });
    }
  }, [coordinates]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: { adresse: input, coordinates: coordinates },
    });
    router.push(`${router.asPath}/estimation`);
  };

  return (
    <div className="mb-5">
      <h2 className="text-lg font-normal mb-3" style={{ color: primaryColor }}>
        Adresse du bien à estimer
      </h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex mb-5 relative">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Saisir une adresse"
            className="max-w-[500px] w-[80%] sm:w-[90%] border px-4 py-3 rounded-l-md font-light text-sm outline-none"
            style={{
              color: primaryColor,
              borderColor: secondaryColor,
              pointerEvents: "auto",
              opacity: 1,
            }}
          />
          <div
            className="w-[20%] sm:w-[10%]  max-w-[50px] flex items-center justify-center rounded-r-md"
            style={{ backgroundColor: secondaryColor }}
          >
            <MapPinIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <ul className="absolute top-full bg-white w-full rounded-b-md shadow-md overflow-y-auto max-h-[150px] z-10 transition-all duration-800 ease-in-out px-1.5">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer bg-white hover:rounded-md hover:bg-gray-100 transition ease-in-out duration-100 px-4 py-2 font-light"
                style={{ color: primaryColor }}
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={disabled || isDashboard}
          className={`text-white py-2 px-8 rounded-lg transition ease-in-out duration-100 ${
            disabled ? "" : "hover:shadow-md"
          }`}
          style={
            disabled || isDashboard
              ? { backgroundColor: secondaryColor, opacity: "0.6" }
              : { backgroundColor: secondaryColor }
          }
        >
          Estimer
        </button>
      </form>
    </div>
  );
};

export default SearchMapBar;
