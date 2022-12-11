import Layout from "./components/Layout";
import { Content } from "./components/Content";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "./components/Welcome";
import { Page404 } from "./components/Page404";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="scheduling" element={<Content />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
