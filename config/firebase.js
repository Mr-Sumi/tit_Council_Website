import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCCU-1KAkjzvK_I3Yt6aXl4Ip4jSNe4Tq0",
  authDomain: "student-counciltit.firebaseapp.com",
  projectId: "student-counciltit",
  storageBucket: "student-counciltit.firebasestorage.app",
  messagingSenderId: "914003581541",
  appId: "1:914003581541:web:3e041696447aa34717448c",
  measurementId: "G-3TZ8449JQY"
};

const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);

export { firebaseApp, analytics };
