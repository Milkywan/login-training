// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

// Konfigurasi Firebase Anda (gunakan yang sudah Anda tempel sebelumnya)
const firebaseConfig = {
  apiKey: "AIzaSyAgoebmwFuCsE19UDVxojLqGmd4cSHhaD4",
  authDomain: "datatraining-irwans.firebaseapp.com",
  projectId: "datatraining-irwans",
  storageBucket: "datatraining-irwans.firebasestorage.app",
  messagingSenderId: "397162458611",
  appId: "1:397162458611:web:eb00c75a2cf15f9a13b686",
  measurementId: "G-NCWBDH377R"
};

// Inisialisasi Firebase App
const app = initializeApp(firebaseConfig);

// Dapatkan instance Auth dan Firestore
const auth = getAuth(app);
const db = getFirestore(app);

// Ekspor instance ini agar bisa digunakan di file lain
export { app, auth, db };
