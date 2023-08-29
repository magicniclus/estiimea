import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import LittleLoader from "../../loader/LittleLoader";
import { CheckIcon } from "@heroicons/react/20/solid";

import { useRouter } from "next/router";

const AnalyseLoader = () => {
  const [showCheckIcon, setShowCheckIcon] = useState(false);
  const [showCheckIconTwo, setShowCheckIconTwo] = useState(false);
  const [showCheckIconThree, setShowCheckIconThree] = useState(false);
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCheckIcon(true);
    }, 2000);

    return () => clearTimeout(timer); // Clear the timer if the component is unmounted
  }, []);

  useEffect(() => {
    if (showCheckIcon) {
      const timer = setTimeout(() => {
        setShowCheckIconTwo(true);
      }, 1500);
      return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }
  }, [showCheckIcon]);

  useEffect(() => {
    if (showCheckIconTwo) {
      const timer = setTimeout(() => {
        setShowCheckIconThree(true);
      }, 1200);
      return () => clearTimeout(timer); // Clear the timer if the component is unmounted
    }
  }, [showCheckIconTwo]);

  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  const currentSlug = pathSegments[1];

  const handleRoute = () => {
    router.push(`/${currentSlug}/estimation/inscription`);
  };

  useEffect(() => {
    if (showCheckIconThree) {
      handleRoute();
    }
  }, [showCheckIconThree]);

  return (
    <div className="w-full lg:w-6/12 min-h-[400px] lg:min-h-[600px] flex flex-col justify-center lg:items-center">
      <h2
        className="text-2xl lg:my-0 my-5 lg:text-center"
        style={{ color: secondaryColor }}
      >
        Analyse en cours...
      </h2>
      <div className="mt-5">
        <div className="flex items-center">
          {showCheckIcon ? (
            <CheckIcon className="h-8 w-8 text-green-500" />
          ) : (
            <LittleLoader />
          )}
          <p
            className="ml-3"
            style={{
              color: primaryColor,
              opacity: showCheckIcon ? "1" : "0.8",
            }}
          >
            Analyse de vos données
          </p>
        </div>
        <div className="flex items-center mt-3">
          {showCheckIconTwo ? (
            <CheckIcon className="h-8 w-8 text-green-500" />
          ) : (
            <LittleLoader />
          )}
          <p
            className="ml-3"
            style={{
              color: primaryColor,
              opacity: showCheckIconTwo ? "1" : "0.8",
            }}
          >
            Analyse du marché
          </p>
        </div>
        <div className="flex items-center mt-3">
          {showCheckIconThree ? (
            <CheckIcon className="h-8 w-8 text-green-500" />
          ) : (
            <LittleLoader />
          )}
          <p
            className="ml-3"
            style={{
              color: primaryColor,
              opacity: showCheckIconThree ? "1" : "0.8",
            }}
          >
            Analyse de vos coordonnées
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnalyseLoader;
