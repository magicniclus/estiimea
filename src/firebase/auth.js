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
import { getDatabase, ref, set, get } from "firebase/database";
import { app } from "./firebase.config";

//login
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

//User Information
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

  const auth = getAuth(app);
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const db = getDatabase();
    const userRef = ref(db, `users/${userCredential.user.uid}`); // creates a new reference with the ID of the user's UID

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

    console.log("User registered:", userCredential.user);
    return userCredential.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//Email Verification
export const sendVerificationEmail = async () => {
  const auth = getAuth(app);
  console.log(auth.currentUser);
  sendEmailVerification(auth.currentUser)
    .then(() => {
      console.log("Email sent");
    })
    .catch((error) => {
      console.error(error);
    });
};

export const sendSignInLink = async (email) => {
  const auth = getAuth(app);
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

//Get user
export const observeAuthState = (userChangeHandler) => {
  const auth = getAuth(app);
  return onAuthStateChanged(auth, userChangeHandler);
};

//Google Login
export const signInWithGoogle = async () => {
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const db = getDatabase(app);
    const userRef = ref(db, `users/${user.uid}`);

    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      set(userRef, {
        userInformation: {
          email: user.email,
          createdAt: new Date().toISOString(),
          firstName: user.displayName || null,
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
      }).catch((error) => console.log("Failed to write to database: ", error));
    }

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//Facebook Login
export const signInWithFacebook = async () => {
  const auth = getAuth(app);
  const provider = new FacebookAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    const db = getDatabase(app);
    const userRef = ref(db, `users/${user.uid}`);

    const snapshot = await get(userRef);
    if (!snapshot.exists()) {
      set(userRef, {
        userInformation: {
          email: user.email,
          createdAt: new Date().toISOString(),
          firstName: user.displayName || null,
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
      }).catch((error) => console.log("Failed to write to database: ", error));
    }

    return user;
  } catch (error) {
    console.error(error);
    return null;
  }
};

//Logout
export const logoutUser = async () => {
  const auth = getAuth(app);
  try {
    await signOut(auth);
    console.log("User logged out");
  } catch (error) {
    console.error("Failed to logout: ", error);
  }
};
