"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { observeAuthState } from "@/firebase/auth";

const Page = () => {
  const route = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    observeAuthState((user) => {
      if (user) {
        setLoading(false);
      } else {
        route.push("/connexion");
      }
    });
  }, []);

  return (
    <div>
      <h1>Dashbard</h1>
    </div>
  );
};

export default Page;
