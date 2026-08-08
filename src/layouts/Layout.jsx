import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import ChatBot from "../components/ui/ChatBot";
import PageLoader from "../components/ui/PageLoader";
import CustomCursor from "../components/ui/CustomCursor";
import { useLenis } from "../hooks/useLenis";

const Layout = () => {
  const { pathname } = useLocation();
  useLenis();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="page-shell max-w-full overflow-x-clip bg-[var(--surface)] text-[var(--text-primary)]">
      <CustomCursor />
      <PageLoader />
      <Header />
      <main className="max-w-full overflow-x-clip">
        <Outlet />
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Layout;
