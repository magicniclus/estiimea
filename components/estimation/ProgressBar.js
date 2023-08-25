import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const ProgressBar = () => {
  const step = useSelector((state) => state.stepInProgress);
  const initialStep = useSelector((state) => state.simulateurStep);

  const dispatch = useDispatch();

  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  const currentSlug = pathSegments[1];

  const handleClick = () => {
    if (step > 2) {
      dispatch({ type: "DOWN_SIMULATEUR_STEP" });
    } else {
      router.push(`/${currentSlug}`);
    }
  };

  return (
    <div className="lg:mt-3 mt-10">
      <div className="relative w-full h-2 bg-gray-200 rounded-md z-0">
        <div
          className={`ml-0.5 absolute bg-blue-500 rounded-md h-[80%] top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out`}
          style={{ width: `${(step * 100) / initialStep}%` }}
        ></div>
      </div>
      {step !== 0 ? (
        <button onClick={handleClick} className="flex mt-2">
          <ChevronLeftIcon className=" text-gray-700 w-4" />
          <p className="text-xs font-light font-gray-700">Retour</p>
        </button>
      ) : null}
    </div>
  );
};

export default ProgressBar;
