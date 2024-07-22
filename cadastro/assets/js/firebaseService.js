import { auth, db } from '../assets/js/firebase-config.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-auth.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

const firebaseService = {
  signup: async (email, password) => {
    console.log('Signup function called with:', { email, password });
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up:', userCredential.user);
      return userCredential.user;
    } catch (error) {
      console.error("Error signing up:", error);
      throw error;
    }
  },
  addUserData: async (userId, data) => {
    console.log('addUserData function called with:', { userId, data });
    try {
      await addDoc(collection(db, "instituicoes"), {
        userId: userId,
        ...data
      });
      console.log('User data added to Firestore:', data);
    } catch (error) {
      console.error("Error adding document:", error);
      throw error;
    }
  }
};

export default firebaseService;
