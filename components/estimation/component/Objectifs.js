import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import SelectWithIcon from "./SelectWithIcon";

const Objectifs = () => {
  const optionsVente = [
    "Le plus rapidement possible",
    "Dans les 6 mois",
    "Dans l'année",
    "Dans les 2 ans",
    "Je ne sais pas",
  ];
  const optionsContract = ["Propriétaire", "Locataire"];

  const dispatch = useDispatch();
  const primaryColor = useSelector(
    (state) => state?.user?.settings?.fontColor2
  );
  const type = useSelector((state) => state?.clientInfomation?.type);
  const [valueVente, setValueVente] = useState(0);
  const [valueContract, setValueContract] = useState(0);
  useEffect(() => {
    dispatch({
      type: "SET_CLIENT_INFORMATION",
      payload: { contrat: valueContract, vente: valueVente },
    });
  }, [valueVente, valueContract]);

  return (
    <div>
      <h2
        className="text-2xl font-light lg:my-0 my-5"
        style={{ color: primaryColor }}
      >
        Quels sont vos objectifs ?
      </h2>
      <div className="mt-5">
        <div className="flex flex-col">
          <h3 className="font-light text-sm text-gray-700 mb-3">
            Quand souhaitez vous vendre votre bien ?
          </h3>
          <SelectWithIcon options={optionsVente} onChange={setValueVente} />
        </div>
        <div className="flex flex-col mt-5">
          <h3 className="font-light text-sm text-gray-700 mb-3">Vous êtes ?</h3>
          <SelectWithIcon
            options={optionsContract}
            onChange={setValueContract}
          />
        </div>
      </div>
    </div>
  );
};

export default Objectifs;
