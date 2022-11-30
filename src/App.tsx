import React from "react";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Content } from "./components/Content";

function App() {

  return (
    <div >
      <Header header={"Planeerimisalgoritmid"} />
      <Content />
      <Footer text={"2022"}></Footer>
    </div>
  );
}

export default App;
