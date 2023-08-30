// user.js
import { slugify } from "../lib/utils";
import { app } from "./firebase.config";
import { getDatabase, ref, set, get, update, push } from "firebase/database";

// Obtenez une référence à la base de données de Firebase
const db = getDatabase(app);

// Fonction pour créer un nouvel utilisateur dans la base de données Firebase.
// Elle prend comme paramètres un ID utilisateur (uid), une adresse email, un prénom et un nom de famille.
// Elle crée ensuite une nouvelle référence utilisateur dans la base de données avec ces informations,
// plus quelques autres champs par défaut.
export const createNewUser = async (uid, email, firstName, lastName) => {
  console.log(slugify(firstName + " " + lastName));
  const userRef = ref(db, `users/${uid}`);
  await set(userRef, {
    userInformation: {
      email: email,
      createdAt: new Date().toISOString(),
      firstName: firstName || null,
      lastName: lastName || null,
      phone: "0631420045",
    },
    settings: {
      fontColor: "#374151",
      fontColor2: "#3B82F6",
      backgroundColor: "#ffffff",
      slug: slugify(firstName + " " + lastName),
      name: firstName + " " + lastName,
      entreprise: "SAFTI",
      title: "Estimez votre bien en ligne gratuitement.",
      description:
        "Nos estimations sont réalisées grâce aux caractéristiques de votre bien immobilier et du marché local en temps réel",
      description2:
        "Nos estimations sont réalisées grâce aux caractéristiques.",
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
  console.log("UID:", uid);
  console.log("Updates:", updates);
  try {
    console.log("Before updating...");
    await update(userRef, updates);
    console.log("After updating...");
    console.log(`Updated user ${uid} data successfully.`);
  } catch (error) {
    console.error("Failed to update user data: ", error);
  }
};

// Fonction pour creer l'url de l'utilisateur
export async function findUserIdBySlug(slug) {
  // Remplacez cette logique par une requête réelle à Firebase
  const snapshot = await get(ref(db, `users/`)); // Ceci est un pseudocode
  const usersData = snapshot.val();
  // Trouvez l'UID basé sur le slug et retournez-le
  for (let userId in usersData) {
    if (
      usersData[userId].settings &&
      usersData[userId].settings.slug === slug
    ) {
      return userId;
    }
  }
  return null; // Si aucun utilisateur ne correspond au slug
}

// Fonction pour ajouter une nouvelle estimation pour un utilisateur.
// Cette fonction prend comme paramètres un ID utilisateur (uid) et les données d'estimation.
// Fonction pour ajouter une nouvelle estimation pour un utilisateur.
export const addEstimationForUser = async (uid, estimationData) => {
  const estimationsRef = ref(db, `users/${uid}/estimations`);

  try {
    const newEstimationRef = push(estimationsRef); // Ceci crée une nouvelle référence avec un ID unique
    await set(newEstimationRef, estimationData); // Sauvegardez les données d'estimation avec cet ID unique
    console.log(`Added new estimation for user ${uid} successfully.`);
  } catch (error) {
    console.error("Failed to add new estimation: ", error);
  }
};
