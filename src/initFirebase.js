// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDUCJVqwCyz2EVMPOHTzb2mOEbrSPFRgh4",
  authDomain: "students-project-258de.firebaseapp.com",
  projectId: "students-project-258de",
  storageBucket: "students-project-258de.appspot.com",
  messagingSenderId: "665500347102",
  appId: "1:665500347102:web:8121cdd201c3abbb40704f",
  measurementId: "G-3C7EN7NEW9"
};

// Initialize Firebase and Analytics
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);


// Initialize Cloud Firestore and get a reference to the service
export const firestore = getFirestore(app);