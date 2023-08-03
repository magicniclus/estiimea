// user.js
import { app } from "./firebase.config";
import { getDatabase, ref, set, get } from "firebase/database";

const db = getDatabase(app);

export const createNewUser = async (uid, email, firstName, lastName) => {
  const userRef = ref(db, `users/${uid}`);
  await set(userRef, {
    userInformation: {
      email: email,
      createdAt: new Date().toISOString(),
      firstName: firstName || null,
      lastName: lastName || null,
      photoProfil:
        "https://firebasestorage.googleapis.com/v0/b/estiimea.appspot.com/o/pexels-italo-melo-2379004.jpg?alt=media&token=733523fd-13fc-447d-bdf3-70260f0147e4",
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
