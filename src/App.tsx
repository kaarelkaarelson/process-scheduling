import React from "react";
import "./App.css";
import { Menüü } from "./components/Menüü";
import { Päis } from "./components/Päis";
import { TextField } from "./components/TextField";

function App() {
  return (
    <div>
      <Päis tekst={"Planeerimisalgoritmid"}/>
      <Menüü info={"tere"} />
    </div>
  );
}

export default App;
