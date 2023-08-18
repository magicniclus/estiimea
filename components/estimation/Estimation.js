import React from "react";
import PresentationContainer from "./PresentationContainer";

const Estimation = () => {
  return (
    <div className="lg:w-10/12 sm:w-11/12 w-full max-w-[1250px] min-h-[665px] pl-16 py-16 bg-white shadow-lg flex items-center relative z-20">
      <div className="absolute -top-2 -right-2 z-20 w-54 h-48 overflow-hidden">
        <a
          href="/"
          className="relative top-10 -right-14 z-20 block w-64 p-2 bg-gray-700 rotate-45 text-center  hover:scale-105"
        >
          <p className="text-white text-xs">Propulsé par</p>
          <p className="text-white font-bold text-xs">Estimmea</p>
        </a>
      </div>
      <PresentationContainer />
      <div className="w-0.5 min-h-[600px] bg-gray-100" />
    </div>
  );
};

export default Estimation;
