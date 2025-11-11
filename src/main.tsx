import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AppProvider } from "./context/AppContext.tsx";
import { BrowserRouter } from "react-router";
import { ClerkProvider } from "@clerk/clerk-react";

const PUBLISHABLE_KEY: string = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key!");
}

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <AppProvider>
          <App />
        </AppProvider>
      </ClerkProvider>
    </StrictMode>
  </BrowserRouter>
);
