"use client";
import React, { useState, useEffect } from "react";
import {
  loginUser,
  observeAuthState,
  signInWithFacebook,
  signInWithGoogle,
} from "@/firebase/auth";
import InscriptionLayout from "@/components/layout/InscriptionLayout";
import Loader from "@/components/loader/Loader";
import Input from "@/components/ui/Input";
import { CheckBadgeIcon } from "@heroicons/react/20/solid";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const fonctionnality = [
  "Ajout d'une carte affichant l'emplacement du bien à estimer",
  "Personnalisation des couleur de votre page d'estimation",
  "Ajout d'un logo personnalisé",
];

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();

  const isEmailValid = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  useEffect(() => {
    observeAuthState((user) => {
      console.log(user);
    });
  }, []);

  const isPasswordValid = (password) => {
    return /.{8,}/.test(password);
  };

  useEffect(() => {
    observeAuthState((user) => {
      if (user !== null) {
        console.log(user);
        router.push("/dashboard");
      } else {
        null;
      }
    });
  }, []);

  useEffect(() => {
    if (isEmailValid(email) && isPasswordValid(password)) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await loginUser(email, password);
      console.log("User logged in:", user);
      // router.push("/dashboard");
      setLoading(false);
    } catch (error) {
      console.error("Error in handleLogin:", error);
      setError(error.message);
      setLoading(false);
    }
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
    <InscriptionLayout
      title="Connexion | Estimmea"
      description="Connexion | Estimmea"
    >
      <section className="w-full flex justify-between mt-16 lg:flex-row flex-col relative">
        <div className="py-5 hidden lg:flex flex-col w-5/12 h-full justify-between z-10">
          <h2 className="text-sm text-blue-500 font-sans sm:w-4/5">
            Connectez-vous à votre espace personnel et accédé à vos estimations
          </h2>
          <h1 className="text-6xl text-slate-700 font-semibold font-sans leading-tight">
            Nous sommes ravis de{" "}
            <span className="text-blue-500 font-bold">vous revoir</span>
          </h1>
          <h3 className="text-lg text-slate-400 font-bold font-sans">
            Proposez des estimations en ligne à vos prospects en quelques
            cliques
          </h3>
          <div className="w-12/12 bg-slate-200 h-0.5"></div>
          <h2 className="text-xl text-slate-700 font-bold font-sans">
            Nouvelles fonctionnalités :
          </h2>
          <ul>
            {fonctionnality.map((item, index) => (
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
            Connectez-vous
          </h2>
          <form onSubmit={handleSubmit} className="mt-5 w-full sm:w-5/6">
            <Input
              label="Email"
              type="email"
              name="email"
              placeholder="johndoe@exemple.com"
              logo="email"
              value={email}
              setValue={setEmail}
            />
            <Input
              label="Mot de passe"
              type="password"
              name="password"
              placeholder="*********"
              logo="password"
              value={password}
              setValue={setPassword}
              autocomplete="current-password"
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
              Se Connecter
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
              type="button"
              onClick={handleGoogleConnection}
              className="cursor-pointer flex items-center justify-center rounded-md px-3.5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 focus-visible:outline-slate-600 sm:w-4/6 my-5 mx-auto border border-slate-400"
            >
              <img
                src="/images/logos/google.png"
                alt="google"
                className="h-8 w-auto mr-3"
              />
              Connectez-vous avec Google
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
              Connectez-vous avec Facebook
            </button>
            <a
              href="/inscription"
              className="cursor-pointer text-sm font-semibold text-blue-500  sm:w-4/6 mx-auto mt-8"
            >
              S'inscrire
            </a>
          </div>
        </div>
      </section>
    </InscriptionLayout>
  );
};

export default Page;
