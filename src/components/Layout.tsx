import { Header } from "./Header";
import { Footer } from "./Footer";
import { Outlet } from "react-router-dom";
import  styles  from './Layout.module.scss'

const Layout = () => {
  return (
    <div className={styles.background}>
      <Header header={"Planeerimisalgoritmid"} />
      {/* <CssBaseline/> */}
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer text={"2022"}></Footer>
    </div>
  );
};

export default Layout;
