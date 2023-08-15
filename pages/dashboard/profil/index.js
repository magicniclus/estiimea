import React, { useEffect } from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import DisplayUserInformaitons from "../../../components/ui/DisplayUserInformaitons";

const index = () => {
  return (
    <DashboardLayout>
      <DisplayUserInformaitons />
    </DashboardLayout>
  );
};

export default index;
