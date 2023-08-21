import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { MapPinIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";

import { useRouter, pat, usePathname } from "next/navigation";
const SearchMapBar = ({ map }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  const [disabled, setDisabled] = useState(true);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  const dispatch = useDispatch();

  const route = useRouter();

  const pathName = usePathname();

  // À chaque changement de l'input, cherchez des suggestions
  const handleInputChange = async (e) => {
    setInput(e.target.value);

    if (e.target.value.length > 2) {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${e.target.value}.json?access_token=${mapboxgl.accessToken}&country=fr&proximity=2.349014,48.864716`
      );
      const data = await response.json();

      // Filtrer les suggestions pour ne garder que les adresses complètes
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
    setSuggestions([]); // Clear suggestions
  };

  useEffect(() => {
    if (input && coordinates) {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { coordinates: [coordinates[0], coordinates[1]] },
      });
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
    route.push(`${pathName}/estimation`);
  };

  return (
    <div className="mb-5">
      <h2 className="text-lg font-normal text-gray-700 mb-3">
        Adresse du bien à estimer
      </h2>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex mb-5 relative">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Saisir une adresse"
            className="max-w-[500px] w-[80%] sm:w-[90%] border border-blue-700 px-4 py-3 rounded-l-md font-light text-gray-900 text-sm"
          />
          <div className="bg-blue-700 w-[20%] sm:w-[10%] flex items-center justify-center rounded-r-md">
            <MapPinIcon className="h-6 w-6 text-white" aria-hidden="true" />
          </div>
          <ul className="absolute top-full bg-white w-full rounded-md shadow-md overflow-y-auto max-h-[150px]">
            {suggestions.map((suggestion) => (
              <li
                key={suggestion.id}
                onClick={() => handleSuggestionClick(suggestion)}
                className="cursor-pointer hover:bg-gray-100 transition ease-in-out duration-100 px-4 py-2 font-light text-gray-700"
              >
                {suggestion.place_name}
              </li>
            ))}
          </ul>
        </div>

        <button
          type="submit"
          disabled={disabled}
          className={`text-white py-2 px-8 rounded-lg transition ease-in-out duration-100 ${
            disabled
              ? "bg-blue-500"
              : "bg-blue-700 hover:bg-blue-600 hover:shadow-md"
          }`}
        >
          Estimer
        </button>
      </form>
    </div>
  );
};

export default SearchMapBar;
