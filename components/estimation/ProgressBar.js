import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useSelector } from "react-redux";

const ProgressBar = () => {
  const step = useSelector((state) => state.stepInProgress);
  const initialStep = useSelector((state) => state.simulateurStep);
  console.log(step);
  return (
    <div className="lg:mt-3 mt-10">
      <div className="relative w-full h-2 bg-gray-200 rounded-md z-0">
        <div
          className={`ml-0.5 absolute bg-blue-500 rounded-md h-[80%] top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out`}
          style={{ width: `${(step * 100) / initialStep}%` }}
        ></div>
      </div>
      {step !== 0 ? (
        <button className="flex mt-2">
          <ChevronLeftIcon className=" text-gray-700 w-4" />
          <p className="text-xs font-light font-gray-700">Retour</p>
        </button>
      ) : null}
    </div>
  );
};

export default ProgressBar;
