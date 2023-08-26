import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardWithoutSize from "./CardWithoutSize";
import { set } from "firebase/database";

const VueOriantation = () => {
  const dispatch = useDispatch();

  const [selectedView, setSelectedView] = useState(null);
  const [selectedOrientation, setSelectedOrientation] = useState([]);

  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: {
        vue: selectedView,
        oriantation: selectedOrientation,
      },
    });
  }, [selectedView, selectedOrientation]);

  const handleOrientationChange = (orientation) => {
    setSelectedOrientation((prevOrientations) => {
      if (prevOrientations.includes(orientation)) {
        return prevOrientations.filter((item) => item !== orientation);
      } else {
        return [...prevOrientations, orientation];
      }
    });
  };
  return (
    <div>
      <h2
        className="text-2xl font-light lg:my-0 my-5"
        style={{ color: secondaryColor }}
      >
        Quelle est la vue et l'orientation de votre bien ?
      </h2>
      <div className="mt-5">
        <div className="flex flex-col">
          <h3 className="font-light text-sm " style={{ color: primaryColor }}>
            Vue de votre bien :
          </h3>
          <div className="w-full max-w-[370px] flex flex-wrap xs:justify-between  ">
            <CardWithoutSize
              title="Vis-à-vis"
              selectedCard={selectedView}
              setSelectedCard={setSelectedView}
            />
            <CardWithoutSize
              title="Dégagé"
              selectedCard={selectedView}
              setSelectedCard={setSelectedView}
            />
            <CardWithoutSize
              title="Exceptionnel"
              selectedCard={selectedView}
              setSelectedCard={setSelectedView}
            />
          </div>
        </div>
        <div className="flex flex-col mt-5">
          <h3 className="font-light text-sm" style={{ primaryColor }}>
            Oriantation de votre bien :
          </h3>
          <div className="w-full flex flex-wrap xs:justify-between max-w-[500px]">
            <CardWithoutSize
              title="Nord"
              selectedCard={selectedOrientation.includes("Nord") ? true : false}
              handleCardChange={handleOrientationChange}
              typeOfCard={true}
            />
            <CardWithoutSize
              title="Ouest"
              selectedCard={
                selectedOrientation.includes("Ouest") ? true : false
              }
              handleCardChange={handleOrientationChange}
              typeOfCard={true}
            />
            <CardWithoutSize
              title="Sud"
              selectedCard={selectedOrientation.includes("Sud") ? true : false}
              handleCardChange={handleOrientationChange}
              typeOfCard={true}
            />
            <CardWithoutSize
              title="Est"
              selectedCard={selectedOrientation.includes("Est") ? true : false}
              handleCardChange={handleOrientationChange}
              typeOfCard={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VueOriantation;
