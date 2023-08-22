import React from "react";
import Adresse from "./component/Adresse";
import { useSelector } from "react-redux";

const Step = () => {
  const primaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full min-h-[280px] h-full flex flex-col justify-between"
    >
      <Adresse />
      <button
        type="submit"
        className={`text-white py-1.5 px-5 rounded-full transition ease-in-out duration-100 w-min lg:mb-0 my-10`}
        style={{ backgroundColor: primaryColor }}
      >
        Continuer
      </button>
    </form>
  );
};

export default Step;
