import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ChromePicker } from "react-color";
import {
  CheckIcon,
  LinkIcon,
  LockClosedIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { updateUserData } from "../firebase/dataManager";

const PersonnalisationHeader = (props) => {
  const dispatch = useDispatch();

  const primaryColor =
    useSelector((state) => state?.user?.settings?.fontColor) || "#000000"; // Fallback color
  const secondaryColor =
    useSelector((state) => state?.user?.settings?.fontColor2) || "#000000"; // Fallback color
  const uid = useSelector((state) => state?.user?.uid);
  const settings = useSelector((state) => state?.user?.settings);

  const [showColorPickerPrimary, setShowColorPickerPrimary] = useState(false);
  const [showColorPickerSecondary, setShowColorPickerSecondary] =
    useState(false);
  const [selectedPrimaryColor, setSelectedPrimaryColor] =
    useState(primaryColor);
  const [selectedSecondaryColor, setSelectedSecondaryColor] =
    useState(secondaryColor);

  const [initialPrimaryColor, setInitialPrimaryColor] = useState(primaryColor);
  const [initialSecondaryColor, setInitialSecondaryColor] =
    useState(secondaryColor);

  useEffect(() => {
    console.log(selectedPrimaryColor);
  }, [selectedPrimaryColor]);

  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  const currentSlug = pathSegments[1];

  const resetColor = () => {
    setSelectedPrimaryColor("#374151");
    setSelectedSecondaryColor("#3B82F6");
    updateUserData(uid, {
      settings: { ...settings, fontColor: "#374151", fontColor2: "#3B82F6" },
    }).then(() => {
      dispatch({
        type: "UPDATE_FONT_COLOR",
        payload: { fontColor: "#374151" }, // Notez que le payload a changé ici
      });
      dispatch({
        type: "UPDATE_FONT_COLOR2",
        payload: { fontColor2: "#3B82F6" }, // Notez que le payload a changé ici
      });
    });
  };

  const handlePrimaryColorChange = (color) => {
    setSelectedPrimaryColor(color.hex);
  };

  const savePrimaryColor = () => {
    const updates = { fontColor: selectedPrimaryColor };
    updateUserData(uid, {
      settings: { ...settings, fontColor: updates.fontColor },
    })
      .then(() => {
        dispatch({ type: "UPDATE_FONT_COLOR", payload: updates });
        setShowColorPickerPrimary(false);
      })
      .catch((error) => {
        alert(
          "Une erreur est survenue lors de la mise à jour de la couleur primaire."
        );
      });
  };

  const cancelPrimaryColor = () => {
    setSelectedPrimaryColor(initialPrimaryColor);
    setShowColorPickerPrimary(false);
  };

  const handleSecondaryColorChange = (color) => {
    setSelectedSecondaryColor(color.hex);
  };

  const saveSecondaryColor = () => {
    const updates = { fontColor2: selectedSecondaryColor };
    updateUserData(uid, {
      settings: { ...settings, fontColor2: updates.fontColor2 },
    })
      .then(() => {
        dispatch({ type: "UPDATE_FONT_COLOR2", payload: updates });
        setShowColorPickerSecondary(false);
      })
      .catch((error) => {
        alert(
          "Une erreur est survenue lors de la mise à jour de la couleur secondaire."
        );
      });
  };

  const cancelSecondaryColor = () => {
    setSelectedSecondaryColor(initialSecondaryColor);
    setShowColorPickerSecondary(false);
  };

  const handleRouter = () => {
    const url = "/" + currentSlug;
    window.open(url, "_blank");
  };

  return (
    <div className="w-full h-20 bg-slate-50 mb-5 rounded-md flex z-50 px-3 justify-between">
      <div className="flex">
        <div className="flex flex-col items-center justify-center mr-5 relative">
          <button
            type="button"
            className="w-10 h-10 bg-slate- rounded-full border-2 border-gray-300"
            style={{ backgroundColor: selectedPrimaryColor }}
            onClick={() => setShowColorPickerPrimary(!showColorPickerPrimary)}
          ></button>
          {showColorPickerPrimary && (
            <ChromePicker
              color={selectedPrimaryColor}
              onChangeComplete={handlePrimaryColorChange}
            />
          )}
          {showColorPickerPrimary && (
            <div>
              <button
                type="button"
                onClick={cancelPrimaryColor}
                className="bg-gray-50 rounded-full border border-gray-40 absolute -top-20 -right-8 shadow-lg"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500 " />
              </button>
              <button
                type="button"
                onClick={savePrimaryColor}
                className="bg-gray-50 rounded-full border border-gray-40 absolute -top-12 -right-8 shadow-lg"
              >
                <CheckIcon className="w-5 h-5 text-gray-500 " />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center relative">
          <button
            type="button"
            className="w-10 h-10 bg-slate- rounded-full border-2 border-gray-300"
            style={{ backgroundColor: selectedSecondaryColor }}
            onClick={() =>
              setShowColorPickerSecondary(!showColorPickerSecondary)
            }
          ></button>
          {showColorPickerSecondary && (
            <ChromePicker
              color={selectedSecondaryColor}
              onChangeComplete={handleSecondaryColorChange}
            />
          )}
          {showColorPickerSecondary && (
            <div className="flex flex-col">
              <button
                type="button"
                onClick={cancelSecondaryColor}
                className="bg-gray-50 rounded-full border border-gray-40 absolute -top-20 -right-8 shadow-lg"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500 " />
              </button>
              <button
                type="button"
                onClick={saveSecondaryColor}
                className="bg-gray-50 rounded-full border border-gray-40 absolute -top-12 -right-8 shadow-lg"
              >
                <CheckIcon className="w-5 h-5 text-gray-500 " />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center ml-5">
          <button
            type="button"
            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            onClick={() => resetColor()}
          >
            Default
          </button>
        </div>
      </div>
      <div className="flex items-center">
        <button
          type="button"
          onClick={handleRouter}
          className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 flex transition duration-200"
        >
          Mon lien
          <LinkIcon className="w-5 h-5 ml-2" />
        </button>
      </div>
    </div>
  );
};

export default PersonnalisationHeader;
