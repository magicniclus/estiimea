import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import CardWithSize from "./CardWithSize";

const EspacesExterieurs = () => {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const [selectedGarden, setSelectedGarden] = useState(null);
  const [selectedTerrasse, setSelectedTerrasse] = useState(null);
  const [selectedBalcon, setSelectedBalcon] = useState(null);

  useEffect(() => {
    if (selectedGarden !== null) {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { jardin: true },
      });
    } else {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { jardin: false },
      });
    }
    if (selectedTerrasse !== null) {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { terrasse: true },
      });
    } else {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { terrasse: false },
      });
    }
    if (selectedBalcon !== null) {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { balcon: true },
      });
    } else {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: { balcon: false },
      });
    }
  }, [selectedGarden, selectedBalcon, selectedTerrasse]);

  return (
    <>
      <h2
        className="text-2xl font-light lg:my-0 my-5 w-full max-w-[350px]"
        style={{ color: secondaryColor }}
      >
        Espaces exterieurs de votre bien:
      </h2>
      <div className="flex w-full lg:justify-between flex-wrap max-w-[400px]">
        <CardWithSize
          title="Jardin"
          selected={selectedGarden}
          setSelected={setSelectedGarden}
        />
        <CardWithSize
          title="Terrasse"
          selected={selectedTerrasse}
          setSelected={setSelectedTerrasse}
        />
        <CardWithSize
          title="Balcon"
          selected={selectedBalcon}
          setSelected={setSelectedBalcon}
        />
      </div>
    </>
  );
};

export default EspacesExterieurs;
