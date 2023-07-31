"use client";
import React, { useState } from "react";
import { registerUser } from "@/firebase/auth";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
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
    <form onSubmit={handleSubmit} className="flex flex-col">
      <label>Email</label>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-3 p-2 border rounded"
        required
      />
      <label>Mot de passe</label>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-3 p-2 border rounded"
        required
      />
      <label>Confirmer le mot de passe</label>
      <input
        type="password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="mb-3 p-2 border rounded"
        required
      />
      {error && <p className="mb-3 text-red-500">{error}</p>}
      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        S'inscrire
      </button>
    </form>
  );
};

export default Page;
