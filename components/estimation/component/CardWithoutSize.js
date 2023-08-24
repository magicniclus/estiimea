import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const CardWithoutSize = (props) => {
  const { title, selectedCard, setSelectedCard, handleCardChange } = props;
  const typeOfCard = props.typeOfCard || null;
  const standing = useSelector((state) => state?.clientInformation?.standing);
  const primaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const isSelected = typeOfCard ? selectedCard : title === selectedCard;

  const handleClick = () => {
    if (typeOfCard) {
      handleCardChange(title);
    } else {
      setSelectedCard(title === selectedCard ? "" : title);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`md:mr-5 relative w-24 py-5 bg-white border-blue-700 border rounded-md flex justify-center items-center cursor-pointer transition-all duration-100 hover:shadow-lg mt-2 ${
        isSelected ? "shadow-md" : ""
      }`}
    >
      <p className="text-blue-700 font-light text-sm">{title}</p>
      <div className="w-4 h-4 bg-gray-200 rounded-full absolute top-1 right-1">
        <div
          className="w-3 h-3 rounded-full absolute top-0.5 right-0.5"
          style={{
            backgroundColor: primaryColor,
            display: isSelected ? "" : "none",
          }}
        ></div>
      </div>
    </div>
  );
};

export default CardWithoutSize;
