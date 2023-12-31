import React from "react";
import { useSelector } from "react-redux";

const ContainerEstimation = (props) => {
  const stateFontColor = useSelector(
    (state) => state?.user?.settings?.fontColor
  );
  const stateFontColor2 = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const containWidth = useSelector((state) => state?.widthEstimationContainer);
  return (
    <div
      className={`lg:w-full sm:w-11/12 w-full max-w-[1250px] min-h-[665px] px-5 py-10 ${
        containWidth !== "mobile" ? "lg:px-20 lg:py-16" : "px-5 py-16"
      } bg-white shadow-lg flex items-center justify-between flex-col ${
        containWidth !== "mobile" ? "lg:flex-row" : "flex-row"
      } relative z-20`}
    >
      <div
        className={`absolute -top-1 -right-1 z-20 w-32 h-32 overflow-hidden ${
          containWidth !== "mobile" ? "hidden  lg:block" : "hidden"
        }`}
      >
        <a
          href="/"
          className="relative top-5 right-10 z-20 block w-64 p-2 bg-gray-700 rotate-45 text-center hover:scale-105 transition ease-out"
        >
          <p className="text-white font-light text-xs">Propulsé par</p>
          <p className="text-white font-bold text-xs">Estimmea</p>
        </a>
      </div>
      {props.children}
      <div
        className={`flex items-center mt-5 ${
          containWidth !== "mobile" ? "lg:mt-0 lg:mb-0 mb-5" : "mt-0 mb-5"
        } ${containWidth === "mobile" ? "hidden" : "lg:hidden"}`}
      >
        <a
          className="font-light text-xs"
          style={{ color: stateFontColor2 }}
          href="#"
        >
          Paramètre et cookies
        </a>
        <div className="ml-3">|</div>
        <a
          className="font-light text-xs ml-3"
          style={{ color: stateFontColor2 }}
          href="#"
        >
          Signaler un abus
        </a>
      </div>

      {containWidth === "mobile" && (
        <a
          href="/"
          className="z-20 p-2 text-center hover:scale-105 transition ease-out mt-5 flex"
        >
          <p className="text-gray-700 font-light text-xs">
            Propulsé par <span className="font-bold">Estimmea</span>
          </p>
        </a>
      )}
    </div>
  );
};

export default ContainerEstimation;
