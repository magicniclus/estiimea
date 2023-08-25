import React, { useState } from "react";

const InputNumber = (props) => {
  const value = props.value;
  const setValue = props.onChange;
  const type = props.type;
  const placeholder = props.placeholder;

  const handleInputChange = (event) => {
    const inputValue = event.target.value;

    if (inputValue === "") {
      setValue(null);
    } else if (Number.isInteger(Number(inputValue))) {
      setValue(parseInt(inputValue, 10));
    }
  };

  return (
    <div className="flex">
      <input
        type="number"
        value={value}
        step="1"
        onChange={handleInputChange}
        className="ax-w-[500px] w-[80%] sm:w-[90%] border border-blue-700 px-4 py-3 rounded-l-md font-light text-gray-900 text-sm"
        placeholder={placeholder || "Entrez la surface..."}
      />
      <div className="bg-blue-700 w-[20%] sm:w-[10%] flex items-center justify-center rounded-r-md py-2 px-5">
        <p className="text-white">
          {
            <div>
              {type ? (
                type
              ) : (
                <>
                  <span>
                    m<sup>2</sup>
                  </span>
                </>
              )}
            </div>
          }
        </p>
      </div>
    </div>
  );
};

export default InputNumber;
