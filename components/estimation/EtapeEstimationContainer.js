import { CheckIcon } from "@heroicons/react/20/solid";
import React, { useState } from "react";

const EtapeEstimationContainer = () => {
  //Faire les étapes de l'estimation en fonction de l'avancement de l'utilisateur
  const [etape, setEtape] = useState([
    {
      name: "Adresse",
      done: true,
    },
    {
      name: "Appartement/Maison",
      done: false,
    },
    {
      name: "Surface",
      done: false,
    },
    {
      name: "Pièces",
      done: false,
    },
    {
      name: "Chambres",
      done: false,
    },
    {
      name: "Niveaux / Étages",
      done: false,
    },
    {
      name: "Espaces exterieurs",
      done: false,
    },
    {
      name: "Standing",
      done: false,
    },
    {
      name: "Vue",
      done: false,
    },
    {
      name: "Atouts",
      done: false,
    },
    {
      name: "Classement energetique",
      done: false,
    },
    {
      name: "Objectif",
      done: false,
    },
  ]);
  return (
    <div>
      <h1 className="text-xl font-light mb-5">
        Carractéristiques de votre bien
      </h1>
      <ul>
        {etape.map((item, index) => (
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
