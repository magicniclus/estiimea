import React from "react";
import HeaderJustWithLogo from "../ui/HeaderJustWithLogo";

const InscriptionLayout = (props) => {
  const title = props.title || "Estimmea - Inscription";
  const description = props.description || "Estimmea - Inscription";

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
