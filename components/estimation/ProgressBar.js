import { ChevronLeftIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";

const ProgressBar = () => {
  const step = useSelector((state) => state.stepInProgress);
  const initialStep = useSelector((state) => state.simulateurStep);
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  const dispatch = useDispatch();

  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  const currentSlug = pathSegments[1];

  const handleClick = () => {
    if (step === 14) {
      dispatch({
        type: "SET_CLIENT_INFORMATION",
        payload: {
          vente: null,
          contrat: null,
        },
      });
    }
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
          className={`absolute rounded-md h-[80%] top-1/2 transform -translate-y-1/2 transition-all duration-500 ease-out`}
          style={{
            width: `${(step * 100) / initialStep}%`,
            backgroundColor: secondaryColor,
          }}
        ></div>
      </div>
      {step !== 0 ? (
        <button onClick={handleClick} className="flex mt-2">
          <ChevronLeftIcon className=" w-4" style={{ color: primaryColor }} />
          <p className="text-xs font-light" style={{ color: primaryColor }}>
            Retour
          </p>
        </button>
      ) : null}
    </div>
  );
};

export default ProgressBar;
