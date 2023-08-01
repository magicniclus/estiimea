import React from "react";

const HeaderJustWithLogo = () => {
  return (
    <header className=" mx-auto flex max-w-7xl px-6 lg:px-8">
      <div className="flex lg:flex-1 py-5 justify-between items-end">
        <a href="#" className="-m-1.5 py-1.5 flex items-end">
          <img className="h-12 w-auto" src="/images/logos/logo_2.png" alt="" />
          {/* <span className="text-blue-500 font-mont font-normal text-2xl">
            Estiimea
          </span> */}
        </a>
        <a href="#" className="font-semibold text-slate-700">
          Connexion
        </a>
      </div>
    </header>
  );
};

export default HeaderJustWithLogo;
