// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD9ycRwGMJiKUnskKajMR-qJY_DJs8Wxxk",
    authDomain: "simple-email-password-au-c3bec.firebaseapp.com",
    projectId: "simple-email-password-au-c3bec",
    storageBucket: "simple-email-password-au-c3bec.appspot.com",
    messagingSenderId: "242390041530",
    appId: "1:242390041530:web:18b6120b6ba9b2505d9383"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;