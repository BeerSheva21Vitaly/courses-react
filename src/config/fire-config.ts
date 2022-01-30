// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXQVNmy3VVj3L4XuBPlS6GiSUbBnWuubA",
    authDomain: "courses-fc41d.firebaseapp.com",
    projectId: "courses-fc41d",
    storageBucket: "courses-fc41d.appspot.com",
    messagingSenderId: "236684767324",
    appId: "1:236684767324:web:fc8cea2e3e267b3fceb699"
};

// Initialize Firebase
const appFire = initializeApp(firebaseConfig);
export default appFire;