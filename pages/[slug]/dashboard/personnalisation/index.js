import React, { useState } from "react";
import PersonnalisationEstimationLayout from "../../../../components/layout/PersonnalisationEstimationLayout";
import SideBar from "../../../../components/SideBar";
import { useSelector } from "react-redux";
import Estimation from "../../../../components/estimation/Estimation";
import PeronalisationLayout from "../../../../components/layout/PeronalisationLayout";
import PersonnalisationHeader from "../../../../components/PersonnalisationHeader";
import ParamsEstimation from "../../../../components/ui/ParamsEstimation";

const index = () => {
  const stateFontColor = useSelector(
    (state) => state?.user?.settings?.fontColor
  );
  const stateFontColor2 = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const stateUserIsLoading = useSelector((state) => state?.mapIsLoading);
  const stateClientAdresse = useSelector(
    (state) => state?.clientInformation?.adresse
  );
  const [openSideBar, setOpenSideBar] = useState(true);
  return (
    <PeronalisationLayout>
      <div className="flex flex-col justify-center items-center mt-5">
        <PersonnalisationHeader />
        <PersonnalisationEstimationLayout>
          <Estimation />
        </PersonnalisationEstimationLayout>
        <ParamsEstimation />
      </div>
    </PeronalisationLayout>
  );
};

export default index;
