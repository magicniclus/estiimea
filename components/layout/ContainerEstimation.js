import React from "react";

const ContainerEstimation = (props) => {
  return (
    <div className="lg:w-10/12 sm:w-11/12 w-full max-w-[1250px] min-h-[665px] px-5 py-10 lg:px-20 lg:py-16 bg-white shadow-lg flex items-center justify-between flex-col lg:flex-row relative z-20">
      {props.children}
    </div>
  );
};

export default ContainerEstimation;
