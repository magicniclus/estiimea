import {
  BuildingOffice2Icon,
  ArrowTrendingUpIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/20/solid";
import React from "react";
import { useSelector } from "react-redux";

const Avantages = () => {
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const avantages = [
    {
      title: "Estimation gratuite",
      text: "Vos coordonnées nous permettront de vous fournir une estimation gratuite précise et fiable.",
      icon: (
        <BuildingOffice2Icon
          className="h-4 w-4 text-yellow-500 mr-3"
          aria-hidden="true"
        />
      ),
    },
    {
      title: "Estimation en temps réel",
      text: "Toutes nos estimations son basées sur le marché en temps réel et sur les données fournis par l'état.",
      icon: (
        <ArrowTrendingUpIcon
          className="h-4 w-4 text-yellow-500 mr-3"
          aria-hidden="true"
        />
      ),
    },
    {
      title: "Confidentialité garantie",
      text: "Nous respectons votre confidentialité. Vos données restent privées, seul votre agent immobilier peut y accéder.",
      icon: (
        <CloudArrowUpIcon
          className="h-4 w-4 text-yellow-500 mr-3"
          aria-hidden="true"
        />
      ),
    },
  ];
  return (
    <div>
      <div className="lg:my-0 my-10 flex flex-col">
        {avantages.map((avantage, index) => (
          <div key={index} className="flex flex-col mb-7 justify-center">
            <div
              className="lg:text-xl text-lg font-normal lg:mb-2 flex items-center"
              style={{ color: secondaryColor }}
            >
              {avantage.icon}
              {avantage.title}
            </div>
            <p
              className="text-sm font-light lg:w-full w-11/12"
              style={{ color: primaryColor }}
            >
              {avantage.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Avantages;
