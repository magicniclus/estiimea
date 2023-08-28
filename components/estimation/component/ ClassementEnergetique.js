import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectWithIcon from "./SelectWithIcon";

const ClassementEnergetique = () => {
  const options = ["A", "B", "C", "D", "E", "F", "G"];
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );

  const [valueDPE, setValueDPE] = useState(0);
  const [valueGES, setValueGES] = useState(0);
  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: { dpe: valueDPE, ges: valueGES },
    });
  }, [valueDPE, valueGES]);
  return (
    <div>
      <h2
        className="text-2xl font-light lg:my-0 my-5"
        style={{ color: secondaryColor }}
      >
        Classement énergetique de votre bien :
      </h2>
      <div className="mt-5">
        <div className="flex flex-col">
          <h3
            className="font-light text-sm mb-3"
            style={{ color: primaryColor }}
          >
            DPE{" "}
          </h3>
          <SelectWithIcon options={options} onChange={setValueDPE} />
        </div>
        <div className="flex flex-col mt-5">
          <h3
            className="font-light text-sm mb-3"
            style={{ color: primaryColor }}
          >
            GSE{" "}
          </h3>
          <SelectWithIcon options={options} onChange={setValueGES} />
        </div>
      </div>
    </div>
  );
};

export default ClassementEnergetique;
