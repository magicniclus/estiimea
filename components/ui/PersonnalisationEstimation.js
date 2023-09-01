import React, { useState } from "react";
import SelectedButton from "./SelectedButton";
import TextArea from "./TextArea";
import HTMLArea from "../HTMLArea";
import { useSelector } from "react-redux";

const PersonnalisationEstimation = () => {
  const [descriptionOne, setDescriptionOne] = useState(
    useSelector((state) => state?.user?.settings?.description)
  );

  const [descriptionTwo, setDescriptionTwo] = useState(
    useSelector((state) => state?.user?.settings?.description2)
  );
  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-900">
          Personnalisation du contenu
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Personnalisez votre contenu afin d'adapter au mieux votre message à
          vos prospects.
        </p>
      </div>

      <form className="bg-white shadow-sm ring-1 ring-gray-700/5 rounded-md md:col-span-2">
        <div className=" px-4 py-6 sm:p-8">
          <div className="sm:col-span-4 ">
            <label
              htmlFor="website"
              className="block text-sm leading-6 text-gray-700"
            >
              Pour quel entreprise travaillez vous ?
            </label>
            <div className="mt-2">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md outline-none">
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none pl-2"
                  placeholder="IAD, Safti, Capifrance, ..."
                />
              </div>
            </div>
          </div>
          <div className="sm:col-span-4 mt-5">
            <label
              htmlFor="website"
              className="block text-sm leading-6 text-gray-700"
            >
              Vous êtes :
            </label>
            <div className="mt-2">
              <div className="w-full rounded-md outline-none">
                <SelectedButton />
              </div>
            </div>
          </div>
          <HTMLArea
            onChange={(content) => {
              setDescriptionOne(content); // ou toute autre logique que vous souhaitez implémenter
            }}
            value={descriptionOne}
            max={150}
          />

          <HTMLArea
            onChange={(content) => {
              setDescriptionTwo(content); // ou toute autre logique que vous souhaitez implémenter
            }}
            value={descriptionTwo}
            title="Modifier la seconde descritption"
            max={70}
          />
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8  mt-5">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-blue-700 "
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonnalisationEstimation;
