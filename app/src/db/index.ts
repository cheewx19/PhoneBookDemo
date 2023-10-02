// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC6P2cjWqmDqDgvQNDl04yMtSoDTMEz5CI",
  authDomain: "phonebook-f203e.firebaseapp.com",
  projectId: "phonebook-f203e",
  storageBucket: "phonebook-f203e.appspot.com",
  messagingSenderId: "662282529516",
  appId: "1:662282529516:web:7b6c750b9e2fbcdb4d93c9",
  measurementId: "G-GK8KG49WQF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default getFirestore(app)