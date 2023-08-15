import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "./firebase.config";

const storage = getStorage(app);

export const uploadImage = (uid, image) => {
  return new Promise((resolve, reject) => {
    const storageRef = ref(storage, `images/${uid}/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        console.log(error);
        reject(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          resolve(downloadURL);
        });
      }
    );
  });
};

export const getImage = async (uid, imageName) => {
  const storageRef = ref(storage, `images/${uid}/${imageName}`);

  getDownloadURL(storageRef)
    .then((url) => {
      console.log("Image available at", url);
    })
    .catch((error) => {
      console.log(error);
    });
};
