"use client";
import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "@/firebase/storageManager";
import { updateUserData } from "@/firebase/dataManager";

const DisplayUserInformaitons = () => {
  const uid = useSelector((state) => state.user?.uid);
  const userInformation = useSelector((state) => state.user?.userInformation);
  const firstName = useSelector(
    (state) => state.user?.userInformation?.firstName
  );
  const lastName = useSelector(
    (state) => state.user?.userInformation?.lastName
  );
  const email = useSelector((state) => state.user?.userInformation?.email);
  const phoneNumber = useSelector(
    (state) => state.user?.userInformation?.phoneNumber
  );

  const photoProfile = useSelector(
    (state) => state.user?.userInformation?.photoProfil
  );

  const [editing, setEditing] = useState(false);
  const [editLastName, setEditLastName] = useState(lastName || "");
  const [editFirstName, setEditFirstName] = useState(firstName || "");
  const [editPhoneNumber, setEditPhoneNumber] = useState(phoneNumber || "");
  const [editEmail, setEditEmail] = useState(email || "");

  const dispatch = useDispatch();

  // Un ref pour le fichier d'entrée, nous en avons besoin pour ouvrir la boîte de dialogue du fichier.
  const inputFileRef = useRef();

  // Cette fonction est appelée lorsque l'utilisateur clique sur le bouton.
  const addImg = () => {
    // Ouverture de la boîte de dialogue du fichier.
    inputFileRef.current.click();
  };

  // Cette fonction est appelée lorsque l'utilisateur a sélectionné un fichier.
  const onFileChange = (event) => {
    dispatch({ type: "SET_USER_LOADING", payload: true });
    const file = event.target.files[0];
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

  const handleClick = async () => {
    dispatch({ type: "SET_USER_LOADING", payload: true });
    setEditing((editing) => !editing);

    try {
      await updateUserData(uid, {
        userInformation: {
          ...userInformation,
          firstName: editFirstName,
          lastName: editLastName,
        },
      });
      dispatch({
        type: "UPDATE_USER_INFORMATION",
        payload: {
          ...userInformation,
          firstName: editFirstName,
          lastName: editLastName,
        },
      });
    } catch (error) {
      console.error("Failed to update user data:", error);
    } finally {
      dispatch({ type: "SET_USER_LOADING", payload: false });
    }
  };

  const handlePhoneNumberClick = async () => {
    dispatch({ type: "SET_USER_LOADING", payload: true });
    setEditing((editing) => !editing);

    try {
      await updateUserData(uid, {
        userInformation: {
          ...userInformation,
          phoneNumber: editPhoneNumber,
        },
      });
      dispatch({
        type: "UPDATE_USER_INFORMATION",
        payload: {
          ...userInformation,
          phoneNumber: editPhoneNumber,
        },
      });
    } catch (error) {
      console.error("Failed to update user phone number:", error);
    } finally {
      dispatch({ type: "SET_USER_LOADING", payload: false });
    }
  };

  useEffect(() => {
    setEditFirstName(firstName || "Loading...");
    setEditLastName(lastName || "");
    setEditPhoneNumber(phoneNumber || "Aucun numero d'enregistré");
  }, [firstName, lastName, phoneNumber]);

  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Informations utilisateur
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Détail des informations de l'utilisateur
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Nom, prénom
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {editing ? (
                <div className="flex-grow flex">
                  <input
                    value={editFirstName}
                    onChange={(e) => setEditFirstName(e.target.value)}
                    className="mr-2 p-1 border rounded"
                    placeholder="Nom"
                  />
                  <input
                    value={editLastName}
                    onChange={(e) => setEditLastName(e.target.value)}
                    className="p-1 border rounded"
                    placeholder="Prénom"
                  />
                </div>
              ) : (
                <span className="flex-grow">
                  {editFirstName + " " + editLastName}
                </span>
              )}
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleClick}
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {editing ? "Ok" : "Modifier"}
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Téléphone
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {editing ? (
                <input
                  value={editPhoneNumber}
                  onChange={(e) => setEditPhoneNumber(e.target.value)}
                  className="flex-grow p-1 border rounded"
                  placeholder="Téléphone"
                />
              ) : (
                <span className="flex-grow">
                  {editPhoneNumber || "Loading..."}
                </span>
              )}
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  onClick={handlePhoneNumberClick}
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {editing ? "Ok" : "Modifier"}
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Adresse email
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{email || "Loading..."}</span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Photo de profil
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div className="flex items-end">
                {
                  //Si l'utilisateur télécharge une image, affichez son nom
                  photoProfile && (
                    <p className="truncate w-full">{photoProfile}</p>
                  )
                }
                <input
                  type="file"
                  ref={inputFileRef}
                  accept=".jpg,.jpeg,.png"
                  style={{ display: "none" }} // cacher l'élément d'entrée
                  onChange={onFileChange} // appeler onFileChange lorsque l'utilisateur a sélectionné un fichier
                />
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                  onClick={addImg}
                >
                  Modifier
                </button>
              </div>
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
};

export default DisplayUserInformaitons;
