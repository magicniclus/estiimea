import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardWithSize from "./CardWithSize";
import { set } from "firebase/database";

const Atouts = () => {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const [parking, setParking] = useState(null);
  const [box, setBox] = useState(null);
  const [piscine, setPiscine] = useState(null);
  const [garage, setGarage] = useState(null);
  const [cave, setCave] = useState(null);
  const [ascenseur, setAscenseur] = useState(null);

  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: {
        parking: parking ? true : false,
        box: box ? true : false,
        piscine: piscine ? true : false,
        garage: garage ? true : false,
        cave: cave ? true : false,
        ascenseur: ascenseur ? true : false,
      },
    });
  }, [parking, box, piscine, garage, cave, ascenseur]);

  return (
    <div>
      <h2
        className="text-2xl font-light lg:my-0 my-5 w-full max-w-[350px]"
        style={{ color: secondaryColor }}
      >
        Espaces exterieurs de votre bien:
      </h2>
      <div className="flex w-full xs:justify-between justify-start flex-wrap max-w-[400px] mt-5">
        <CardWithSize
          title="Parking"
          selected={parking}
          setSelected={setParking}
        />
        <CardWithSize title="Box" selected={box} setSelected={setBox} />

        <CardWithSize
          title="Piscine"
          selected={piscine}
          setSelected={setPiscine}
        />
        <CardWithSize
          title="Garage"
          selected={garage}
          setSelected={setGarage}
        />
        <CardWithSize title="Cave" selected={cave} setSelected={setCave} />
        <CardWithSize
          title="Ascenseur"
          selected={ascenseur}
          setSelected={setAscenseur}
        />
      </div>
    </div>
  );
};

export default Atouts;
