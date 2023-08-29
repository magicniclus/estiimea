import {
  ChartBarIcon,
  CheckBadgeIcon,
  CheckIcon,
  ClockIcon,
  CloudIcon,
  EnvelopeIcon,
  PhoneIcon,
} from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const PresentationContainer = () => {
  const avantages = [
    {
      title: "Visualisez votre estimation en moins de 2 minutes",
      icon: (
        <CheckBadgeIcon
          className="h-4 w-4 text-yellow-500"
          aria-hidden="true"
        />
      ),
    },
    {
      title: "Des données précise ajustées en temps réel.",
      icon: (
        <CheckBadgeIcon
          className="h-4 w-4 text-yellow-500"
          aria-hidden="true"
        />
      ),
    },
    {
      title: "Sans engagement et vos données sont sécurisées  ",
      icon: (
        <CheckBadgeIcon
          className="h-4 w-4 text-yellow-500"
          aria-hidden="true"
        />
      ),
    },
  ];
  const stateTitle = useSelector((state) => state?.user?.settings?.title);
  const stateUser = useSelector((state) => state?.user?.userInformation);
  const stateDescription = useSelector(
    (state) => state?.user?.settings?.description
  );
  const stateDescription2 = useSelector(
    (state) => state?.user?.settings?.description2
  );
  const stateBackgroundColor = useSelector(
    (state) => state?.user?.settings?.backgroundColor
  );

  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const stateEntreprise = useSelector(
    (state) => state?.user?.settings?.entreprise
  );
  const stateName = useSelector((state) => state?.user?.settings?.name);
  const statePhone = useSelector(
    (state) => state?.user?.userInformation?.phone
  );
  const stateProfil = useSelector(
    (state) => state?.user?.userInformation?.photoProfil
  );
  const stateEmail = useSelector(
    (state) => state?.user?.userInformation?.email
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: "USER_IS_LOADING", payload: true });
    if (stateUser) {
      dispatch({ type: "USER_IS_LOADING", payload: false });
    }
  }, [stateUser]);

  return (
    <div
      className=" h-full w-full lg:w-4/12 flex flex-col justify-between lg:min-h-[600px] lg:mb-0 mb-10"
      style={{ color: primaryColor }}
    >
      <div className="flex">
        {stateProfil ? (
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={stateProfil}
            alt="profil utilisateur"
          />
        ) : (
          <UserIcon
            className="h-8 w-8 rounded-full"
            style={{ color: primaryColor }}
            aria-hidden="true"
          />
        )}
        <div className="ml-3">
          <h2 className="font-bold text-lg" style={{ color: secondaryColor }}>
            {stateName}
          </h2>
          <h3 className="font-light text-xs">Conseiller {stateEntreprise}</h3>
        </div>
      </div>
      <div>
        <h1 className="text-3xl lg:w-11/12 mt-10 lg:mt-0">
          Estimez votre bien en ligne{" "}
          <span className="font-bold" style={{ color: secondaryColor }}>
            gratuitement
          </span>
          .
        </h1>
        <ul className="mt-10">
          {avantages.map((avantage, index) => (
            <li className="flex items-center mb-1.5" key={index}>
              {avantage.icon}
              <p className="ml-3 font-light text-[10px]">{avantage.title}</p>
            </li>
          ))}
        </ul>
      </div>
      <p className="text-normal w-11/12 mt-10 lg:mt-0">{stateDescription}</p>
      <p className="font-bold w-11/12 mb-10  mt-10 lg:mt-0">
        {stateDescription2}
      </p>
      <div className="">
        <a className="flex mb-2" href={`tel:${statePhone}`}>
          <PhoneIcon className="mr-3 w-5" />
          <p className="font-normal text-sm">{statePhone}</p>
        </a>
        <a className="flex" href={`mailto:${stateEmail}`}>
          <EnvelopeIcon className="mr-3 w-5" />
          <p className="font-normal text-sm">{stateEmail}</p>
        </a>
      </div>
      <div className="items-center  mt-5 lg:mt-0 lg:mb-0 mb-5 lg:flex hidden">
        <a
          className="font-light text-xs"
          style={{ color: secondaryColor }}
          href="#"
        >
          Paramètre et cookies
        </a>
        <div className="ml-3">|</div>
        <a
          className="font-light text-xs ml-3"
          style={{ color: secondaryColor }}
          href="#"
        >
          Signaler un abus
        </a>
      </div>
    </div>
  );
};

export default PresentationContainer;
