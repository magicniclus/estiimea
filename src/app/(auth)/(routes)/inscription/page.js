"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "@/components/ui/Input";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import Loader from "@/components/loader/Loader";
import { useRouter } from "next/navigation";
import InscriptionLayout from "@/components/layout/InscriptionLayout";
import {
  observeAuthState,
  signInWithFacebook,
  signInWithGoogle,
} from "@/firebase/auth";

const offreStarter = [
  "Création d'un lien personnalisé vers votre page d'estimation",
  "Jusqu'à 3 estimations par mois",
  "S.A.V 7/7j",
];

const Page = () => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const stateEmail = useSelector((state) => state.user?.email);

  const router = useRouter();

  const [error, setError] = useState(null);

  const isNameValid = (name) => {
    return /^[a-zA-Z\s]{2,}$/.test(name);
  };

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    const isFormValid =
      isNameValid(firstName) && isNameValid(lastName) && isEmailValid(email);
    setDisabled(!isFormValid);
  }, [firstName, lastName, email]);

  useEffect(() => {
    observeAuthState((user) => {
      if (user) {
        console.log(user);
        router.push("/dashboard");
      } else {
        null;
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      dispatch({
        type: "SET_USER_NAME_AND_EMAIL",
        payload: { firstName, lastName, email },
      });
      setLoading(false);
    }, 1000);
    router.push("/inscription/step2");
  };

  const LoaderWrapper = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white z-50 bg-opacity-40">
        <Loader />
      </div>
    );
  };

  const handleGoogleConnection = () => {
    signInWithGoogle()
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFacebookConnection = () => {
    signInWithFacebook()
      .then(() => {
        router.push("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <InscriptionLayout>
        <section className="w-full flex justify-between mt-16 lg:flex-row flex-col relative">
          <div className="py-5 hidden lg:flex flex-col w-5/12 h-full justify-between z-10">
            <h2 className="text-sm text-blue-500 font-sans">
              ESSAYEZ ESTIMMEA GRATUITEMENT
            </h2>
            <h1 className="text-6xl text-slate-700 font-semibold font-sans leading-tight">
              Créez votre compte{" "}
              <span className="text-blue-500 font-bold">gratuitement</span>
            </h1>
            <h3 className="text-lg text-slate-400 font-bold font-sans">
              Proposez des estimations en ligne à vos prospects en quelques
              cliques
            </h3>
            <div className="w-12/12 bg-slate-200 h-0.5"></div>
            <h2 className="text-xl text-slate-700 font-bold font-sans">
              L'offre Starter comprend :
            </h2>
            <ul>
              {offreStarter.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-slate-400 font-sans mb-3"
                >
                  <CheckBadgeIcon className="h-7 w-7 text-blue-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-col h-max lg:w-6/12 items-center text-center border border-slate-100 rounded-lg p-10 shadow-lg z-10 relative">
            {loading ? <LoaderWrapper loading={loading} /> : null}
            <h2 className="text-2xl sm:text-4xl text-slate-700 font-semibold font-sans">
              Inscrivez-vous dès maintenant !
            </h2>
            <h3 className="text-slate-400">
              Aucune carte de crédit n'est requise.
            </h3>
            <form onSubmit={handleSubmit} className="mt-5 w-full sm:w-fit">
              <div className="flex sm:flex-row flex-col">
                <Input
                  label="Nom"
                  type="lastName"
                  name="lastName"
                  placeholder="Doe"
                  width="sm:w-1/2"
                  logo="name"
                  value={lastName}
                  setValue={setLastName}
                />
                <Input
                  label="Prenom"
                  type="firstName"
                  name="firstName"
                  placeholder="John"
                  width="sm:w-1/2"
                  logo="name"
                  value={firstName}
                  setValue={setFirstName}
                />
              </div>
              <Input
                label="Email"
                type="email"
                name="email"
                placeholder="johndoe@exemple.com"
                logo="email"
                value={email}
                setValue={setEmail}
              />
              {error && <p className="mb-3 text-red-500">{error}</p>}
              <button
                type="submit"
                disabled={disabled}
                className={cn(
                  "rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-1/2 my-5 mx-auto",
                  !disabled ? " bg-blue-500  hover:bg-blue-500" : "bg-blue-200"
                )}
              >
                S'inscrire
              </button>
            </form>
            <div className="relative w-full">
              <div className="absolute w-full h-0.5 bg-slate-200 left-0 top-1/2 transform -translate-y-1/2 z-0"></div>
              <p className="text-center text-slate-400 bg-white relative z-10 w-min mx-auto px-2">
                ou
              </p>
            </div>
            <div className="w-full flex flex-col">
              <button
                onClick={handleGoogleConnection}
                className="cursor-pointer flex items-center justify-center rounded-md px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-slate-600 sm:w-4/6 my-5 mx-auto border border-slate-400"
              >
                <img
                  src="/images/logos/google.png"
                  alt="google"
                  className="h-8 w-auto mr-3"
                />
                Inscrivez-vous avec Google
              </button>
              <button
                onClick={handleFacebookConnection}
                className="cursor-pointer flex items-center justify-center rounded-md px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-slate-600 sm:w-4/6 mx-auto border border-slate-400"
              >
                <img
                  src="/images/logos/facebook.png"
                  alt="google"
                  className="h-8 w-auto mr-3"
                />
                Inscrivez-vous avec Facebook
              </button>
              <a
                href="/connexion"
                className="cursor-pointer text-sm font-semibold text-blue-500  sm:w-4/6 mx-auto mt-8"
              >
                Connexion
              </a>
            </div>
          </div>
          <div className="py-5 flex flex-col w-full justify-between lg:hidden z-10">
            <h2 className="text-sm text-blue-500 font-sans my-5">
              ESSAYEZ ESTIIMEA GRATUITEMENT
            </h2>
            <h1 className="text-6xl text-slate-700 font-semibold font-sans leading-tight">
              Créez votre compte{" "}
              <span className="text-blue-500 font-bold">gratuitement</span>
            </h1>
            <h3 className="text-lg text-slate-400 font-bold font-sans my-5">
              Proposez des estimations en ligne à vos prospects en quelques
              cliques
            </h3>
            <div className="w-12/12 bg-slate-200 h-0.5  my-5"></div>
            <h2 className="text-xl text-slate-700 font-bold font-sans my-5">
              L'offre Starter comprend :
            </h2>
            <ul>
              {offreStarter.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center text-slate-400 font-sans mb-3"
                >
                  <CheckBadgeIcon className="min-w-[30px] w-7 text-blue-500 mr-2" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </InscriptionLayout>
    </>
  );
};

export default Page;
