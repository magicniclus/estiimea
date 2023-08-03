"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Page = () => {
  return <DashboardLayout></DashboardLayout>;
};

export default Page;
