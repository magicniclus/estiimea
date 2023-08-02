import React from "react";
import HeaderJustWithLogo from "@/components/ui/HeaderJustWithLogo";
import Head from "next/head";

const InscriptionLayout = (props) => {
  const title = props.title || "Estimmea - Inscription";
  const description = props.description || "Estimmea - Inscription";

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <HeaderJustWithLogo />
      <main className="w-full border-t-2 border-slate-100 mx-auto flex max-w-7xl font-mont px-6 lg:px-8 ">
        {props.children}
      </main>
    </>
  );
};

export default InscriptionLayout;
