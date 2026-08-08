import { useCallback, useEffect, useState } from "react";
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
  const onWelcomeDone = useCallback(() => setReady(true), []);

  // Failsafe — never leave the app interaction-locked
  useEffect(() => {
    if (ready) return undefined;
    const t = window.setTimeout(() => {
      setReady(true);
      document.documentElement.classList.remove("welcome-loading");
      document.body.style.overflow = "";
    }, 5000);
    return () => window.clearTimeout(t);
  }, [ready]);

  return (
    <>
      <WelcomeLoader onDone={onWelcomeDone} />
      {/* Keep the page painted under the loader — no opacity fade / white flash */}
      <div
        className={ready ? undefined : "pointer-events-none select-none"}
        aria-hidden={!ready}
      >
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
