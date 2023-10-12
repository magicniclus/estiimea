import React, { useState, useEffect } from "react";

const ParamsTraker = () => {
  const [hasChanges, setHasChanges] = useState(false);
  const [googleTracker, setGoogleTracker] = useState("");
  const [facebookTracker, setFacebookTracker] = useState("");
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Suivi de conversion
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Afin de pouvoir suivre les conversions de vos clients, vous devez
          insérer le code Google Ads et/ou Meta dans le champ ci-dessous.
        </p>
      </div>
      <form className="bg-white shadow-sm ring-1 ring-gray-700/5 rounded-md md:col-span-2 ">
        <div className=" px-4 py-6 sm:p-8">
          <div className="sm:col-span-4 ">
            <label
              htmlFor="website"
              className="text-sm leading-6 text-gray-700 flex"
            >
              <img
                src="/images/logos/google.png"
                className="w-5 h-auto object-contain mr-2"
              />
              Code Balise Google Ads:
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md outline-none">
                <input
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none pl-2"
                  placeholder="AW-XXXXXXXXXXX"
                  value={googleTracker}
                  onChange={(e) => setGoogleTracker(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4 mt-5">
            <label
              htmlFor="website"
              className="flex text-sm leading-6 text-gray-700"
            >
              <img
                src="/images/logos/facebook.png"
                className="w-5 h-auto object-contain mr-2"
              />
              Id Pixel Meta:
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md outline-none">
                <input
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none pl-2"
                  placeholder="XXXXXXXXXXXXXXXX"
                  value={facebookTracker}
                  onChange={(e) => setFacebookTracker(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8  mt-5">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            // onClick={handleCancel} // Attachez la fonction ici
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={!hasChanges}
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
              hasChanges ? "bg-blue-700" : "bg-blue-700/50 cursor-not-allowed"
            }`}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParamsTraker;
