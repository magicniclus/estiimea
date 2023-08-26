import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CardWithoutSize from "./CardWithoutSize";

const Standing = () => {
  const [selectedCard, setSelectedCard] = useState("");
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: { standing: selectedCard },
    });
  }, [selectedCard]);

  return (
    <>
      <h2
        className="text-2xl font-light lg:my-0 my-5 w-full max-w-[350px]"
        style={{ color: secondaryColor }}
      >
        Quel est le standing de votre bien:
      </h2>
      <div className="flex w-full lg:justify-between flex-wrap max-w-[400px]">
        <CardWithoutSize
          title="Moyen"
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <CardWithoutSize
          title="Standard"
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
        <CardWithoutSize
          title="Exceptionnel"
          selectedCard={selectedCard}
          setSelectedCard={setSelectedCard}
        />
      </div>
    </>
  );
};

export default Standing;
