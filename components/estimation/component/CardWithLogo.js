import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const CardWithLogo = (props) => {
  const dispatch = useDispatch();

  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const houseSvg = (
    <svg
      width="100%"
      height="auto"
      viewBox="0 0 57 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="7.64648"
        y="24"
        width="42"
        height="24"
        fill={`${secondaryColor}`}
      />
      <path d="M28.1458 0L56.2917 27H0L28.1458 0Z" fill={`${secondaryColor}`} />
      <rect x="35.6465" y="36" width="10" height="7" fill="white" />
      <rect x="13.6465" y="36" width="10" height="12" fill="white" />
    </svg>
  );

  const immeubleSvg = (
    <svg
      width="100%"
      height="auto"
      viewBox="0 0 37 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36.6545" height="48" fill={`${secondaryColor}`} />
      <rect
        x="6.10938"
        y="6.10907"
        width="8.72727"
        height="6.10909"
        fill="white"
      />
      <rect
        x="6.10938"
        y="15.7091"
        width="8.72727"
        height="6.10909"
        fill="white"
      />
      <rect
        x="6.10938"
        y="25.3091"
        width="8.72727"
        height="6.10909"
        fill="white"
      />
      <rect
        x="21.8184"
        y="6.10907"
        width="8.72727"
        height="6.10909"
        fill="white"
      />
      <rect
        x="21.8184"
        y="15.7091"
        width="8.72727"
        height="6.10909"
        fill="white"
      />
      <rect
        x="21.8184"
        y="25.3091"
        width="8.72727"
        height="6.10909"
        fill="white"
      />
      <rect
        x="13.9629"
        y="37.5273"
        width="8.72727"
        height="10.4727"
        fill="white"
      />
    </svg>
  );

  const typeSelected = props.typeSelected;

  const [selected, setSelected] = useState(false);

  const type = props.type || "maison";
  const margin = props.margin || "0px";

  const handleClick = () => {
    if (typeSelected !== type) {
      props.onSelect(type);
      setSelected(true);
    } else {
      setSelected(false);
      props.onSelect(null);
    }
  };

  useEffect(() => {
    if (typeSelected === type) {
      setSelected(true);
    } else {
      setSelected(false);
    }
  }, [typeSelected]);

  return (
    <div
      onClick={handleClick} // Ajout de l'événement onClick ici
      className={`relative px-4 py-2 w-24 lg:w-[115px] border rounded-xl cursor-pointer transition-all duration-100 flex justify-around flex-col items-center hover:shadow-lg ${
        selected ? "shadow-md" : null
      }`}
      style={{ borderColor: secondaryColor, marginRight: props.margin }}
    >
      <div className={`${type === "maison" ? "lg:w-16 w-16" : "lg:w-12 w-10"}`}>
        {type === "maison" ? houseSvg : immeubleSvg}
      </div>
      <p
        className="mt-3 lg:text-normal text-sm"
        style={{ color: secondaryColor }}
      >
        {type === "maison" ? "Maison" : "Appartement"}
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

export default CardWithLogo;
