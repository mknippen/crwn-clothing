import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDhJbUSmviqocQAnleUAOAXy7irPqCvhvE",
    authDomain: "crwn-db-e09b1.firebaseapp.com",
    databaseURL: "https://crwn-db-e09b1.firebaseio.com",
    projectId: "crwn-db-e09b1",
    storageBucket: "crwn-db-e09b1.appspot.com",
    messagingSenderId: "973400205488",
    appId: "1:973400205488:web:391690a98fa8f193dd3375",
    measurementId: "G-L3683CK1XV"
  };

  export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();

      try {
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      } catch (error) {
        console.log('error creating user', error.message);
      }
    }

    return userRef;
  }

  firebase.initializeApp(config);

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({prompt: 'select_account'});
  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;