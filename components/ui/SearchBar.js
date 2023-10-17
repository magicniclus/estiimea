import React from "react";
import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { cn } from "../../lib/utils";

let timeout;

const SearchBar = (props) => {
  const {
    type = "",
    name = "",
    placeholder = "Rechercher...",
    onFilter,
  } = props;
  const [value, setValue] = useState("");

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      onFilter(value);
    }, 300); // 300ms de délai

    return () => clearTimeout(timeout); // Cleanup en cas de démontage du composant
  }, [value, onFilter]);

  return (
    <div className={cn(" text-slate-600 text-start w-[300px]")}>
      <div className="relative mt-1 rounded-md shadow-sm">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={type}
          name={name}
          id={name}
          className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-50 sm:text-sm sm:leading-6"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete={name === "password" ? "current-password" : "off"}
        />
      </div>
    </div>
  );
};

export default SearchBar;
