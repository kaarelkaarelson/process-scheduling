import React, { useEffect, useState, Dispatch, SetStateAction, CSSProperties } from "react";
import { addDelimiter, processStringToArray } from "../utils/textProcessing";
import { Typography, TextField, RadioGroup, Radio, FormControlLabel } from "@material-ui/core";
import { Button } from "./Button";
import { Log, ProcessReport } from "../shared/sharedTypes";
import { validateProcessString } from "../utils/validator";
import { process2DArrayToSeparatedArrays } from "../utils/arrayManipulation";
import { firstComeFirstServe } from "../backend/algorithms/first-come-first-serve";
import { shortestJobFirst } from "../backend/algorithms/shortest-job-first";
import { roundRobin } from "../backend/algorithms/round-robin";
import { Visulizer } from "./Visulizer";
import { twoLevelFirstComeFirstServe } from "../backend/algorithms/two-level-first-come-first-serve";

const borderStyle = {
  border: "1px solid grey",
};

let buttonNames = ["fcfs", "sjf", "rr", "2x fcfs"];

let algorithmsMap = new Map<string, (waitTimes: number[], burstTimes: number[]) => ProcessReport>([
  ["fcfs", firstComeFirstServe],
  ["sjf", shortestJobFirst],
  ["rr", roundRobin],
  ["2x fcfs", roundRobin],
]);

let processSequence1: number[][] = [
  [0, 1],
  [1, 11],
  [3, 3],
  [4, 1],
  [8, 6],
  [14, 2],
  [25, 1],
];

let processSequence2: number[][] = [
  [0, 7],
  [1, 5],
  [2, 3],
  [3, 1],
  [4, 2],
  [5, 1],
];

let processSequence3: number[][] = [
  [0, 2],
  [1, 4],
  [12, 4],
  [15, 5],
  [21, 10],
];

const processMap: Map<number, number[][]> = new Map<number, number[][]>([
  [1, processSequence1],
  [2, processSequence2],
  [3, processSequence3],
]);

interface RadioButtonProps {
  option: number;
  changeOption: Dispatch<SetStateAction<number>>;
  changeCustomField: Dispatch<SetStateAction<string>>;
  error: string;
  processMap: Map<number, number[][]>;
}

const RadioButtons = ({ option, error, changeOption, changeCustomField, processMap }: RadioButtonProps) => {
  const radioStyle = {
    display: "flex",
    alignItems: "center",
  };

  const errorBox: CSSProperties = {
    color: "red",
    width: "fit-content",
    textAlign: "left",
    border: "1px solid black",
  };

  return (
    <div>
      <RadioGroup value={option} onChange={(e) => changeOption(parseInt(e.target.value))} style={{ justifyContent: "100px" }}>
        {Array.from(processMap).map(([key, order]) => (
          <div style={radioStyle}>
            <FormControlLabel value={key} control={<Radio size="small" />} label={key + "."} />
            <Typography align="center" style={{}}>
              {addDelimiter(processMap.get(key)!, ";")!}
            </Typography>
          </div>
        ))}
        <div>
          <FormControlLabel value={processMap.size + 1} control={<Radio size="small" />} label={processMap.size + 1 + "."} />

          <TextField
            disabled={option === 4 ? false : true}
            variant="outlined"
            error={error === "" ? false : true}
            size="small"
            style={{ padding: "0 0 0 0" }}
            onBlur={(e) => changeCustomField(e.target.value)}
            onClick={(e) => changeOption(4)}
            // autoFocus={option === 4 ? true : false}
          />
        </div>
        {error !== "" && <div style={errorBox}>{error}</div>}
      </RadioGroup>
    </div>
  );
};

