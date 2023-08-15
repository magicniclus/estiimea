"use client";
import InscriptionLayout from "../../../components/layout/InscriptionLayout";
import Input from "../../../components/ui/Input";
import { cn } from "../../../lib/utils";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Loader from "../../../components/loader/Loader";
import {
  loginUser,
  observeAuthState,
  registerUser,
} from "../../../firebase/auth";
import { createNewUser } from "../../../firebase/dataManager";

const Page = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [loading, setLoading] = useState(true);

  const stateEmail = useSelector((state) => state.user?.email);
  const stateFirstName = useSelector((state) => state.user?.firstName);
  const stateLastName = useSelector((state) => state.user?.lastName);

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

  const router = useRouter();

  const validatePassword = () => {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    if (!password.match(regex)) {
      setPasswordError(
        "Le mot de passe doit comporter au moins 8 caractères, des lettres et des chiffres."
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const validateConfirmPassword = () => {
    if (password !== confirmPassword) {
      setConfirmPasswordError("Les mots de passe ne correspondent pas.");
      return false;
    } else {
      setConfirmPasswordError("");
      return true;
    }
  };

  useEffect(() => {
    if (!stateEmail) {
      router.push("/inscription/");
    } else setLoading(false);
  }, [stateEmail]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Valider le mot de passe et la confirmation
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();

    // Ne pas procéder si les mots de passe ne sont pas valides
    if (!isPasswordValid || !isConfirmPasswordValid) {
      setLoading(false);
      return;
    }

    // Sinon, continuer avec la soumission
    loginUser(stateEmail, password)
      .then((res) => {
        console.log(res);
        registerUser(
          stateEmail,
          password,
          password,
          stateFirstName,
          stateLastName
        )
          .then((res) => {
            createNewUser(res.uid, stateEmail, stateFirstName, stateLastName);
            router.push("/inscription/step3");
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => {
            setLoading(false);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const isFormValid = password === confirmPassword;
    setDisabled(!isFormValid);
  }, [password, confirmPassword]);

  const LoaderWrapper = () => {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-white z-50 bg-opacity-40">
        <Loader />
      </div>
    );
  };

  return (
    <InscriptionLayout>
      <section className="w-full h-full min-h-[calc(100vh-80px)] flex justify-center items-center">
        <div className="flex flex-col h-max items-center text-center border border-slate-100 rounded-lg p-10 shadow-lg z-10 relative">
          {loading ? <LoaderWrapper loading={loading} /> : null}
          <h1 className="text-2xl sm:text-4xl text-slate-700 font-semibold font-sans">
            Bienvenue {stateFirstName}
          </h1>
          <h3 className="text-slate-400 w-5/6">
            Saisissez votre mot de passe pour accéder à votre compte
          </h3>
          <form onSubmit={handleSubmit} className="mt-5 w-full sm:w-fit">
            <div className="flex flex-col">
              <Input
                label="Mot de passe"
                type="password"
                name="password"
                placeholder="*********"
                logo="password"
                value={password}
                setValue={setPassword}
              />
              <Input
                label="Confirmation de mot de passe"
                type="password"
                name="password"
                placeholder="*********"
                logo="password"
                value={confirmPassword}
                setValue={setConfirmPassword}
                autocomplete="current-password"
              />
            </div>
            <button
              type="submit"
              disabled={disabled}
              className={cn(
                "rounded-md px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 w-1/2 my-5 mx-auto",
                !disabled ? " bg-blue-500  hover:bg-blue-500" : "bg-blue-200"
              )}
            >
              Valider
            </button>
          </form>
        </div>
      </section>
    </InscriptionLayout>
  );
};

export default Page;
