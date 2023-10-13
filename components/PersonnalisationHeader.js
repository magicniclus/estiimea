import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { ChromePicker } from "react-color";
import {
  CheckIcon,
  ComputerDesktopIcon,
  DevicePhoneMobileIcon,
  LinkIcon,
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
  const containWidth = useSelector((state) => state?.widthEstimationContainer);

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

  const [showCheckIcon, setShowCheckIcon] = useState(false);

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

  const copyToClipboard = async () => {
    try {
      const url = window.location.origin + "/" + currentSlug;
      await navigator.clipboard.writeText(url);
      console.log("Full URL copied to clipboard");

      // Afficher l'icône de vérification
      setShowCheckIcon(true);

      // Masquer l'icône de vérification après 2 secondes
      setTimeout(() => setShowCheckIcon(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL: ", err);
    }
  };

  const updateSize = (value) => {
    if (value === "computer") {
      dispatch({
        type: "UPDATE_WIDTH_ESTIMATION_CONTAINER",
        payload: "computer",
      });
    } else {
      dispatch({
        type: "UPDATE_WIDTH_ESTIMATION_CONTAINER",
        payload: "mobile",
      });
    }
  };

  return (
    <div className="w-full min-h-20 bg-slate-50 mb-5 rounded-md flex z-50 px-3 py-5 justify-between flex-col lg:flex-row lg:items-center">
      <div className="flex relative items-center">
        <h2 className="text-base font-semibold leading-7 text-gray-700 mr-5">
          Mes Couleurs:
        </h2>
        <div className="flex flex-col items-center justify-center mr-5">
          <button
            type="button"
            className="w-10 h-10 bg-slate- rounded-full border-2 border-gray-300 hover:scale-105"
            style={{ backgroundColor: selectedPrimaryColor }}
            onClick={() => setShowColorPickerPrimary(!showColorPickerPrimary)}
          ></button>
          {showColorPickerPrimary && (
            <div className="absolute">
              <ChromePicker
                color={selectedPrimaryColor}
                onChangeComplete={handlePrimaryColorChange}
              />
            </div>
          )}
          {showColorPickerPrimary && (
            <div className="absolute right-7 -top-20 flex flex-col">
              <button
                type="button"
                onClick={cancelPrimaryColor}
                className="bg-gray-50 rounded-full border border-gray-40 shadow-lg"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500 " />
              </button>
              <button
                type="button"
                onClick={savePrimaryColor}
                className="bg-gray-50 rounded-full border border-gray-40 shadow-lg mt-2"
              >
                <CheckIcon className="w-5 h-5 text-gray-500 " />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center">
          <button
            type="button"
            className="w-10 h-10 bg-slate- rounded-full border-2 border-gray-300  hover:scale-105"
            style={{ backgroundColor: selectedSecondaryColor }}
            onClick={() =>
              setShowColorPickerSecondary(!showColorPickerSecondary)
            }
          ></button>
          {showColorPickerSecondary && (
            <div className="absolute">
              <ChromePicker
                color={selectedSecondaryColor}
                onChangeComplete={handleSecondaryColorChange}
              />
            </div>
          )}
          {showColorPickerSecondary && (
            <div className="absolute -right-8 -top-20 flex flex-col">
              <button
                type="button"
                onClick={cancelSecondaryColor}
                className="bg-gray-50 rounded-full border border-gray-40 shadow-lg"
              >
                <XMarkIcon className="w-5 h-5 text-gray-500 " />
              </button>
              <button
                type="button"
                onClick={saveSecondaryColor}
                className="bg-gray-50 rounded-full border border-gray-40 shadow-lg mt-2"
              >
                <CheckIcon className="w-5 h-5 text-gray-500 " />
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-col items-center justify-center ml-5">
          <button
            type="button"
            className="rounded-md text-xs font-semibold text-gray-700 hover:scale-105 flex transition duration-200 items-center "
            onClick={() => resetColor()}
          >
            Default
          </button>
        </div>
      </div>
      <div className="lg:flex hidden items-center lg:mt-0 mt-5">
        <div
          onClick={() => updateSize("computer")}
          className={`w-10 h-10 flex justify-center items-center ${
            containWidth === "computer"
              ? "bg-blue-500 border-gray-300 border-2"
              : "bg-gray-300"
          } rounded-full cursor-pointer mr-5 hover:shadow-md transition-all duration-300 ease-in-out`}
        >
          <ComputerDesktopIcon
            className={`w-5 h-5 ${
              containWidth === "computer" ? "text-white" : "text-gray-700"
            }`}
          />
        </div>
        <div
          onClick={() => updateSize("mobile")}
          className={`w-10 h-10 flex justify-center items-center ${
            containWidth !== "computer"
              ? "bg-blue-500 border-gray-300 border-2"
              : "bg-gray-300"
          } rounded-full cursor-pointer mr-5 hover:shadow-md transition-all duration-300 ease-in-out`}
        >
          <DevicePhoneMobileIcon
            className={`w-5 h-5 ${
              containWidth !== "computer" ? "text-white" : "text-gray-700"
            }`}
          />
        </div>
      </div>
      <div className="flex items-center lg:mt-0 mt-5">
        <button
          type="button"
          onClick={handleRouter}
          className="rounded-md bg-gray-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 flex transition duration-200"
        >
          Ma page
          <LinkIcon className="w-5 h-5 ml-2" />
        </button>
        <button
          type="button"
          onClick={copyToClipboard}
          className="rounded-md px-3 py-2 text-xs font-semibold text-gray-700 hover:scale-105 flex transition duration-200 items-center ml-3"
        >
          Copier
          {showCheckIcon && (
            <CheckIcon className="h-4 w-4 text-gray-700 ml-1" />
          )}
        </button>
      </div>
    </div>
  );
};

export default PersonnalisationHeader;
