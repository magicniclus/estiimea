"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Page = () => {
  const router = useRouter();

  return <DashboardLayout></DashboardLayout>;
};

export default Page;
