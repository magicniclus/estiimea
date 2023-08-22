import React from "react";
import Head from "next/head";
import Script from "next/script"; // Importez le composant Script

const Accueil = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col text-slate-600">
      <h1 className="text-6xl font-sans">
        Bienvenue chez{" "}
        <span className="text-blue-300 font-semibold font-mont">estimmea</span>
      </h1>
      <p className="text-center mt-5 text-xl font-light lg:w-5/12 w-full">
        Découvrez une nouvelle façon d'
        <span className="font-normal">acquerir</span> de nouveaux{" "}
        <span className="font-normal">prospects</span> dans l'immobilier.{" "}
        <span className="font-normal">Estiimea</span> vous offre la possibilité
        de proposer des{" "}
        <span className="font-normal">estimations immobilières</span> en ligne
        rapidement à vos prospects, de manière{" "}
        <span className="font-normal">simplifiée</span> et{" "}
        <span className="font-normal">entièrement personnalisée</span>.
      </p>

      {/* Ajoutez le code HTML du widget Calendly */}
      <div
        className="calendly-inline-widget mt-5"
        data-url="https://calendly.com/adventure-contact/dejeuner"
        style={{ width: "800px", height: "900px" }}
      ></div>

      {/* Utilisez le composant Script pour ajouter le script de Calendly */}
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        async
      />
    </div>
  );
};

export default Accueil;

//Semrush
//maprimerenov ??
//Artizzana
