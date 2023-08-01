"use client";
import React, { useState } from "react";
import { registerUser } from "@/firebase/auth";
import Input from "@/components/ui/input";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
    } else {
      const user = await registerUser(email, password, confirmPassword);
      if (!user) {
        setError("Erreur lors de la création du compte");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col w-full">
      <h1 className="lg:text-6xl font-sans">Inscription</h1>
      <form onSubmit={handleSubmit} className="flex flex-col lg:w-4/12 mt-14">
        <div className="flex">
          <Input
            label="Nom"
            type="lastName"
            name="lastName"
            placeholder="Doe"
            width="w-1/2"
            logo="name"
          />
          <Input
            label="Prenom"
            type="firstName"
            name="firstName"
            placeholder="John"
            width="w-1/2"
            logo="name"
          />
        </div>
        <Input
          label="Email"
          type="email"
          name="email"
          placeholder="johndoe@exemple.com"
          logo="email"
        />
        <Input
          label="Mot de passe"
          type="password"
          name="password"
          placeholder="********"
          logo="password"
        />
        <Input
          label="Confirmation du mot de passe"
          type="password"
          name="password"
          placeholder="********"
          logo="password"
        />
        {error && <p className="mb-3 text-red-500">{error}</p>}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 w-1/2 my-5 mx-auto"
        >
          S'inscrire
        </button>
      </form>
    </div>
  );
};

export default Page;
