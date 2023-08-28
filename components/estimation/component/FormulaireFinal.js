import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const FormulaireFinal = () => {
  const namePattern = /^[a-zA-Z]{2,}$/;

  const [isChecked, setIsChecked] = useState(false);
  const [errors, setErrors] = useState({});
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  const validateFields = () => {
    let isValid = true;
    let tempErrors = {};

    // Validate First Name (assuming at least 2 characters)
    // Validate First Name
    const firstNameValue = document.getElementById("first-name").value.trim();
    if (!firstNameValue || !namePattern.test(firstNameValue)) {
      isValid = false;
      tempErrors.firstName = !firstNameValue
        ? "Le prénom est requis."
        : "Le prénom est invalide.";
    }

    // Validate Last Name
    const lastNameValue = document.getElementById("last-name").value.trim();
    if (!lastNameValue || !namePattern.test(lastNameValue)) {
      isValid = false;
      tempErrors.lastName = !lastNameValue
        ? "Le nom est requis."
        : "Le nom est invalide.";
    }
    // Validate Email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(document.getElementById("email").value)) {
      isValid = false;
      tempErrors.email = "L'adresse e-mail est invalide.";
    }

    // Validate Phone (a basic example for FR)
    const phonePattern = /^(0[1-9])(?:[ _.-]?(\d{2})){4}$/;
    if (!phonePattern.test(document.getElementById("phone-number").value)) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      console.log("Form is valid, you can submit");
      // Handle your form submission logic here
    }
  };

  return (
    <form onSubmit={handleSubmit} method="POST" className="">
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
