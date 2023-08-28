import React from "react";
import ContainerEstimation from "../../../../components/layout/ContainerEstimation";
import EstimationLayout from "../../../../components/layout/EstimationLayout";
import { useSelector } from "react-redux";
import UserInformation from "../../../../components/estimation/UserInformation";
import Avantages from "../../../../components/estimation/Avantages";
import FormulaireFinal from "../../../../components/estimation/component/FormulaireFinal";

const index = () => {
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  return (
    <EstimationLayout>
      <ContainerEstimation>
        <div className="lg:min-h-[600px] flex flex-col justify-between  w-full lg:w-4/12">
          <UserInformation />
          <Avantages />
          <div className="items-center  mt-5 lg:mt-0 lg:mb-0 mb-5 lg:flex hidden">
            <a
              className="font-light text-xs"
              style={{ color: secondaryColor }}
              href="#"
            >
              Paramètre et cookies
            </a>
            <div className="ml-3">|</div>
            <a
              className="font-light text-xs ml-3"
              style={{ color: secondaryColor }}
              href="#"
            >
              Signaler un abus
            </a>
          </div>
        </div>
        <div className="w-0.5 min-h-[600px] bg-gray-100 lg:flex hidden" />
        <div className="w-full h-0.5 bg-gray-100 lg:hidden flex lg:mt-0" />
        <div className="w-full lg:w-6/12 min-h-[400px] lg:min-h-[600px] flex flex-col justify-center items-center lg:mt-0 mt-10">
          <h2
            className="text-xl font-semibold"
            style={{ color: secondaryColor }}
          >
            Dernière étape !
          </h2>
          <h1
            className="text-center text-xs lg:mt-5 mt-10"
            style={{ color: primaryColor }}
          >
            Saisissez vos coordonnées afin de visualiser votre estimation
            gratuite.
          </h1>
          <FormulaireFinal />
        </div>
      </ContainerEstimation>
    </EstimationLayout>
  );
};

export default index;
