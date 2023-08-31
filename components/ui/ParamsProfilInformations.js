import React, { useState, useRef, useEffect } from "react";
import { CheckIcon, PhotoIcon, XMarkIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import {
  addSlug,
  deletePrevSlug,
  slugExists,
  updateUserData,
} from "../../firebase/dataManager";
import { uploadImage } from "../../firebase/storageManager";
import LittleLoader from "../loader/LittleLoader";
import { useRouter } from "next/router";

const ParamsProfilInformations = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isValidEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
  };

  const isValidPhone = (phone) => {
    const regex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return regex.test(phone);
  };

  // Ces déclarations sont fictives, vous devrez les remplacer ou les obtenir correctement.
  const uid = useSelector((state) => state.user.uid);
  const userInformation = useSelector((state) => state.user.userInformation);

  const slug = useSelector((state) => state.user.settings.slug);
  const [phone, setPhone] = useState(
    useSelector((state) => state.user.userInformation.phone)
  );
  const stateEmail = useSelector(
    (state) => state?.user?.userInformation?.email
  );
  const stateEmailVisible = useSelector(
    (state) => state?.user?.userInformation?.emailVisible
  );

  const [email, setEmail] = useState(stateEmailVisible || stateEmail);

  const photoProfile = useSelector(
    (state) => state.user?.userInformation?.photoProfil
  );
  const [disabled, setDisabled] = useState(true);

  const [message, setMessage] = useState("");
  const [inputValue, setInputValue] = useState(slug);
  const [timeoutId, setTimeoutId] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [loaderSlug, setLoaderSlug] = useState(false);
  const [slugExistsState, setSlugExistsState] = useState(false);
  const [showIcon, setShowIcon] = useState(false);

  const inputFileRef = useRef();

  useEffect(() => {
    if (
      isValidEmail(email) &&
      isValidPhone(phone) &&
      slugExistsState === false
    ) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [phone, email, slugExistsState]);

  const handleSlugChange = async (value) => {
    setLoaderSlug(true);

    // Si la valeur saisie est égale au slug initial
    if (value === slug) {
      setLoaderSlug(false);
      setSlugExistsState(false);
      setMessage(""); // Vous pouvez également réinitialiser le message
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const id = setTimeout(async () => {
      console.log("Checking slug:", value);
      const exists = await slugExists(value);
      if (exists) {
        setMessage("Ce slug existe déjà");
        console.log("Slug exists");
        setLoaderSlug(false);
        setSlugExistsState(true);
      } else {
        setMessage("Ce slug est disponible");
        console.log("Slug available");
        setLoaderSlug(false);
        setSlugExistsState(false);
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Créer les chemins et les données à mettre à jour
    const slugUpdate = { [`settings/slug`]: inputValue };
    const phoneUpdate = { [`userInformation/phone`]: phone };
    const emailUpdate = { [`userInformation/emailVisible`]: email };

    try {
      // Mettre à jour le slug
      await updateUserData(uid, slugUpdate);

      // Mettre à jour le numéro de téléphone
      await updateUserData(uid, phoneUpdate);

      // Mettre à jour l'email
      await updateUserData(uid, emailUpdate);

      // Mettre à jour Redux
      // À ce stade, vous pouvez combiner toutes les mises à jour en une seule pour Redux, si nécessaire.
      const combinedUpdate = {
        setting: { slug: inputValue },
        userInformation: { phoneVisible: phone, email },
      };
      dispatch({ type: UPDATE_USER_DATA, payload: combinedUpdate });
    } catch (error) {
      console.error(
        "Erreur lors de la mise à jour des données utilisateur: ",
        error
      );
    }
    deletePrevSlug(slug);
    addSlug(inputValue, uid);
    window.location.href = `/${inputValue}/dashboard/personnalisation`;
  };

  const handleCancel = () => {
    // Réinitialiser les valeurs avec les valeurs initiales.
    setInputValue(slug);
    setPhone(userInformation.phone);
    setEmail(userInformation.email);
    // Si vous avez d'autres champs, réinitialisez-les ici.
  };

  useEffect(() => {
    // Si loaderSlug est vrai, alors on montre l'icône et on déclenche le timer
    if (loaderSlug) {
      setShowIcon(true);
      const timeout = setTimeout(() => {
        setShowIcon(false); // masquer l'icône après 2 secondes
      }, 2000);

      // Cleanup effect si le composant est démonté avant que le délai ne se termine
      return () => clearTimeout(timeout);
    }
  }, [loaderSlug]);

  useEffect(() => {
    if (showIcon === true) {
      setTimeout(() => {
        setShowIcon(false);
      }, 2000);
    }
  }, [showIcon]);

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

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-sm ring-1 ring-gray-700/5 rounded-md md:col-span-2"
      >
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
                    https://estimmea.com/
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
                  {slugExistsState === true ? (
                    <XMarkIcon className="h-5 w-5 text-red-500 my-auto mr-3" />
                  ) : null}
                  {showIcon ? (
                    <CheckIcon className="h-5 w-5 text-green-500 my-auto mr-3" />
                  ) : null}
                  {
                    // Affichez un spinner de chargement si le slug est en cours de vérification
                    loaderSlug && (
                      <div className=" my-auto mr-3 h-5 w-5">
                        <LittleLoader />
                      </div>
                    )
                  }
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
                    onChange={(e) => {
                      setPhone(e.target.value);
                    }}
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
                Email{" "}
                <span className="font-light">
                  (c'est l'adresse mail visible sur votre page d'estimation)
                </span>
                :
              </label>
              <div className="mt-2">
                <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 sm:max-w-md outline-none">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="block flex-1 border-0 bg-transparent py-1.5 text-gray-700 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 outline-none pl-2"
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
                  dragging ? "border-blue-700" : "border-gray-700/25"
                }`}
              >
                <div className="text-center">
                  {photoProfile ? (
                    <img
                      src={photoProfile}
                      alt="Photo de profil"
                      className="mx-auto h-16 w-16 rounded-full object-cover"
                    />
                  ) : (
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                  )}
                  <div className="mt-4 flex text-sm leading-6 text-gray-600">
                    <label
                      htmlFor="file-upload"
                      onClick={handleFileClick}
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-700 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-blue-700"
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
                  {
                    //Si l'utilisateur télécharge une image, affichez son nom
                    photoProfile && (
                      <p className="truncate max-w-[250px] text-center text-xs mt-5  text-gray-600 object-contain">
                        {photoProfile}
                      </p>
                    )
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6 border-t border-gray-700/10 px-4 py-4 sm:px-8">
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Annuler
          </button>
          <button
            type="submit"
            className={`rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm bg-blue-700 ${
              !disabled
                ? " hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                : "opacity-50 cursor-not-allowed"
            } `}
            disabled={disabled}
          >
            Enregister
          </button>
        </div>
      </form>
    </div>
  );
};

export default ParamsProfilInformations;
