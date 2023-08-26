import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputNumber from "./InputNumber";

const NbrChambres = () => {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const [value, setValue] = useState(null);

  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: { chambres: value },
    });
  }, [value]);
  return (
    <>
      <h2
        className="text-2xl font-light lg:my-0 my-5"
        style={{ color: secondaryColor }}
      >
        Nombre de chambre de votre bien :
      </h2>
      <div className="flex">
        <InputNumber
          value={value}
          onChange={setValue}
          placeholder="Entrez le nombre de chambre"
          type="Ch"
        />
      </div>
    </>
  );
};

export default NbrChambres;
