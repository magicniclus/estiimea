import { CheckIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EtapeEstimationContainer = () => {
  const clientInformation = useSelector((state) => state?.clientInfomation);
  //Faire les étapes de l'estimation en fonction de l'avancement de l'utilisateur
  const [etape, setEtape] = useState();
  useEffect(() => {
    setEtape([
      {
        name: "Adresse",
        done: clientInformation?.adresse ? true : false,
      },
      {
        name: "Appartement/Maison",
        done: clientInformation?.typeBien ? true : false,
      },
      {
        name: "Surface",
        done: clientInformation?.surface ? true : false,
      },
      {
        name: "Pièces",
        done: clientInformation?.pieces ? true : false,
      },
      {
        name: "Chambres",
        done: clientInformation?.chambres ? true : false,
      },
      {
        name: "Niveaux / Étages",
        done: clientInformation?.etages ? true : false,
      },
      {
        name: "Espaces exterieurs",
        done: clientInformation?.exterieur ? true : false,
      },
      {
        name: "Standing",
        done: clientInformation?.standing ? true : false,
      },
      {
        name: "Vue",
        done: clientInformation?.vue ? true : false,
      },
      {
        name: "Atouts",
        done: clientInformation?.atouts ? true : false,
      },
      {
        name: "Classement energetique",
        done: clientInformation?.classeEnergie ? true : false,
      },
      {
        name: "Objectif",
        done: clientInformation?.objectif ? true : false,
      },
    ]);
  }, [clientInformation]);
  return (
    <div className="lg:block hidden">
      <h1 className="text-xl font-light mb-5">
        Carractéristiques de votre bien
      </h1>
      <ul>
        {etape &&
          etape.map((item, index) => (
            <li
              key={index}
              className={`text-sm ${
                item.done
                  ? " text-blue-700 font-normal"
                  : " text-gray-400 font-light"
              } rounded-lg mb-2`}
            >
              {item.done ? (
                <CheckIcon className="inline-block w-4 h-4 mr-2 text-blue-700" />
              ) : null}
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EtapeEstimationContainer;
