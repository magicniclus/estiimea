import React, { useEffect, useState } from "react";
import CardWithLogo from "./CardWithLogo";
import { useSelector, useDispatch } from "react-redux";

const AppartementMaison = () => {
  const dispatch = useDispatch();
  const primaryColor = useSelector((state) => state?.user?.settings?.fontColor);
  const secondaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: { type: selectedType },
    });
  }, [selectedType]);

  return (
    <>
      <h2
        className="text-2xl font-light lg:my-0 my-5"
        style={{ color: secondaryColor }}
      >
        Type de bien :
      </h2>
      <div className="flex">
        {["maison", "Appartement"].map((type) => (
          <CardWithLogo
            key={type}
            type={type}
            onSelect={setSelectedType}
            typeSelected={selectedType}
            margin="35px"
          />
        ))}
      </div>
    </>
  );
};

export default AppartementMaison;
