import React, { useEffect } from "react";
import DisplayUserInformaitons from "../../../../components/ui/DisplayUserInformaitons";
import DashboardLayout from "../../../../components/layout/DashboardLayout";

const index = () => {
  return (
    <DashboardLayout>
      <DisplayUserInformaitons />
    </DashboardLayout>
  );
};

export default index;
