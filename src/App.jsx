import { startTransition, useCallback, useEffect, useState } from "react";
import AppRoutes from "./routes/index";
import WelcomeLoader from "./components/ui/WelcomeLoader";

function App() {
  const [ready, setReady] = useState(() => {
    try {
      return sessionStorage.getItem("nuam-welcome-seen") === "1";
    } catch {
      return false;
    }
  });

  const onWelcomeDone = useCallback(() => {
    // Don't block the loader slide-up with a sync Home mount
    startTransition(() => setReady(true));
  }, []);

  // Failsafe — never leave the app interaction-locked
  useEffect(() => {
    if (ready) return undefined;
    const t = window.setTimeout(() => {
      setReady(true);
      document.documentElement.classList.remove("welcome-loading");
      document.body.style.overflow = "";
    }, 4000);
    return () => window.clearTimeout(t);
  }, [ready]);

  return (
    <>
      <WelcomeLoader onDone={onWelcomeDone} />
      {/*
        Mount routes only after welcome finishes (or exits).
        Painting the full Home tree under the loader was the main mobile stall.
        Loader covers the screen until exit, so no white flash.
      */}
      {ready ? <AppRoutes /> : null}
    </>
  );
}

export default App;
