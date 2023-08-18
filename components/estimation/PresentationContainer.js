import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";
import { UserIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useSelector } from "react-redux";

const PresentationContainer = () => {
  const stateTitle = useSelector((state) => state?.user?.settings?.title);
  const stateDescription = useSelector(
    (state) => state?.user?.settings?.description
  );
  const stateDescription2 = useSelector(
    (state) => state?.user?.settings?.description2
  );
  const stateBackgroundColor = useSelector(
    (state) => state?.user?.settings?.backgroundColor
  );
  const stateFontColor = useSelector(
    (state) => state?.user?.settings?.fontColor
  );
  const stateFontColor2 = useSelector(
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

  return (
    <div
      className=" h-full w-5/12 flex flex-col justify-between min-h-[600px]"
      style={{ color: stateFontColor }}
    >
      <div>
        <div className="flex">
          {stateProfil ? (
            <img
              className="h-12 w-12 rounded-full object-cover"
              src={stateProfil}
              alt="profil utilisateur"
            />
          ) : (
            <UserIcon
              className="h-8 w-8 rounded-full text-gray-700"
              aria-hidden="true"
            />
          )}
          <div className="ml-3">
            <h2
              className="font-bold text-lg"
              style={{ color: stateFontColor2 }}
            >
              {stateName}
            </h2>
            <h3 className="font-light text-xs">Conseiller {stateEntreprise}</h3>
          </div>
        </div>
      </div>
      <h1 className="text-4xl w-5/6">
        Estimez votre bien en ligne{" "}
        <span className="font-bold" style={{ color: stateFontColor2 }}>
          gratuitement
        </span>
        .
      </h1>
      <p className="text-normal w-5/6">{stateDescription}</p>
      <p className="font-bold w-5/6 mb-5">{stateDescription2}</p>
      <div>
        <a className="flex mb-2" href={`tel:${statePhone}`}>
          <PhoneIcon className="mr-3 w-5" />
          <p className="font-normal text-sm">{statePhone}</p>
        </a>
        <a className="flex" href={`mailto:${stateEmail}`}>
          <EnvelopeIcon className="mr-3 w-5" />
          <p className="font-normal text-sm">{stateEmail}</p>
        </a>
      </div>
      <div className="flex items-center">
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
  );
};

export default PresentationContainer;
