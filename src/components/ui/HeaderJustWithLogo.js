"use client";
import React from "react";
import { useRouter, usePathname } from "next/navigation";

const HeaderJustWithLogo = () => {
  const path = usePathname();

  return (
    <header className=" mx-auto flex max-w-7xl px-6 lg:px-8">
      <div className="w-full flex lg:flex-1 py-5 justify-between items-end">
        <a href="#" className="-m-1.5 py-1.5 flex items-end">
          <h2 className="text-4xl text-blue-500 font-normal font-manrope">
            estimmea
          </h2>
        </a>
        <a
          href={path === "/connexion" ? "/inscription" : "/connexion"}
          className="font-semibold text-slate-700 hover:text-slate-500 trasition duration-150 ease-in-out"
        >
          {path === "/connexion" ? "Créer un compte" : "Se connecter"}
        </a>
      </div>
    </header>
  );
};

export default HeaderJustWithLogo;
