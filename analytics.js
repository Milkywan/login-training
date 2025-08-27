import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics, logEvent } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
  apiKey: "AIzaSyAgoebmwFuCsE19UDVxojLqGmd4cSHhaD4",
  authDomain: "datatraining-irwans.firebaseapp.com",
  projectId: "datatraining-irwans",
  storageBucket: "datatraining-irwans.firebasestorage.app",
  messagingSenderId: "397162458611",
  appId: "1:397162458611:web:eb00c75a2cf15f9a13b686",
  measurementId: "G-NCWBDH377R"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export function logCustomEvent(eventName, eventParams = {}) {
  if (analytics) {
    logEvent(analytics, eventName, eventParams);
    console.log(`Analytics Event Logged: ${eventName}`, eventParams);
  }
}

console.log("Firebase Analytics initialized.");
