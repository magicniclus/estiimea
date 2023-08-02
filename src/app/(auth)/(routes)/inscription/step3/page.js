"use client";
import React, { useEffect } from "react";
import { sendVerificationEmail } from "@/firebase/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/navigation";
import InscriptionLayout from "@/components/layout/InscriptionLayout";

const Page = () => {
  const router = useRouter();
  const auth = getAuth();

  useEffect(() => {
    if (!auth.currentUser) {
      router.push("/inscription/");
    }
  });

  useEffect(() => {
    if (auth.currentUser) {
      sendVerificationEmail();
    }
  }, []);

  useEffect(() => {
    console.log(auth.currentUser?.emailVerified);
  }, [auth.currentUser?.emailVerified, router]);

  return (
    <InscriptionLayout>
      <section className="w-full h-full min-h-[calc(100vh-80px)] flex justify-center items-center flex-col ">
        <h1 className="lg:w-6/12 w-full text-center text-2xl sm:text-4xl text-slate-700 font-semibold font-sans">
          Verification d'email
        </h1>
        <p className="lg:w-6/12 w-full text-center mt-5">
          Nous venons de vous envoyer un email de verification d'email, veuillez
          cliquer sur le lien pour confirmer votre email et acceder à votre
          compte.
        </p>
        <p className="lg:w-6/12 w-full text-center mt-5">
          Une fois l'email validé vous pouvez vous connecter à votre compte.
        </p>
        <a
          href="/connexion"
          className="cursor-pointer text-center text-sm font-semibold text-blue-500  sm:w-4/6 mt-8"
        >
          Connexion
        </a>
      </section>
    </InscriptionLayout>
  );
};

export default Page;
