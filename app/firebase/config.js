// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfw0lvTd53Iag_d-wHNIbcibiegMqmfDY",
  authDomain: "backend-nextjs-ecommerce.firebaseapp.com",
  projectId: "backend-nextjs-ecommerce",
  storageBucket: "backend-nextjs-ecommerce.appspot.com",
  messagingSenderId: "698152049827",
  appId: "1:698152049827:web:66e4bc90c47f8847faf316"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const myDB = getFirestore(app)

// Antes importar
// export const storage = getStorage(app);
// export const auth = getAuth(app);
// export const provider = new GoogleAuthProvider();