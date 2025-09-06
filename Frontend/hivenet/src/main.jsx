import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/base.css";
import { LanguageProvider } from "./context/LanguageContext";
import { NotifyProvider } from "./context/NotifyContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LanguageProvider>
      <NotifyProvider>
        <App />
      </NotifyProvider>
    </LanguageProvider>
  </React.StrictMode>
);
