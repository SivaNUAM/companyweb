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
      <div
        className={ready ? "opacity-100" : "opacity-0"}
        style={{ transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1)" }}
        aria-hidden={!ready}
      >
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
