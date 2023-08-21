import React, { useEffect } from "react";
import EstimationLayout from "../../../components/layout/EstimationLayout";
import ContainerEstimation from "../../../components/layout/ContainerEstimation";
import UserInformation from "../../../components/estimation/UserInformation";
import EtapeEstimationContainer from "../../../components/estimation/EtapeEstimationContainer";
import { useSelector } from "react-redux";
import EstimationManager from "../../../components/estimation/EstimationManager";
import Loader from "../../../components/loader/Loader";
import { useRouter } from "next/router";
import Map from "../../../components/estimation/Map";

const index = () => {
  const stateFontColor = useSelector(
    (state) => state?.user?.settings?.fontColor
  );
  const stateFontColor2 = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  const stateUserIsLoading = useSelector(
    (state) => state?.UserInformation?.photoProfil
  );
  const stateClientAdresse = useSelector(
    (state) => state?.clientInformation?.adresse
  );
  const stateSlug = useSelector((state) => state?.user?.settings?.slug);

  const router = useRouter();

  const pathSegments = router.asPath.split("/");
  const currentSlug = pathSegments[1];
  useEffect(() => {
    setTimeout(() => {
      if (!stateClientAdresse && !stateSlug && currentSlug !== "[slug]") {
        router.push(`/${currentSlug}`);
      }
    }, 1000);
  }, [stateClientAdresse, stateSlug, currentSlug]);

  return (
    <EstimationLayout>
      <ContainerEstimation>
        {stateUserIsLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-10">
            <Loader />
          </div>
        )}
        <div className="lg:min-h-[600px] flex flex-col justify-between  w-full lg:w-4/12">
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
        <div className="w-full h-0.5 bg-gray-100 lg:hidden flex mt-7 lg:mt-0" />
        <EstimationManager />
      </ContainerEstimation>
    </EstimationLayout>
  );
};

export default index;
