import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  sendSignInLinkToEmail,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { app } from "./firebase.config";

const auth = getAuth(app);

export const loginUser = async (email, password) => {
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
  firstName,
  lastName
) => {
  if (password !== confirmPassword) {
    console.error("Passwords do not match");
    return null;
  }
  try {
    const userCredential = await createUserWithEmailAndPassword(
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

export const sendVerificationEmail = async () => {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const sendSignInLink = async (email) => {
  const actionCodeSettings = {
    url: "http://localhost:3000/connexion",
    handleCodeInApp: true,
  };
  sendSignInLinkToEmail(auth, email, actionCodeSettings)
    .then(() => {
      console.log("Email sent");
      window.localStorage.setItem("emailForSignIn", email);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const observeAuthState = (userChangeHandler) => {
  return onAuthStateChanged(auth, userChangeHandler);
};

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithProvider(provider);
};

export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  return signInWithProvider(provider);
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Failed to logout: ", error);
  }
};

const signInWithProvider = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
