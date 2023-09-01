import React, { useState, useEffect } from "react";
import SelectedButton from "./SelectedButton";
// import HTMLArea from "../HTMLArea";
import { useSelector, useDispatch } from "react-redux";
import { updateUserDataSettings } from "../../firebase/dataManager";
import dynamic from "next/dynamic";

const HTMLArea = dynamic(() => import("../HTMLArea"), {
  ssr: false,
});
const PersonnalisationEstimation = () => {
  const dispatch = useDispatch();

  const [hasChanges, setHasChanges] = useState(false);

  const originalDescriptionOne = useSelector(
    (state) => state?.user?.settings?.description
  );

  const originalDescriptionTwo = useSelector(
    (state) => state?.user?.settings?.description2
  );

  const originalEntreprise =
    useSelector((state) => state?.user?.settings?.entreprise) || "";

  const originalSelected =
    useSelector((state) => state?.user?.settings?.contract) || "Mandataire";

  const [descriptionOne, setDescriptionOne] = useState(
    useSelector((state) => state?.user?.settings?.description)
  ); //user/settings/descritpion

  const [descriptionTwo, setDescriptionTwo] = useState(
    useSelector((state) => state?.user?.settings?.description2)
  ); //user/settings/descritpion2

  const [entreprise, setEntreprise] = useState(
    useSelector((state) => state?.user?.settings?.entreprise) || ""
  ); //user/settings/entreprise

  const [selected, setSelected] = useState(
    useSelector((state) => state?.user?.settings?.contract) || "Mandataire"
  ); //user/settings/contract

  const uid = useSelector((state) => state?.user?.uid);

  useEffect(() => {
    if (
      descriptionOne !== originalDescriptionOne ||
      descriptionTwo !== originalDescriptionTwo ||
      entreprise !== originalEntreprise ||
      selected !== originalSelected
    ) {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }, [
    descriptionOne,
    descriptionTwo,
    entreprise,
    selected,
    originalDescriptionOne,
    originalDescriptionTwo,
    originalEntreprise,
    originalSelected,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updates = {
      "settings/description": descriptionOne,
      "settings/description2": descriptionTwo,
      "settings/entreprise": entreprise,
      "settings/contract": selected,
    };

    await updateUserDataSettings(uid, updates);

    // Dispatchez l'action après la mise à jour de Firebase
    const userInformation = {
      description: descriptionOne,
      description2: descriptionTwo,
      entreprise: entreprise,
      contract: selected,
      // Si vous avez une image de profil à inclure
      // photoProfil: img  // Assurez-vous d'avoir défini "img" précédemment
    };

    dispatch({
      type: "UPDATE_SETTINGS",
      payload: userInformation,
    });
  };

  const handleCancel = () => {
    setDescriptionOne(originalDescriptionOne);
    setDescriptionTwo(originalDescriptionTwo);
    setEntreprise(originalEntreprise);
    setSelected(originalSelected);
  };

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

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm ring-1 ring-gray-700/5 rounded-md md:col-span-2"
      >
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
                  className="block flex-1 border-0 bg-transparent py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none pl-2"
                  placeholder="IAD, Safti, Capifrance, ..."
                  value={entreprise}
                  onChange={(e) => setEntreprise(e.target.value)}
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
                <SelectedButton value={selected} setValue={setSelected} />
              </div>
            </div>
          </div>
          <HTMLArea
            setDescription={setDescriptionOne}
            value={descriptionOne}
            max={150}
          />

          <HTMLArea
            setDescription={setDescriptionTwo}
            value={descriptionTwo}
            title="Modifier la seconde descritption"
            max={70}
          />
        </div>

        <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8  mt-5">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
            onClick={handleCancel} // Attachez la fonction ici
          >
            Annuler
          </button>
          <button
            type="submit"
            disabled={!hasChanges}
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm ${
              hasChanges ? "bg-blue-700" : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonnalisationEstimation;
