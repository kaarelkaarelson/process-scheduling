import Layout from "./components/Layout";
import { ProcessScheduling } from "./components/ProcessScheduling";
import { Route, Routes } from "react-router-dom";
import { Welcome } from "./components/Welcome";
import { Page404 } from "./components/Page404";
import { MemoryManagement } from "./components/MemoryManagement";
import { About } from "./components/About";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Welcome />} />
          <Route path="scheduling" element={<ProcessScheduling />} />
          <Route path="memory" element={<MemoryManagement />} />
          <Route path="about" element={<About/>} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
