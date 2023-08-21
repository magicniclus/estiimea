import React from "react";
import EstimationLayout from "../../../components/layout/EstimationLayout";
import ContainerEstimation from "../../../components/layout/ContainerEstimation";
import UserInformation from "../../../components/estimation/UserInformation";
import EtapeEstimationContainer from "../../../components/estimation/EtapeEstimationContainer";

const index = () => {
  return (
    <EstimationLayout>
      <ContainerEstimation>
        <div>
          <UserInformation />
          <EtapeEstimationContainer />
        </div>
      </ContainerEstimation>
    </EstimationLayout>
  );
};

export default index;
