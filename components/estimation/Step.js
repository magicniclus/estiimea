import React from "react";
import { useSelector, useDispatch } from "react-redux";

import AppartementMaison from "./component/AppartementMaison";
import Surface from "./component/Surface";
import NbrPieces from "./component/NbrPieces";
import NbrChambres from "./component/NbrChambres";
import Annee from "./component/Annee";
import NiveauxEtage from "./component/NiveauxEtage";
import EspacesExterieurs from "./component/EspacesExterieurs";
import Standing from "./component/Standing";
import VueOriantation from "./component/VueOriantation";
import Travaux from "./component/Travaux";
import Atouts from "./component/Atouts";
import ClassementEnergetique from "./component/ ClassementEnergetique";
import Objectifs from "./component/Objectifs";

const Step = () => {
  const primaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const step = useSelector((state) => state?.stepInProgress);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  const handleComponent = () => {
    switch (step) {
      case 2:
        return <AppartementMaison />;

      case 3:
        return <Surface />;

      case 4:
        return <NbrPieces />;

      case 5:
        return <NbrChambres />;

      case 6:
        return <Annee />;

      case 7:
        return <NiveauxEtage />;

      case 8:
        return <EspacesExterieurs />;

      case 9:
        return <Standing />;

      case 10:
        return <VueOriantation />;

      case 11:
        return <Travaux />;

      case 12:
        return <Atouts />;

      case 13:
        return <ClassementEnergetique />;

      case 14:
        return <Objectifs />;

      default:
        return <AppartementMaison />;
    }
  };
  const handleStep = () => {
    dispatch({ type: "UPDATE_SIMULATEUR_STEP" });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-h-[300px] h-full flex flex-col justify-between bg-opacity-50 rounded-md"
    >
      {handleComponent()}
      <button
        type="button"
        className={`text-white py-1.5 px-5 rounded-full transition ease-in-out duration-100 w-min lg:mb-0 my-10`}
        style={{ backgroundColor: primaryColor }}
        onClick={handleStep}
      >
        Continuer
      </button>
    </form>
  );
};

export default Step;
