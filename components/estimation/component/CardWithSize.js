import React from "react";
import { useSelector } from "react-redux";

const CardWithSize = (props) => {
  const { title, selected, setSelected } = props;
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const handleClick = () => {
    if (selected !== title) {
      setSelected(title);
    } else {
      setSelected(null);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`mr-5 mt-2  relative w-24 py-5 bg-white border rounded-md flex justify-center items-center cursor-pointer transition-all duration-100 hover:shadow-lg ${
        selected ? "shadow-md" : null
      }`}
      style={{ borderColor: secondaryColor }}
    >
      <p className=" font-light text-sm" style={{ color: secondaryColor }}>
        {title}
      </p>
      <div className="w-4 h-4 bg-gray-200 rounded-full absolute top-1 right-1">
        <div
          className="w-3 h-3 rounded-full absolute top-0.5 right-0.5"
          style={{
            backgroundColor: secondaryColor,
            display: selected ? "" : "none",
          }}
        ></div>
      </div>
    </div>
  );
};

export default CardWithSize;
