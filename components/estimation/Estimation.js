import React from "react";
import PresentationContainer from "./PresentationContainer";
import Map from "./Map";
import SearchMapBar from "./SearchMapBar";
import { useSelector } from "react-redux";
import Loader from "../loader/Loader";
import ContainerEstimation from "../layout/ContainerEstimation";

const Estimation = () => {
  const stateFontColor = useSelector(
    (state) => state?.user?.settings?.fontColor
  );
  const stateFontColor2 = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const stateMapIsLoading = useSelector((state) => state?.mapIsLoading);
  const stateUserIsLoading = useSelector((state) => state?.userIsLoading);
  return (
    <ContainerEstimation>
      {stateMapIsLoading && stateUserIsLoading && (
        <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-10">
          <Loader />
        </div>
      )}
      <div className="absolute -top-1 -right-1 z-20 w-32 h-32 overflow-hidden lg:block hidden">
        <a
          href="/"
          className="relative top-5 right-10 z-20 block w-64 p-2 bg-gray-700 rotate-45 text-center hover:scale-105 transition ease-out"
        >
          <p className="text-white font-light text-xs">Propulsé par</p>
          <p className="text-white font-bold text-xs">Estimmea</p>
        </a>
      </div>
      <PresentationContainer />
      <div className="w-0.5 min-h-[600px] bg-gray-100 lg:flex hidden" />
      <div className="w-9/12 h-0.5 bg-gray-100 lg:hidden flex mb-7 mt-0" />
      <div className="w-full lg:w-6/12 min-h-[400px]  lg:min-h-[600px] h-full flex flex-col justify-around">
        <SearchMapBar />
        <Map />
      </div>
      <a
        href="/"
        className="z-20 p-2 text-center hover:scale-105 transition ease-out mt-5 flex lg:hidden"
      >
        <p className="text-gray-700 font-light text-xs">
          Propulsé par <span className="font-bold">Estimmea</span>
        </p>
      </a>
      <div className="flex items-center  mt-5 lg:mt-0 lg:mb-0 mb-5 lg:hidden">
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
    </ContainerEstimation>
  );
};

export default Estimation;
