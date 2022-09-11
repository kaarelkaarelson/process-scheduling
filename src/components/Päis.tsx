import React from "react";
import { isPropertySignature } from "typescript";

interface Props {
    tekst: String
}

const Päis: React.FC<Props> = (props) => {
  return (
    <h1>{props.tekst}</h1>
  );
};

export {Päis}