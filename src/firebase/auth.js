import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { app } from "./firebase.config";

export const loginUser = async (email, password) => {
  const auth = getAuth(app); // Initialize auth after the app
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const registerUser = async (
  email,
  password,
  confirmPassword,
  name,
  phone,
  imgProfil,
  backgroundImg,
  title,
  description
) => {
  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return null;
  }

  const auth = getAuth(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Create a new record in Realtime Database after registration
    const db = getDatabase();
    const userRef = ref(db, `users/${userCredential.user.uid}`); // creates a new reference with the ID of the user's UID

    await set(userRef, {
      userInformation: {
        email: email,
        createdAt: new Date().toISOString(),
        name: name || null,
        phone: phone || null,
        imgProfil: imgProfil || null,
      },
      settings: {
        fontColor: "#000000",
        backgroundColor: "#ffffff",
        backgroundImg: backgroundImg || null,
        title: title || null,
        description: description || null,
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

    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
