import React from "react";

const accueil = () => {
  return (
    <div className="min-h-screen flex justify-center items-center flex-col text-slate-600">
      <h1 className="text-6xl font-sans">
        Bienvenue chez{" "}
        <span className="text-blue-300 font-semibold font-mont">Estiimea</span>
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
    </div>
  );
};

export default accueil;
