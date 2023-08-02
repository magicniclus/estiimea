import React from "react";
import HeaderJustWithLogo from "@/components/ui/HeaderJustWithLogo";

const InscriptionLayout = (props) => {
  return (
    <>
      <HeaderJustWithLogo />
      <main className="w-full border-t-2 border-slate-100 mx-auto flex max-w-7xl font-mont px-6 lg:px-8 ">
        {props.children}
      </main>
    </>
  );
};

export default InscriptionLayout;
