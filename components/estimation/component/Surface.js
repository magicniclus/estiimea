import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import InputNumber from "./InputNumber"; // Assurez-vous que le chemin d'accès est correct

const Surface = () => {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const [value, setValue] = useState(null);

  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: { surface: value },
    });
  }, [value]);
  return (
    <>
      <h2
        className="text-2xl font-light lg:my-0 my-5"
        style={{ color: secondaryColor }}
      >
        Surfaces de votre bien :
      </h2>
      <div className="flex">
        <InputNumber value={value} onChange={setValue} placehoder="0" />
      </div>
    </>
  );
};

export default Surface;
