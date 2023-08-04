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

// Obtention d'une instance de l'authentification Firebase
const auth = getAuth(app);

// Fonction qui permet de se connecter à l'application avec un email et un mot de passe
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

// Fonction qui permet de créer un nouvel utilisateur avec un email et un mot de passe
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

// Fonction qui permet d'envoyer un email de vérification à l'utilisateur actuellement connecté
export const sendVerificationEmail = async () => {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

// Fonction qui permet d'envoyer un lien de connexion à un email donné
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

// Fonction qui permet d'observer les changements d'état de l'authentification
export const observeAuthState = (userChangeHandler) => {
  return onAuthStateChanged(auth, userChangeHandler);
};

// Fonction qui permet de se connecter à l'application avec Google
export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  return signInWithProvider(provider);
};

// Fonction qui permet de se connecter à l'application avec Facebook
export const signInWithFacebook = async () => {
  const provider = new FacebookAuthProvider();
  return signInWithProvider(provider);
};

// Fonction qui permet de se déconnecter de l'application
export const logoutUser = async () => {
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Failed to logout: ", error);
  }
};

// Fonction qui permet de se connecter à l'application avec un fournisseur d'authentification donné
const signInWithProvider = async (provider) => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

// Fonction qui permet d'obtenir l'uid de l'utilisateur actuellement connecté
export const getCurrentUserUid = () => {
  const user = auth.currentUser;

  if (user) {
    return user.uid;
  } else {
    console.error("No user is currently logged in.");
    return null;
  }
};
