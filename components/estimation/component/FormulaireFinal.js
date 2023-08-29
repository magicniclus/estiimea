import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useSelector, useDispatch } from "react-redux";

const FormulaireFinal = () => {
  const namePattern = /^[a-zA-Z]{2,}$/;

  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const [firstName, setFirstName] = useState(""); // <- state pour le prénom
  const [lastName, setLastName] = useState(""); // <- state pour le nom
  const [email, setEmail] = useState(""); // <- state pour l'email
  const [phone, setPhone] = useState(""); // <- state pour le téléphone

  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const clientInfomation = useSelector(
    (state) => state?.clientInformation?.settings
  );

  const dispatch = useDispatch();

  const validateFields = () => {
    let isValid = true;
    let tempErrors = {};

    // Utilisation des valeurs des states pour la validation
    if (!firstName || !namePattern.test(firstName)) {
      isValid = false;
      tempErrors.firstName = !firstName
        ? "Le prénom est requis."
        : "Le prénom est invalide.";
    }

    if (!lastName || !namePattern.test(lastName)) {
      isValid = false;
      tempErrors.lastName = !lastName
        ? "Le nom est requis."
        : "Le nom est invalide.";
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      isValid = false;
      tempErrors.email = "L'adresse e-mail est invalide.";
    }

    const phonePattern = /^(0[1-9])(?:[ _.-]?(\d{2})){4}$/;
    if (!phonePattern.test(phone)) {
      isValid = false;
      tempErrors.phone = "Le numéro de téléphone est invalide.";
    }

    if (!isChecked) {
      isValid = false;
      tempErrors.gdpr = "Veuillez accepter les conditions GDPR.";
    }

    setErrors(tempErrors);
    return isValid;
  };

  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  const currentSlug = pathSegments[1];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: {
          firstName,
          lastName,
          email,
          phone,
        },
      });
      router.push(`/${currentSlug}/estimation/resultat`);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST" className="w-full">
      <div className="lg:mt-5 mt-10 mx-auto max-w-xl lg:mr-0 lg:max-w-lg">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="first-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Nom
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className={`w-full px-4 py-3 rounded-md font-light text-sm border ${
                  errors.firstName ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="last-name"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Prénom
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className={`w-full px-4 py-3 rounded-md font-light text-sm border ${
                  errors.lastName ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="email"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                className={`w-full px-4 py-3 rounded-md font-light text-sm border ${
                  errors.email ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Téléphone
            </label>
            <div className="mt-2.5">
              <input
                type="tel"
                name="phone-number"
                id="phone-number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                className={`w-full px-4 py-3 rounded-md font-light text-sm border ${
                  errors.phone ? "border-red-400" : "border-gray-200"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex lg:justify-between lg:flex-row flex-col">
          {" "}
          <div className="mt-6 lg:mt-0 lg:mb-0 mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
              />
              <span
                className="ml-2 text-xs lg:w-4/6"
                style={{ color: primaryColor }}
              >
                J'accepte les{" "}
                <a href="/path-to-gdpr" className="underline">
                  termes et conditions GDPR
                </a>
                .
              </span>
            </label>
            {errors.gdpr && (
              <p className="text-red-500 text-xs">{errors.gdpr}</p>
            )}
          </div>
          <button
            type="submit"
            className="rounded-md px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 max-w-[170px] w-full"
            style={{ backgroundColor: secondaryColor }}
          >
            Voir mon estiamtion
          </button>
        </div>
      </div>
    </form>
  );
};

export default FormulaireFinal;
