import { info } from "console";
import React from "react";
import { Sisend } from "./Sisend";

let mustrid = new Map<number, Array<number>>([
  [1, [0.1, 1, 11, 3.3, 4.1, 8, 6, 14, 2, 25, 1]],
  [2, [0.1, 2, 11, 4.3, 4.1, 10, 6, 12, 2, 20, 1]],
]);

let mapNäide: { [id: number]: string } = {
  1: "Esimene",
  2: "Teine",
  3: "Kolmas",
};

let järjestus = new Map<number, string>([
  [1, "Esimene"],
  [2, "Teine"],
  [3, "Kolmas"],
]);

let algoritmid: string[] = ["FCFS", "SJF", "RR", "FCFS"];

export const Menüü: React.FC<{ info: string }> = (props) => {
  return (
    <div>
      <h1>{props.info}</h1>
      <Sisend
        mustrid={mustrid}
        järjestus={järjestus}
        funktsioonid={algoritmid}
      />
    </div>
  );
};
