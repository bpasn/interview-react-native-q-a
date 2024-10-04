import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA6ya9OmRZTZOCvKvJsw7t7uoeJf-oJtnw",
  authDomain: "questionandasnwer.firebaseapp.com",
  projectId: "questionandasnwer",
  storageBucket: "questionandasnwer.appspot.com",
  messagingSenderId: "582682881442",
  appId: "1:582682881442:web:988bb2732b79e1ec7dd6fb",
  measurementId: "G-1CYGGF6XWF"
};

export const app = initializeApp(firebaseConfig);
export const storageFirebase = getFirestore(app);
// export const refStore = (path: string):StorageReference  => ref(storageFirebase, path);