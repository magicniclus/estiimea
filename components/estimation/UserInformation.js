import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserIcon } from "@heroicons/react/24/outline";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/20/solid";

const UserInformation = () => {
  const stateUser = useSelector((state) => state?.user?.userInformation);
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
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  return (
    <div>
      <div className="flex items-center">
        {stateProfil ? (
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={stateProfil}
            alt="profil utilisateur"
          />
        ) : (
          <UserIcon
            className="h-8 w-8 rounded-full"
            aria-hidden="true"
            style={{ color: primaryColor }}
          />
        )}
        <div className="ml-3">
          <h2 className="font-bold text-lg" style={{ color: secondaryColor }}>
            {stateName}
          </h2>
          <h3 className="font-light text-xs">Conseiller {stateEntreprise}</h3>
          <div className="flex items-center mt-1">
            <a
              className="flex flex-row"
              style={{ color: primaryColor }}
              href={`tel:${statePhone}`}
            >
              <PhoneIcon className="mr-5 w-5" />
            </a>
            <a
              className="flex"
              style={{ color: primaryColor }}
              href={`mailto:${stateEmail}`}
            >
              <EnvelopeIcon className="w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInformation;
