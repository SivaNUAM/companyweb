import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatBot from "../components/ui/ChatBot";
import { useLenis } from "../hooks/useLenis";

const Layout = () => {
  const { pathname } = useLocation();
  useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="page-shell bg-[var(--surface)] text-[var(--text-primary)]">
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Layout;
