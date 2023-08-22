import React, { useEffect, useState } from "react";
import CardWithLogo from "./CardWithLogo";
import { useSelector, useDispatch } from "react-redux";

const Adresse = () => {
  const dispatch = useDispatch();
  const primaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const [selectedType, setSelectedType] = useState(null);

  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };

  useEffect(() => {
    if (selectedType !== null) {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { type: selectedType },
      });
    } else
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { type: null },
      });
  }, [selectedType]);

  return (
    <>
      <h2
        className="text-2xl font-light lg:my-0 my-5"
        style={{ color: primaryColor }}
      >
        Type de bien :
      </h2>
      <div className="flex">
        <CardWithLogo
          margin="35px"
          onSelect={handleTypeSelection} // Ajout du prop onSelect ici
          typeSelected={selectedType}
        />
        <CardWithLogo
          type="immeuble"
          onSelect={handleTypeSelection} // Ajout du prop onSelect ici
          typeSelected={selectedType}
        />
      </div>
    </>
  );
};

export default Adresse;
