import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { motion } from "framer-motion";
import {FaUser} from "react-icons/fa"

export default function AuthForm() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate("/"); // redirect after success
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-10 w-full max-w-md border border-white/20"
      >
        {/* Logo / Header */}
        <div className="flex flex-col items-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
            className="text-5xl mb-2"
          >
            🎓
          </motion.div>
          <h3 className="text-xl font-bold text-center text-white drop-shadow mb-2">
            Welcome To
          </h3>
          <h1 className="text-3xl font-extrabold text-center text-white drop-shadow mb-2">
            Student Council
          </h1>
          <p className="text-center text-white/80">
            Sign in with Google to access your dashboard
          </p>
        </div>

        {/* Google Login Button */}
        <motion.button
          whileTap={{ scale: 0.97 }}
          whileHover={{ scale: 1.02 }}
          onClick={handleGoogleLogin}
          disabled={loading}
          className="flex items-center justify-center gap-3 bg-white text-gray-800 py-3 w-full rounded-xl font-semibold shadow-lg hover:shadow-xl transition disabled:opacity-50"
        >
          <img
            src="https://www.svgrepo.com/show/355037/google.svg"
            alt="Google"
            className="w-6 h-6"
          />
          {loading ? "Processing..." : "Continue with Google"}
        </motion.button>

        {/* Optional User Info */}
        {auth.currentUser && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 text-center"
          >
            <img
              src={auth.currentUser.photoURL || <FaUser />}
              alt="Profile"
              className="w-20 h-20 rounded-full mx-auto shadow-lg border-2 border-white/40"
            />
            <h3 className="text-lg font-semibold text-white mt-3">
              {auth.currentUser.displayName || "Student"}
            </h3>
            <p className="text-white/70 text-sm">{auth.currentUser.email}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
