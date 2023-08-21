import React from "react";
import Map from "./Map";
import ProgressBar from "./ProgressBar";
import Step from "./Step";

const EstimationManager = () => {
  return (
    <div className="w-full lg:w-6/12 min-h-[400px] lg:min-h-[600px] flex flex-col justify-between">
      <div className="flex flex-col justify-around min-h-[450px]">
        <ProgressBar />
        <Step />
      </div>
      <Map height="80px" />
    </div>
  );
};

export default EstimationManager;
