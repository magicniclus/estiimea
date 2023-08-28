import React, { useEffect, useState } from "react";

import { useSelector } from "react-redux";

import { useRouter } from "next/router";

import { getEstimation } from "../../../../homaData/getData";
import { addEstimationForUser } from "../../../../firebase/dataManager";

import Loader from "../../../../components/loader/Loader";
import ContainerEstimation from "../../../../components/layout/ContainerEstimation";
import EstimationLayout from "../../../../components/layout/EstimationLayout";

import { v4 as uuidv4 } from "uuid";
import { current } from "@reduxjs/toolkit";

const index = () => {
  const uniqueId = uuidv4();

  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  const currentSlug = pathSegments[1];

  const clientInformation = useSelector((state) => state.clientInfomation);
  const adresse = useSelector((state) => state.clientInfomation.adresse);
  const userId = useSelector((state) => state.user?.uid);
  const stateFontColor = useSelector(
    (state) => state?.user?.settings?.fontColor
  );
  const stateFontColor2 = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  const date = new Date();

  const optionsDate = { year: "numeric", month: "long", day: "numeric" };
  const optionsTime = { hour: "2-digit", minute: "2-digit" };

  const [estimation, setEstimation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const formattedDate =
    date.toLocaleDateString("fr-FR", optionsDate) +
    " à " +
    date.toLocaleTimeString("fr-FR", optionsTime);

  function transformClientInfoToEstimationParams(clientInfo) {
    // Map de conversion pour les années
    const yearMapping = {
      Inconnue: 1,
      "Avant 1915": 2,
      "[1915-1944]": 3,
      "[1945-1974]": 4,
      "[1975-1989]": 5,
      "[1990-2009]": 6,
      "Après 2010": 7,
    };

    // Map de conversion pour les notations
    const ratingMapping = {
      G: 1,
      F: 2,
      E: 3,
      D: 4,
      C: 5,
      B: 6,
      A: 7,
    };

    // Map de conversion pour le standing
    const standingMapping = {
      "A rénover": 1,
      Bas: 2,
      Moyen: 3,
      Haut: 4,
    };

    // Map de conversion pour la vue
    const viewMapping = {
      "Vis-à-vis": 1,
      Dégagée: 2,
      Exceptionnelle: 3,
    };

    // Map de conversion pour l'orientation
    const orientationMapping = {
      Nord: 1,
      Sud: 2,
      Ouest: 3,
      Est: 4,
    };

    return {
      lon: clientInfo.coordinates[0],
      lat: clientInfo.coordinates[1],
      propertyType: clientInfo.type === "maison" ? 1 : 0,
      propertySurface: clientInfo.surface,
      roomNb: clientInfo.pieces,
      bedroomNb: clientInfo.chambres,
      floor:
        clientInfo.type === "maison"
          ? 0
          : parseInt(clientInfo.etages.split(" ")[0], 10),
      floorNb: parseInt(clientInfo.etages.split(" ")[0], 10),
      gardenSurface: clientInfo.jardin ? clientInfo.surface : 0,
      constructionYear: yearMapping[clientInfo.annee],
      parkingNb: (clientInfo.parking ? 1 : 0) + (clientInfo.box ? 1 : 0),
      terraceNb: clientInfo.terrasse ? 1 : 0,
      balconyNb: clientInfo.balcon ? 1 : 0,
      cellar: clientInfo.cave ? 1 : 0,
      concierge: 0, // Vous n'avez pas de données concernant le concierge. J'ai mis 0 par défaut
      elevator: clientInfo.ascenseur ? 1 : 0,
      swimmingPool: clientInfo.piscine ? 1 : 0,
      ratingEmission: ratingMapping[clientInfo.ges],
      ratingEnergyConso: ratingMapping[clientInfo.dpe],
      standing: standingMapping[clientInfo.standing],
      view: viewMapping[clientInfo.vue],
      orientation: orientationMapping[clientInfo.oriantation[0]], // Utilise le premier élément d'orientation pour le moment
      thirdPartyFees: 0, // J'ai mis 0 par défaut car vous n'avez pas mentionné de données liées aux frais tri-partites
    };
  }

  useEffect(() => {
    if (adresse) {
      getEstimation(transformClientInfoToEstimationParams(clientInformation))
        .then((data) => {
          addEstimationForUser(userId, {
            ...data,
            id: uniqueId,
            agent: userId,
            clientInformations: {
              date: formattedDate,
              clientInformation,
            },
          });
          setEstimation(data);
        })
        .then(() => {
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setTimeout(() => {
        router.push(`/${currentSlug}`);
      }, 1000);
    }
  }, [adresse, currentSlug]);
  return (
    <EstimationLayout>
      <ContainerEstimation>
        {isLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-10">
            <Loader />
          </div>
        )}
        <div className="lg:min-h-[600px] flex flex-col justify-between  w-full lg:w-4/12">
          <h1>Hello Word</h1>
          <div className="items-center  mt-5 lg:mt-0 lg:mb-0 mb-5 lg:flex hidden">
            <a
              className="font-light text-xs"
              style={{ color: stateFontColor2 }}
              href="#"
            >
              Paramètre et cookies
            </a>
            <div className="ml-3">|</div>
            <a
              className="font-light text-xs ml-3"
              style={{ color: stateFontColor2 }}
              href="#"
            >
              Signaler un abus
            </a>
          </div>
        </div>
        <div className="w-0.5 min-h-[600px] bg-gray-100 lg:flex hidden" />
        <div className="w-full h-0.5 bg-gray-100 lg:hidden flex mt-7 lg:mt-0" />
      </ContainerEstimation>
    </EstimationLayout>
  );
};

export default index;
