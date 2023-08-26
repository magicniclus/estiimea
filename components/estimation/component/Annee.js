import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectWithIcon from "./SelectWithIcon";

const Annee = () => {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const [value, setValue] = useState(0);

  const options = [
    "Avant 1949",
    "Entre 1949 et 1997",
    "Entre 1997 et 2005",
    "Entre 2005 et 2012",
    "Entre 2012 et 2018",
    "Après 2018",
    "Neuf",
  ];

  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: { annee: value },
    });
  }, [value]);

  return (
    <>
      <h2
        className="text-2xl font-light lg:my-0 my-5"
        style={{ color: secondaryColor }}
      >
        L'année de construction de votre bien :
      </h2>
      <div className="flex">
        <SelectWithIcon options={options} onChange={setValue} />
      </div>
    </>
  );
};

export default Annee;
