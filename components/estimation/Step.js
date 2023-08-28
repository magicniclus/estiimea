import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useRouter } from "next/router";

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
  const [error, setError] = useState(null);

  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const step = useSelector((state) => state?.stepInProgress);

  const type = useSelector((state) => state?.clientInfomation?.type);
  const surface = useSelector((state) => state?.clientInfomation?.surface);
  const nbrPieces = useSelector((state) => state?.clientInfomation?.pieces);
  const nbrChambres = useSelector((state) => state?.clientInfomation?.chambres);
  const annee = useSelector((state) => state?.clientInfomation?.annee);
  const etages = useSelector((state) => state?.clientInfomation?.etages);
  const niveaux = useSelector((state) => state?.clientInfomation?.niveaux);
  const espacesExterieurs = useSelector(
    (state) => state?.clientInfomation?.espacesExterieurs
  );
  const standing = useSelector((state) => state?.clientInfomation?.standing);
  const vue = useSelector((state) => state?.clientInfomation?.vue);
  const oriantation = useSelector(
    (state) => state?.clientInfomation?.oriantation
  );
  const travaux = useSelector((state) => state?.clientInfomation?.travaux);
  const atouts = useSelector((state) => state?.clientInfomation?.atouts);
  const dpe = useSelector((state) => state?.clientInfomation?.dpe);
  const ges = useSelector((state) => state?.clientInfomation?.ges);
  const contrat = useSelector((state) => state?.clientInfomation?.contrat);
  const vente = useSelector((state) => state?.clientInfomation?.vente);

  const dispatch = useDispatch();

  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  const currentSlug = pathSegments[1];

  const handleRoute = (e) => {
    e.preventDefault();
    router.push(`/${currentSlug}/estimation/analyse`);
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

  useEffect(() => {
    if (step === 5 && nbrChambres > nbrPieces) {
      setError(
        "Le nombre de chambres ne peut pas être supérieur au nombre de pièces"
      );
    } else setError(null);
  }, [nbrChambres]);

  const isButtonDisabled = () => {
    switch (step) {
      case 2:
        return !type;

      case 3:
        return !surface;

      case 4:
        return !nbrPieces;

      case 5:
        return !nbrChambres || nbrChambres > nbrPieces;

      case 6:
        return !annee;

      case 7:
        if (type === "Appartement") {
          return !etages || !niveaux;
        }
        return !etages;

      case 8:
        return false;

      case 9:
        return !standing;

      case 10:
        return !vue || oriantation.length === 0;

      case 11:
        return travaux === null || travaux === undefined;

      case 12:
        return false;

      case 13:
        return !dpe || !ges;

      case 14:
        return !contrat || !vente;

      default:
        return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="w-full min-h-[300px] h-full flex flex-col justify-between bg-opacity-50 rounded-md">
      {handleComponent()}
      <div className="flex items-center lg:mb-0 lg:my-10 mt-10 mb-5">
        <button
          disabled={isButtonDisabled()}
          type="button"
          className={`text-white py-1.5 px-5 rounded-full transition ease-in-out duration-100 w-max`}
          style={{
            backgroundColor: secondaryColor,
            opacity: isButtonDisabled() ? 0.6 : 1,
          }}
          onClick={(e) => (step === 14 ? handleRoute(e) : handleStep())}
        >
          {step === 14 ? "Voir l'estimation" : "Suivant"}
        </button>
        {error ? (
          <p className="text-red-300 text-xs font-light lg:w-3/5 text-start ml-2">
            {error}
          </p>
        ) : null}
      </div>
    </form>
  );
};

export default Step;
