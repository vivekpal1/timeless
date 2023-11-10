import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider, TwitterAuthProvider  } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA61jWvrezmA663s5tcbrEnojXIMfOWcOk",
    authDomain: "timelessarweave.firebaseapp.com",
    projectId: "timelessarweave",
    storageBucket: "timelessarweave.appspot.com",
    messagingSenderId: "380753124017",
    appId: "1:380753124017:web:ce4a3590a4eaeb91562090",
    measurementId: "G-RZ2D09WWFY"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    const user = result.user;
    return { user, token };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { auth, signInWithGoogle };
