import React from "react";
import PresentationContainer from "./PresentationContainer";
import Map from "./Map";
import SearchMapBar from "./SearchMapBar";

const Estimation = () => {
  return (
    <div className="lg:w-10/12 sm:w-11/12 w-full max-w-[1250px] min-h-[665px] px-20 py-16 bg-white shadow-lg flex items-center justify-between relative z-20">
      <div className="absolute -top-1 -right-1 z-20 w-32 h-32 overflow-hidden">
        <a
          href="/"
          className="relative top-5 right-10 z-20 block w-64 p-2 bg-gray-700 rotate-45 text-center hover:scale-105 transition ease-out"
        >
          <p className="text-white font-light text-xs">Propulsé par</p>
          <p className="text-white font-bold text-xs">Estimmea</p>
        </a>
      </div>
      <PresentationContainer />
      <div className="w-0.5 min-h-[600px] bg-gray-100" />
      <div className="w-6/12  min-h-[600px] h-full flex flex-col justify-around">
        <SearchMapBar />
        <Map />
      </div>
    </div>
  );
};

export default Estimation;
