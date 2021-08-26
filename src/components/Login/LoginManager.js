import firebase from "firebase/app";

import "firebase/auth";
import firebaseConfig from "../../firebaseConfig";

export const frameworkForLoginInitialize = () => {
  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
};

export const handleGoogleSignIn = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((res) => {
      console.log(res);
      const { displayName, email } = res.user;
      const userInfo = {
        isSignedIn: true,
        displayName: displayName,
        email: email,
      };
      return userInfo;
    });
};

export const handleSignOutBtn = () => {
  return firebase
    .auth()
    .signOut()
    .then(() => {
      const userSignOut = {
        isSignedIn: false,
        name: "",
        email: "",
      };
      return userSignOut;
    });
};

export const createUserWithEmailAndPassword = (name, email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.success = "New user successfully created!";
      updateUserName(name);
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      return newUserInfo;
    });
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((res) => {
      const newUserInfo = res.user;
      newUserInfo.success = "New user successfully login!";
      return newUserInfo;
    })
    .catch((error) => {
      const newUserInfo = {};
      newUserInfo.error = error.message;
      return newUserInfo;
    });
};

 const updateUserName = (name) => {
  const user = firebase.auth().currentUser;

  user
    .updateProfile({
      displayName: name,
    })
    .then((res) => {
      console.log("successfully updated info", res);
    })
    .catch((error) => {
      console.log(error);
    });
};
