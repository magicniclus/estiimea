// user.js
import { app } from "./firebase.config";
import { getDatabase, ref, set, get, update } from "firebase/database";

// Obtenez une référence à la base de données de Firebase
const db = getDatabase(app);

// Fonction pour créer un nouvel utilisateur dans la base de données Firebase.
// Elle prend comme paramètres un ID utilisateur (uid), une adresse email, un prénom et un nom de famille.
// Elle crée ensuite une nouvelle référence utilisateur dans la base de données avec ces informations,
// plus quelques autres champs par défaut.
export const createNewUser = async (uid, email, firstName, lastName) => {
  const userRef = ref(db, `users/${uid}`);
  await set(userRef, {
    userInformation: {
      email: email,
      createdAt: new Date().toISOString(),
      firstName: firstName || null,
      lastName: lastName || null,
    },
    settings: {
      fontColor: "#000000",
      backgroundColor: "#ffffff",
    },
    plan: {
      name: "Free",
      price: 0,
      features: {},
      subscribeAt: new Date().toISOString(),
      expireAt: new Date().toISOString() + 30,
    },
    estimations: {},
  });
};

// Fonction pour récupérer les informations d'un utilisateur connecté.
// Elle prend un ID utilisateur (uid) comme paramètre et tente d'obtenir les informations de cet utilisateur
// à partir de la base de données Firebase.
export const getLoggedInUserData = async (uid) => {
  const userRef = ref(db, `users/${uid}`);
  try {
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      console.log("No data available for logged-in user id: ", uid);
      return null;
    }
  } catch (error) {
    console.error("Failed to retrieve logged-in user data: ", error);
    return null;
  }
};

// Fonction pour mettre à jour les données d'un utilisateur dans la base de données Firebase.
// Elle prend un ID utilisateur (uid) et un objet de mises à jour comme paramètres,
// puis tente de mettre à jour les informations de cet utilisateur avec les mises à jour fournies.
//updateUserData(uid, { userInformation: { firstName: "newFirstName", lastName: "newLastName" } });
export const updateUserData = async (uid, updates) => {
  const userRef = ref(db, `users/${uid}`);

  try {
    await update(userRef, updates);
    console.log(`Updated user ${uid} data successfully.`);
  } catch (error) {
    console.error("Failed to update user data: ", error);
  }
};
