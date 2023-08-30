import React from "react";
import { useSelector } from "react-redux";

const InputNumber = (props) => {
  const value = props.value;
  const setValue = props.onChange;
  const type = props.type;
  const placeholder = props.placeholder;

  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

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
        className="max-w-[500px] w-[80%] sm:w-[90%] border px-4 py-3 rounded-l-md font-light text-sm outline-none"
        placeholder={placeholder || "Entrez la surface..."}
        style={{ borderColor: secondaryColor, color: primaryColor }}
      />
      <div
        className="w-[20%] sm:w-[10%] flex items-center justify-center rounded-r-md py-2 px-5"
        style={{ backgroundColor: secondaryColor }}
      >
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
