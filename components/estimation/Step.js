import React from "react";
import { useSelector } from "react-redux";

import AppartementMaison from "./component/AppartementMaison";
import Surface from "./component/Surface";
import NbrPieces from "./component/NbrPieces";
import NbrChambres from "./component/NbrChambres";
import Annee from "./component/Annee";
import NiveauxEtage from "./component/NiveauxEtage";
import EspacesExterieurs from "./component/EspacesExterieurs";

const Step = () => {
  const primaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const component = "EspacesExterieurs";
  const handleComponent = () => {
    switch (component) {
      case "AppartementMaison":
        return <AppartementMaison />;

      case "surface":
        return <Surface />;

      case "NbrPieces":
        return <NbrPieces />;

      case "NbrChambres":
        return <NbrChambres />;

      case "annee":
        return <Annee />;

      case "niveauEtage":
        return <NiveauxEtage />;

      case "EspacesExterieurs":
        return <EspacesExterieurs />;

      default:
        return <AppartementMaison />;
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-h-[300px] h-full flex flex-col justify-between bg-gray-50 bg-opacity-50 shadow-sm rounded-md px-5 py-5"
    >
      {handleComponent()}
      <button
        type="submit"
        className={`text-white py-1.5 px-5 rounded-full transition ease-in-out duration-100 w-min lg:mb-0 my-10`}
        style={{ backgroundColor: primaryColor }}
      >
        Continuer
      </button>
    </form>
  );
};

export default Step;
