import React, { useState, useRef } from "react";
import { PhotoIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { slugExists, updateUserData } from "../../firebase/dataManager";
import { uploadImage } from "../../firebase/storageManager";

const ParamsProfilInformations = () => {
  const dispatch = useDispatch();

  // Ces déclarations sont fictives, vous devrez les remplacer ou les obtenir correctement.
  const uid = "";
  const userInformation = useSelector((state) => state.user.userInformation);

  const slug = useSelector((state) => state.user.settings.slug);
  const phone = useSelector((state) => state.user.userInformation.phone);
  const email = useSelector((state) => state.user.userInformation.email);

  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState(slug);
  const [timeoutId, setTimeoutId] = useState(null);
  const [dragging, setDragging] = useState(false);

  const inputFileRef = useRef();

  const handleSlugChange = async (value) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(async () => {
      console.log("Checking slug:", value);
      const exists = await slugExists(value);
      if (exists) {
        setMessage("Ce slug existe déjà");
        console.log("Slug exists");
      } else {
        setMessage("Ce slug est disponible");
        console.log("Slug available");
      }
    }, 1000);

    setTimeoutId(id);
  };

  const isValidInput = (value) => {
    const regex = /^[a-zA-Z0-9-_]*$/;
    return regex.test(value);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    let files = e.dataTransfer.files;

    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFile = (file) => {
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);

      if (fileSizeMB > 10) {
        alert(
          "Le fichier est trop volumineux. Veuillez télécharger une image de moins de 10MB."
        );
        return;
      }

      // Puisque nous déclenchons la manipulation des fichiers à la fois par glisser-déposer et par sélection,
      // il est judicieux de déplacer la logique dans une fonction séparée
      uploadAndSetImage(file);
    }
  };

  const uploadAndSetImage = (file) => {
    dispatch({ type: "SET_USER_LOADING", payload: true });

    uploadImage(uid, file)
      .then((img) => {
        updateUserData(uid, {
          userInformation: { ...userInformation, photoProfil: img },
        });
        dispatch({
          type: "UPDATE_USER_INFORMATION",
          payload: { ...userInformation, photoProfil: img },
        });
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        dispatch({ type: "SET_USER_LOADING", payload: false });
      });
  };

  const onFileChange = (e) => {
    handleFile(e.target.files[0]);
  };

  const handleFileClick = () => {
    inputFileRef.current.click();
  };

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-8 md:grid-cols-3">
      <div className="px-4 sm:px-0">
        <h2 className="text-base font-semibold leading-7 text-gray-700">
          Profil
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          Personnalisez vos informations personnelles qui apparaîtront sur votre
          page.
        </p>
      </div>

      <form className="bg-white shadow-sm ring-1 ring-gray-700/5 rounded-md md:col-span-2">
        <div className="px-4 py-6 sm:p-8">
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="website"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                URL de votre page
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md outline-none">
                  <span className="flex select-none items-center font-light pl-3 text-gray-500 sm:text-sm">
                    http://estimmea.com/
                  </span>
                  <input
                    type="text"
                    name="website"
                    id="website"
                    value={inputValue}
                    onChange={(e) => {
                      if (isValidInput(e.target.value)) {
                        setInputValue(e.target.value);
                        handleSlugChange(e.target.value);
                      }
                    }}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none"
                    placeholder="example"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5">
            <div className="sm:col-span-4">
              <label
                htmlFor="website"
                className="block text-sm leading-6 text-gray-900"
              >
                Téléphone:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md outline-none">
                  <input
                    type="tel"
                    name="phone-number"
                    id="phone-number"
                    value={phone}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none ml-2"
                    placeholder="example"
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="website"
                className="block text-sm leading-6 text-gray-700"
              >
                Email:
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md outline-none">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none ml-2"
                    placeholder="example"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="cover-photo"
                className="block text-sm font-medium leading-6 text-gray-700"
              >
                Photo de profil
              </label>
              <div
                onDragOver={(e) => e.preventDefault()}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={`mt-2 flex justify-center rounded-lg border border-dashed px-6 py-10 transition-transform transform duration-300 ${
                  dragging ? "border-blue-700 scale-105" : "border-gray-700/25"
                }`}
              >
                <div className="text-center">
                  <PhotoIcon
                    className="mx-auto h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      onClick={handleFileClick}
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                    >
                      <span>Télécharger votre fichier</span>
                      <input
                        id="file-upload"
                        type="file"
                        ref={inputFileRef}
                        accept=".jpg,.jpeg,.png"
                        style={{ display: "none" }}
                        onChange={onFileChange}
                      />
                    </label>
                    <p className="pl-1">glisser déposer</p>
                  </div>
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF max 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-700/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParamsProfilInformations;
