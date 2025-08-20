import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // ✅ add router
import "./index.css";
import App from "./App.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

// Global error handling to prevent app from getting stuck
window.addEventListener('error', (event) => {
  console.error('Global error caught:', event.error);
  // Prevent default error handling that might cause the app to freeze
  event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Prevent default rejection handling
  event.preventDefault();
});

// Ensure the app can recover from critical errors
window.addEventListener('beforeunload', () => {
  // Clean up any pending operations
  console.log('App unloading, cleaning up...');
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
