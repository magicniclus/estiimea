import { CheckIcon } from "@heroicons/react/20/solid";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const EtapeEstimationContainer = () => {
  const clientInformation = useSelector((state) => state?.clientInfomation);
  const stepInProgress = useSelector((state) => state?.stepInProgress);
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  //Faire les étapes de l'estimation en fonction de l'avancement de l'utilisateur
  const [etape, setEtape] = useState();
  console.log(clientInformation.travaux);
  useEffect(() => {
    setEtape([
      {
        name: "Adresse",
        done: clientInformation?.adresse ? true : false,
        select: stepInProgress === 1 ? true : false,
      },
      {
        name: "Appartement/Maison",
        done: clientInformation?.type ? true : false,
        select: stepInProgress === 2 ? true : false,
      },
      {
        name: "Surface",
        done: clientInformation?.surface ? true : false,
        select: stepInProgress === 3 ? true : false,
      },
      {
        name: "Pièces",
        done: clientInformation?.pieces ? true : false,
        select: stepInProgress === 4 ? true : false,
      },
      {
        name: "Chambres",
        done: clientInformation?.chambres ? true : false,
        select: stepInProgress === 5 ? true : false,
      },
      {
        name: "Année",
        done: clientInformation?.annee ? true : false,
        select: stepInProgress === 6 ? true : false,
      },
      clientInformation?.type === "Appartement"
        ? {
            name: "Niveaux / Étages",
            done:
              clientInformation?.etages && clientInformation?.niveaux
                ? true
                : false,
            select: stepInProgress === 7 ? true : false,
          }
        : {
            name: "Étages",
            done: clientInformation?.etages ? true : false,
            select: stepInProgress === 7 ? true : false,
          },
      {
        name: "Espaces exterieurs",
        done: stepInProgress >= 9 ? true : false,
        select: stepInProgress === 8 ? true : false,
      },
      {
        name: "Standing",
        done: clientInformation?.standing ? true : false,
        select: stepInProgress === 9 ? true : false,
      },
      {
        name: "Vue / oriantation",
        done:
          clientInformation?.vue && clientInformation?.oriantation.length !== 0
            ? true
            : false,
        select: stepInProgress === 10 ? true : false,
      },
      {
        name: "Travaux",
        done:
          clientInformation?.travaux !== null &&
          clientInformation?.travaux !== undefined
            ? true
            : false,
        select: stepInProgress === 11 ? true : false,
      },
      {
        name: "Atouts",
        done: stepInProgress >= 12 ? true : false,
        select: stepInProgress === 12 ? true : false,
      },
      {
        name: "Classement energetique",
        done: clientInformation?.dpe && clientInformation?.ges ? true : false,
        select: stepInProgress === 13 ? true : false,
      },
      {
        name: "Objectif",
        done:
          clientInformation?.contrat && clientInformation?.vente
            ? true
            : false && stepInProgress === 14
            ? true
            : false,
        select: stepInProgress === 14 ? true : false,
      },
    ]);
  }, [clientInformation, stepInProgress]);
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
                  ? " "
                  : stepInProgress === index + 1
                  ? ""
                  : "text-gray-400 font-normal"
              } rounded-lg mb-2`}
              style={
                item.done
                  ? { color: secondaryColor }
                  : stepInProgress === index + 1
                  ? { color: secondaryColor }
                  : null
              }
            >
              {item.done ? (
                <CheckIcon
                  className="inline-block w-4 h-4 mr-2 "
                  style={{ color: secondaryColor }}
                />
              ) : null}
              {item.name}
            </li>
          ))}
      </ul>
    </div>
  );
};

export default EtapeEstimationContainer;
