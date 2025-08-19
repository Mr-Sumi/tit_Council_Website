import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Check if environment variables exist, provide fallbacks
const getEnvVar = (key, fallback = "") => {
  const value = import.meta.env[key];
  if (!value) {
    console.warn(`Missing environment variable: ${key}`);
    return fallback;
  }
  return value;
};

const firebaseConfig = {
    apiKey: getEnvVar("VITE_FIREBASE_API_KEY"),
    authDomain: getEnvVar("VITE_FIREBASE_AUTH_DOMAIN"),
    projectId: getEnvVar("VITE_FIREBASE_PROJECT_ID"),
    storageBucket: getEnvVar("VITE_FIREBASE_STORAGE_BUCKET"),
    messagingSenderId: getEnvVar("VITE_FIREBASE_MESSAGING_SENDER_ID"),
    appId: getEnvVar("VITE_FIREBASE_APP_ID"),
};

// Only initialize Firebase if we have the required config
let app;
let auth;

try {
  if (firebaseConfig.apiKey && firebaseConfig.authDomain) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    console.log("Firebase initialized successfully");
  } else {
    console.warn("Firebase configuration incomplete, authentication will be disabled");
    // Create a mock auth object for development
    auth = {
      onAuthStateChanged: (callback) => {
        callback(null);
        return () => {};
      },
      signOut: () => Promise.resolve(),
      currentUser: null
    };
  }
} catch (error) {
  console.error("Failed to initialize Firebase:", error);
  // Create a mock auth object as fallback
  auth = {
    onAuthStateChanged: (callback) => {
      callback(null);
      return () => {};
    },
    signOut: () => Promise.resolve(),
    currentUser: null
  };
}

// ✅ Export Auth instance
export { auth };
export default app;
