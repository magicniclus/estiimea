import React from "react";
import ParamsProfilInformations from "./ParamsProfilInformations";
import PersonnalisationEstimation from "./PersonnalisationEstimation";
import ParamsTraker from "./ParamsTraker";

const ParamsEstimation = (props) => {
  return (
    <div className="space-y-10 divide-y divide-gray-900/10 bg-slate-50 px-5 py-5 rounded-md mt-10">
      <ParamsProfilInformations />
      <PersonnalisationEstimation />
      <ParamsTraker />
    </div>
  );
};

export default ParamsEstimation;
