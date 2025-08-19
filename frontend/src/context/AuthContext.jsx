import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authReady, setAuthReady] = useState(false);

  useEffect(() => {
    try {
      // Check if auth object has the expected methods
      if (auth && typeof auth.onAuthStateChanged === 'function') {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
          setUser(firebaseUser || null);
          setAuthReady(true);
        }, (error) => {
          console.error("Auth state change error:", error);
          setUser(null);
          setAuthReady(true);
        });
        return () => unsubscribe();
      } else {
        // Fallback for mock auth object
        setUser(null);
        setAuthReady(true);
      }
    } catch (error) {
      console.error("Auth context error:", error);
      setUser(null);
      setAuthReady(true);
    }
  }, []);

  const logout = async () => {
    try {
      if (auth && typeof auth.signOut === 'function') {
        await signOut(auth);
      }
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, logout, authReady }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