const Content = () => {
  const [option, setOption] = useState(1);
  const [textBox, setTextBox] = useState(addDelimiter(processMap.get(1)!, ";")); // Refactor string
  const [customField, setCustomField] = useState("");
  const [customFieldError, setCustomFieldError] = useState("");
  const [response, setResponse] = useState<ProcessReport>({
    averageWaitTime: -1,
    history: null,
  });

  useEffect(() => {
    setTextBox(option <= processMap.size ? addDelimiter(processMap.get(option)!, ";") : option === 4 ? customField : "");
  }, [option, customField]);

  useEffect(() => {
    if (option == 4) {
      setCustomFieldError(getError()); // Validating in useEffect. Alternatively this can be achieved with component class state callback function.
      validateProcessString(customField);
    }
  }, [customField]);

  useEffect(() => {}, [response]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let button = e.currentTarget;
    // let button = e.target as HTMLButtonElement // Alternative - for MUI may return depending on where user clickshowever might return an element inside the butto

    let value = button.value;
    console.log(value);

    let newReport: ProcessReport;

    let processArray = processMap.get(option)!;
    let twoArrays = process2DArrayToSeparatedArrays(processArray);
    let at = twoArrays.arrivalTimes;
    let bt = twoArrays.burstTimes;

    switch (value) {
      case "fcfs":
        newReport = firstComeFirstServe(at, bt);
        setResponse(newReport);
        break;
      case "sjf":
        newReport = shortestJobFirst(at, bt);
        setResponse(newReport);
        break;
      case "rr":
        newReport = roundRobin(at, bt);
        setResponse(newReport);
        break;
      case "2x fcfs":
        newReport = twoLevelFirstComeFirstServe(at, bt);
        setResponse(newReport);
        break;
      default:
        setResponse({ averageWaitTime: -1, history: null });
    }
  };

  const getError = (): string => {
    const error = /\s/.test(customField)
      ? "Error! Sisendis ei tohi olla tühikuid."
      : /\w/.test(customField)
      ? "Error! Sisendis ei tohi olla tähti."
      : !/^(?:\d+,\d+;)*\d+,\d+$/.test(customField)
      ? "Error! Sisend ei ole õiges formaadis."
      : "";

    console.log(error);
    return error;
  };

  const wrapper = {
    display: "grid",
    gridGap: "10px",
    gridTemplateColumns: "auto 40%", // Fraction also work well for grids.
    backgroundColor: "#fff",
    color: "#444",

    height: "500px",
    maxHeight: "500px",
    margin: "120px 30px 20px 30px",
    padding: "10px",
  };

  const flexCol: CSSProperties = {
    display: "flex",
    flexDirection: "column",
  };

  const inputBlock: CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gridColumn: "1",
    gridRow: "1",

    padding: "10px",
  };

  const displayBlock: CSSProperties = {
    justifyContent: "space-between",
    gridColumn: "2",
    gridRow: "1",

    padding: "10px",
  };

  const outputBlock: CSSProperties = {
    // position: 'relative',
    display: "grid",
    gridTemplateRows: 2,
    justifyContent: "space-between",
    gridColumn: "1 / 3",
    gridRow: "2",

    padding: "10px",
  };

  const buttonsLayout = {
    display: "flex",
  };

  return (
    <div style={{ ...wrapper, ...borderStyle }}>
      <div style={{ ...inputBlock, ...borderStyle }}>
        <Typography>Vali või sisesta järjend (kujul 0,1;1,11;3,3;4,1;8,6;14,2;25,1)</Typography>
        <RadioButtons
          option={option}
          changeOption={setOption}
          changeCustomField={setCustomField}
          error={customFieldError}
          processMap={processMap}
        ></RadioButtons>
        <Typography>Algoritmi käivitamiseks klõpsa nupule</Typography>
        <div style={buttonsLayout}>
          {buttonNames.map((name, index) => (
            <Button
              style={{
                marginRight: "20px",
                height: "40px",
              }}
              key={index}
              value={name}
              type="submit"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(e)}
            >
              {name}
            </Button>
          ))}
        </div>
      </div>
      <div style={{ ...displayBlock, ...flexCol, ...borderStyle }}>
        <Typography>Käsil olevad protsessid:</Typography>
        <TextField
          disabled
          id="outlined-multiline-disabled"
          label=""
          multiline
          rows={10}
          // defaultValue={textBox}
          value={textBox}
          variant="outlined" // was filled
        />
      </div>
      <div style={{ ...outputBlock, ...flexCol, ...borderStyle }}>
        {response.history && <Visulizer history={response.history}></Visulizer>}
        <Typography style={{ gridRow: "2" }}>
          Keskmine ooteaeg: {response.averageWaitTime !== -1 && response.averageWaitTime}
        </Typography>
      </div>
      <p style={{ marginTop: "30px", display: "none" }}>
        {option}, {processMap.size} | {textBox}
      </p>
    </div>
  );
};

export { Content };
