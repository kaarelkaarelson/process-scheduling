import { useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet, useLocation } from "react-router-dom";
import styles from "./Layout.module.scss";

const titles = {
  "/": "Home",
  "/scheduling": "Process Scheduling",
  "/memory": "Memory management",
  "/about": "About",
};

const Layout = () => {
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    const path: string = location.pathname;
    const newTitle = titles[path as keyof typeof titles];

    setTitle(newTitle ?? "");
  }, [location]);

  return (
    <div className={styles.background}>
      <Header header={title} />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer text={"2022"}></Footer>
    </div>
  );
};

export default Layout;
