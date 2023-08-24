import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";

const SelectWithIcon = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Sélectionné une valeur");
  const options = props.options || [];

  const handleSelectChange = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (props.onChange) {
      props.onChange(value);
    }
  };

  return (
    <div
      className={`flex relative w-full max-w-[350px] ${
        isOpen ? "shadow-lg" : null
      }`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <div className="ax-w-[500px] w-[80%] sm:w-[90%] border border-blue-700 px-4 py-3 rounded-l-md font-light text-gray-900 text-sm cursor-pointer">
        {selectedValue}
      </div>
      <div className="bg-blue-700 w-[20%] sm:w-[10%] max-w-[50px] flex items-center justify-center rounded-r-md ">
        {isOpen ? (
          <ChevronUpIcon className="h-6 w-6 text-white" />
        ) : (
          <ChevronDownIcon className="h-6 w-6 text-white" />
        )}
      </div>
      {isOpen && (
        <div
          className={`absolute top-full left-0 w-full rounded-md bg-white z-10 transition-all duration-800 ease-in-out  px-2 py-2 ${
            isOpen ? "max-h-36 shadow-sm" : "max-h-0"
          } overflow-y-auto`}
        >
          {options.map((option, index) => (
            <div
              key={index}
              className={`text-gray-700 font-light cursor-pointer px-4 py-2 bg-white hover:rounded-md hover:bg-gray-100 transition ease-in-out duration-100`}
              onClick={() => handleSelectChange(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SelectWithIcon;
