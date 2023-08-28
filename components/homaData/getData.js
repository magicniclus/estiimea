import axios from "axios";

const mockedData = {
  data: {
    mainValuation: {
      predicted_price: 541660.9,
      confidence_index: 4,
      confidence_min: 489064.0762792,
      confidence_max: 594257.7237208,
      price_m2: 12036.908888889,
      price_min: 5837,
      price_max: 12558,
      fai_rate: 4.47,
      fai: 25700,
      nego_rate: 1.32,
      nego: 7589,
      virtual_price_max: 12558,
      virtual_price_min: 5837,
    },
    thirdPartyFees: {
      price: "541661",
      new_construction: "0",
      c2c: "0",
      notary_fees: "39100.9",
      notary_fees_ratio: "7.2",
      emolument_fees: "5847.1",
      tax_fees: "31903.8",
      formalities_fees: "1350",
      agency_fees: "28978.9",
      agency_fees_ratio: "5.35",
      monthly_mortage_10_years: "5057.12",
      mortage_10_years_cost: "65193.4",
      monthly_mortage_15_years: "3619.39",
      mortage_15_years_cost: "109829",
      monthly_mortage_25_years: "2596.88",
      mortage_25_years_cost: "237403",
    },
  },
};

const updateMockedData = () => {
  return Promise.resolve(mockedData);
};

export const getEstimation = (params) => {
  const mocked = true;
  const apiKey = process.env.NEXT_PUBLIC_HOMADATA_API_KEY; // Remplacez YOUR_API_KEY par votre clé d'API réelle
  const apiDomain = "https://www.estimmea.fr/"; // Remplacez YOUR_API_DOMAIN par votre domaine API réel
  const apiUrl = `https://bdvapis.appspot.com/estimation/v3.0.0/transaction`;

  const config = {
    headers: {
      Authorization: `Bearer ${apiKey}}`,
      Origin: apiDomain,
    },
    params,
    // params: {
    //   lon: 2.294481,
    //   lat: 48.85837,
    //   propertyType: 0,
    //   propertySurface: 72,
    //   roomNb: 3,
    //   bedroomNb: 2,
    //   floor: 3,
    //   floorNb: 2,
    //   gardenSurface: 0,
    // },
  };

  if (mocked) {
    return new Promise((resolve, reject) => {
      if (mocked) {
        updateMockedData()
          .then((value) => resolve(value))
          .catch((err) => {
            reject(err);
          });
      } else null;
    });
  }

  return new Promise((resolve, reject) => {
    axios
      .get(apiUrl, config)
      .then((response) => {
        resolve(response.data.mainValuation);
      })
      .catch((error) => {
        console.error(error);
        reject(error);
      });
  });
};
