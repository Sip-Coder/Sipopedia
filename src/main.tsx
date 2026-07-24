import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext";
import { AccessProvider } from "./context/AccessContext";
import { ArticleLibraryProvider } from "./context/ArticleLibraryContext";
import { ArticlePreferencesProvider } from "./context/ArticlePreferencesContext";
import { AppErrorBoundary } from "./components/AppErrorBoundary";
import { GlobalShootingStars } from "./components/GlobalShootingStars";
import { trackEvent } from "./lib/analytics";
import { captureAndScrubAuthCallbackFromUrl } from "./lib/authCallback";
import "./styles.css";

if (typeof window !== "undefined") {
  captureAndScrubAuthCallbackFromUrl();

  window.addEventListener("error", (event) => {
    trackEvent("app_runtime_error", {
      message: event.message,
      source: event.filename,
      line: event.lineno,
      column: event.colno
    });
  });

  window.addEventListener("unhandledrejection", (event) => {
    const reason = event.reason instanceof Error ? event.reason.message : String(event.reason ?? "unknown");
    trackEvent("app_unhandled_rejection", { reason });
  });
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AppErrorBoundary
      onError={(error, info) => {
        trackEvent("app_render_error", {
          message: error.message,
          stack: error.stack,
          componentStack: info.componentStack
        });
      }}
    >
      <AuthProvider>
        <ArticlePreferencesProvider>
          <ArticleLibraryProvider>
            <AccessProvider>
              <GlobalShootingStars />
              <App />
            </AccessProvider>
          </ArticleLibraryProvider>
        </ArticlePreferencesProvider>
      </AuthProvider>
    </AppErrorBoundary>
  </React.StrictMode>
);
