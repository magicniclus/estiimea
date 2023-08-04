"use client";
import React, { useRef } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";
import { useSelector, useDispatch } from "react-redux";
import { uploadImage } from "@/firebase/storageManager";
import { update } from "firebase/database";
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

  return (
    <>
      <div className="px-4 sm:px-0">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Applicant Information
        </h3>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
          Personal details and application.
        </p>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Nom, prénom
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {(firstName || "Loading...") + " " + (lastName || "")}
              </span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Téléphone
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                {phoneNumber || typeof phoneNumber === "" ? "Loading..." : ""}
              </span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">{email || "Loading..."}</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Salary expectation
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">$120,000</span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              About
            </dt>
            <dd className="mt-1 flex text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <span className="flex-grow">
                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim
                incididunt cillum culpa consequat. Excepteur qui ipsum aliquip
                consequat sint. Sit id mollit nulla mollit nostrud in ea officia
                proident. Irure nostrud pariatur mollit ad adipisicing
                reprehenderit deserunt qui eu.
              </span>
              <span className="ml-4 flex-shrink-0">
                <button
                  type="button"
                  className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Update
                </button>
              </span>
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Attachments
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              <div>
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
                  Update
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
