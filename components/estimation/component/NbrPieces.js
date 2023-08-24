import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputNumber from "./InputNumber";

const NbrPieces = () => {
  const dispatch = useDispatch();
  const primaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const [value, setValue] = useState(0);

  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: { pieces: value },
    });
  }, [value]);
  return (
    <>
      <h2
        className="text-2xl font-light lg:my-0 my-5"
        style={{ color: primaryColor }}
      >
        Nombre de pièce de votre bien :
      </h2>
      <div className="flex">
        <InputNumber value={value} onChange={setValue} type="Pcs" />
      </div>
    </>
  );
};

export default NbrPieces;
