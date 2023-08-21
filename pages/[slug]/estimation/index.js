import React from "react";
import EstimationLayout from "../../../components/layout/EstimationLayout";
import ContainerEstimation from "../../../components/layout/ContainerEstimation";
import UserInformation from "../../../components/estimation/UserInformation";
import EtapeEstimationContainer from "../../../components/estimation/EtapeEstimationContainer";
import { useSelector } from "react-redux";

const index = () => {
  const stateFontColor = useSelector(
    (state) => state?.user?.settings?.fontColor
  );
  const stateFontColor2 = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  return (
    <EstimationLayout>
      <ContainerEstimation>
        <div className="lg:min-h-[600px] flex flex-col justify-between">
          <UserInformation />
          <EtapeEstimationContainer />
          <div className="items-center  mt-5 lg:mt-0 lg:mb-0 mb-5 lg:flex hidden">
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
        </div>

        <div className="w-0.5 min-h-[600px] bg-gray-100 lg:flex hidden" />
        <div className="w-9/12 h-0.5 bg-gray-100 lg:hidden flex mb-7 mt-0" />
      </ContainerEstimation>
    </EstimationLayout>
  );
};

export default index;
