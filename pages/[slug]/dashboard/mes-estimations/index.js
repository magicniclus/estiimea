import React, { useEffect, useState } from "react";
import DashboardLayout from "../../../../components/layout/DashboardLayout";
import Tables from "../../../../components/ui/Tables";
import { useSelector } from "react-redux";

const index = () => {
  const userState = useSelector((state) => state.user);
  const [estimations, setEstimations] = useState([]);

  useEffect(() => {
    if (userState?.estimations) {
      setEstimations(userState.estimations);
    }
  }, [userState]);

  return (
    <DashboardLayout>
      <Tables data={estimations} />
    </DashboardLayout>
  );
};

export default index;
