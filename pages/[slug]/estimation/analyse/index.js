import React, { useState, useEffect } from "react";

import { useRouter } from "next/router";

import { useSelector } from "react-redux";

import ContainerEstimation from "../../../../components/layout/ContainerEstimation";
import EstimationLayout from "../../../../components/layout/EstimationLayout";
import UserInformation from "../../../../components/estimation/UserInformation";
import AnalysePresentation from "../../../../components/estimation/component/AnalysePresentation";
import AnalyseLoader from "../../../../components/estimation/component/AnalyseLoader";
import Loader from "../../../../components/loader/Loader";

const index = () => {
  const [isLoading, setIsLoading] = useState(false);
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const clientInfomation = useSelector(
    (state) => state?.clientInfomation?.adresse
  );

  const router = useRouter();
  const pathSegments = router.asPath.split("/");
  const currentSlug = pathSegments[1];

  useEffect(() => {
    if (primaryColor) {
      setIsLoading(true);
    }
  }, [primaryColor]);

  const handleRoute = () => {
    router.push(`/${currentSlug}/estimation/analyse`);
  };

  useEffect(() => {
    setTimeout(() => {
      if (!clientInfomation && currentSlug) {
        router.push({
          pathname: "/[slug]",
          query: { slug: currentSlug },
        });
      }
    }, 1000);
  }, [clientInfomation, currentSlug]);

  return (
    <EstimationLayout>
      <ContainerEstimation>
        {!isLoading && (
          <div className="fixed top-0 left-0 w-full h-full bg-white flex items-center justify-center z-10">
            <Loader />
          </div>
        )}
        <div className="lg:min-h-[600px] flex flex-col justify-between  w-full lg:w-4/12">
          <UserInformation />
          <AnalysePresentation />
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
        {/* <div className="w-full h-0.5 bg-gray-100 lg:hidden flex mt-7 lg:mt-0" /> */}
        <AnalyseLoader />
      </ContainerEstimation>
    </EstimationLayout>
  );
};

export default index;
