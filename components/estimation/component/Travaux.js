import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardWithoutSize from "./CardWithoutSize";

const Travaux = () => {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const [selectedTravaux, setSelectedTravaux] = useState("");
  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: {
        travaux:
          selectedTravaux === "Oui"
            ? true
            : selectedTravaux === "Non"
            ? false
            : null,
      },
    });
  }, [selectedTravaux]);
  return (
    <div>
      <h2
        className="text-2xl font-light lg:my-0 my-5"
        style={{ color: secondaryColor }}
      >
        Des travaux sont à prévoir dans votre bien ?
      </h2>
      <div className="mt-5 flex flex-wrap">
        <CardWithoutSize
          title="Oui"
          selectedCard={selectedTravaux}
          setSelectedCard={setSelectedTravaux}
        />
        <CardWithoutSize
          title="Non"
          selectedCard={selectedTravaux}
          setSelectedCard={setSelectedTravaux}
        />
      </div>
    </div>
  );
};

export default Travaux;
