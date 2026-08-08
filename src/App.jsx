import { useCallback, useState } from "react";
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
