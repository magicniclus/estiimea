"use client";
import React, { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { getLoggedInUserData } from "@/firebase/dataManager";
import { observeAuthState } from "@/firebase/auth";
import { useSelector, useDispatch } from "react-redux";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Page = () => {
  const router = useRouter();

  const userState = useSelector((state) => state.user);

  const dispatch = useDispatch();

  //récuperation des information utilisateur si elles ne sont pas déja dans rédux
  useEffect(() => {
    dispatch({ type: "SET_USER_LOADING", payload: true });
    if (!userState) {
      observeAuthState((user) => {
        if (user) {
          getLoggedInUserData(user.uid)
            .then((userInfo) => {
              dispatch({ type: "SET_USER_INFORMATION", payload: userInfo });
            })
            .catch((error) => {
              console.error(error);
            })
            .finally(() => {
              dispatch({ type: "SET_USER_LOADING", payload: false });
            });
        }
      });
    } else dispatch({ type: "SET_USER_LOADING", payload: false });
  }, [userState]);

  return <DashboardLayout></DashboardLayout>;
};

export default Page;
