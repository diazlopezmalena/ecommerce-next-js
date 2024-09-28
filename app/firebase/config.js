
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";  

const firebaseConfig = {
  apiKey: "AIzaSyBfw0lvTd53Iag_d-wHNIbcibiegMqmfDY",
  authDomain: "backend-nextjs-ecommerce.firebaseapp.com",
  projectId: "backend-nextjs-ecommerce",
  storageBucket: "backend-nextjs-ecommerce.appspot.com",
  messagingSenderId: "698152049827",
  appId: "1:698152049827:web:66e4bc90c47f8847faf316"
};

const app = initializeApp(firebaseConfig);
export const myDB = getFirestore(app);    
export const auth = getAuth(app);        