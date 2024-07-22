import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js";

// Sua configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAbzHqrxU1bfZlCe8LWtizy12-40zdUfDE",
  authDomain: "teste-97fc6.firebaseapp.com",
  projectId: "teste-97fc6",
  storageBucket: "teste-97fc6.appspot.com",
  messagingSenderId: "470428227917",
  appId: "1:470428227917:web:ef9308034050ca366a3f04",
  measurementId: "G-F50QJE3734"
};

console.log('Initializing Firebase with config:', firebaseConfig);

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

console.log('Firebase initialized:', { app, auth, db, analytics });

export { auth, db };
