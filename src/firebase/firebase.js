import { initializeApp } from "firebase/app";
import { 
  getAuth, GoogleAuthProvider, signInWithRedirect, signOut, 
  signInWithEmailAndPassword, createUserWithEmailAndPassword,
  signInWithPopup 
} from "firebase/auth";
import { doc, getDoc, getFirestore, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh-iED_SX64ZN75m282JUpbLMM1tB_t7U",
  authDomain: "task-mangement-app-1f2eb.firebaseapp.com",
  projectId: "task-mangement-app-1f2eb",
  storageBucket: "task-mangement-app-1f2eb.firebasestorage.app",
  messagingSenderId: "90472714582",
  appId: "1:90472714582:web:cc31beb41157ca696446f7"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const uid = userAuth.uid;
  const userRef = doc(db, "users", uid);
  const docSnap = await getDoc(userRef);

  if (!docSnap.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userRef, {
        uid,
        displayName: displayName || '',
        email: email || '',
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log("Error creating user:", error.message);
    }
  }
  return userRef;
};

export { 
  db, auth, googleProvider, signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, signOut, signInWithRedirect, 
  createUserProfileDocument, signInWithPopup 
};
