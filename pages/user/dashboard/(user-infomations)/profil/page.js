"use client";
import React, { useEffect } from "react";
import DashboardLayout from "../../../../../components/layout/DashboardLayout";
import DisplayUserInformaitons from "../../../../../components/ui/DisplayUserInformaitons";

const Page = () => {
  return (
    <DashboardLayout>
      <DisplayUserInformaitons />
    </DashboardLayout>
  );
};

export default Page;
