import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { addDelimiter, processStringToArray, processStringToData } from "../utils/parser";
import { Typography, TextField, RadioGroup, Radio, FormControlLabel, Paper, Grid, useMediaQuery, useTheme } from "@mui/material";
import { Button } from "./Button";
import { ProcessReport } from "../shared/sharedTypes";
import { process2DArrayToSeparatedArrays } from "../utils/arrayManipulation";
import { firstComeFirstServe } from "../backend/algorithms/first-come-first-serve";
import { shortestJobFirst } from "../backend/algorithms/shortest-job-first";
import { roundRobin } from "../backend/algorithms/round-robin";
import { MemoryGrid } from "./MemoryGrid";
import { twoLevelFirstComeFirstServe } from "../backend/algorithms/two-level-first-come-first-serve";
import styles from "./ProcessScheduling.module.scss";
import variables from "../scss/variables.module.scss";

const fullOpaqueCSS = {
  bgcolor: variables.transparent,
};

const partialOpaqueCSS = {
  bgcolor: variables.transparentPartial,
};

let buttonNames = ["first-fit", "last-fit", "worst-fit", "random-fit", "clear"];

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

const RadioButtons = ({ option, changeOption, changeCustomField, error, processMap }: RadioButtonProps) => {
  return (
    <div>
      <RadioGroup value={option} onChange={(e) => changeOption(parseInt(e.target.value))} style={{ justifyContent: "100px" }}>
        {Array.from(processMap).map(([key]) => (
          <div key={key} className={styles.radioStyle}>
            <FormControlLabel
              value={key}
              control={<Radio size="small" color="secondary" sx={{ color: "secondary" }} />}
              label={key + "."}
            />
            <Typography align="center" style={{}}>
              {addDelimiter(processMap.get(key)!, ";")!}
            </Typography>
          </div>
        ))}
        <div>
          <FormControlLabel
            value={processMap.size + 1}
            control={<Radio size="small" color="secondary" />}
            label={processMap.size + 1 + "."}
          />
          <TextField
            disabled={option === 4 ? false : true}
            variant="outlined"
            error={error === "" ? false : true}
            size="small"
            style={{ padding: "0 0 0 0" }}
            onChange={(e) => {
              changeCustomField(e.target.value);
            }}
            onClick={(e) => changeOption(4)}
          />
        </div>
        {option === 4 && error !== "" && <div className={`${styles.errorBox}`}>{error}</div>}
      </RadioGroup>
    </div>
  );
};

const MemoryManagement = () => {
  const theme = useTheme();
  const isMobileScreen = useMediaQuery(theme.breakpoints.down("tablet"));

  const [option, setOption] = useState(1);
  const [textBox, setTextBox] = useState(addDelimiter(processMap.get(1)!, ";"));
  const [customField, setCustomField] = useState("");
  const [customFieldError, setCustomFieldError] = useState("");
  // TODO: Change the hook according to required data structure.
  const [response, setResponse] = useState<ProcessReport>({

    averageWaitTime: -1,
    history: null,
  });

  useEffect(() => {
    setTextBox(option <= processMap.size ? addDelimiter(processMap.get(option)!, ";") : option === 4 ? customField : "");
  }, [option, customField]);

  useEffect(() => {
    if (option === 4) {
      setCustomFieldError(getError()); // Validating in useEffect. Alternatively this can be achieved with component class state callback function.
    }
  }, [customField]);

  const getError = (): string => {
    const error =
      customField === ""
        ? "Error! Sisend ei saa olla tühi."
        : /\s/.test(customField)
        ? "Error! Sisendis ei tohi olla tühikuid."
        : /[a-zA-Z]/.test(customField)
        ? "Error! Sisendis ei tohi olla tähti."
        : !/^(?:\d+,\d+;)*\d+,\d+$/.test(customField)
        ? "Error! Sisend ei ole õiges formaadis."
        : "";

    return error;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    let button = e.currentTarget;
    let value = button.value;

    // TODO: Clear the memory grid
    if (value === 'clear') {

        return
    }

    let data;

    if (option === 4) {
      if (customField === "" || customFieldError !== "") {
        // TODO: Refactor setState outside conditional statement -> Breaking the first rule of React hooks
        setCustomFieldError(getError());
        return;
      }
      data = processStringToData(customField);
    } else {
      let processArray = option !== 4 ? processMap.get(option)! : processStringToArray(customField);
      data = process2DArrayToSeparatedArrays(processArray);
    }

    switch (value) {
      case "first-fit":
        break;
      case "last-fit":
        break;
      case "worst-fit":
        break;
      case "random-fit":
        break;
      default:
        setResponse({ averageWaitTime: -1, history: null });
    }
  };

  return (
    <Paper className={styles.wrapper} elevation={5} sx={fullOpaqueCSS}>
      <Grid container spacing={2} alignItems="stretch">
        <Grid item mobile={12} tablet={8}>
          <Paper className={`${styles.inputBlock} ${styles.glass} `} sx={partialOpaqueCSS}>
            <Typography>Choose or enter a 10-element array (with the following format: 0,1;1,11;3,3;4,1;8,6;14,2;25,1)</Typography>
            <RadioButtons
              option={option}
              changeOption={setOption}
              changeCustomField={setCustomField}
              error={customFieldError}
              processMap={processMap}
            ></RadioButtons>
            <Typography>Click the button to run the algorithm</Typography>
            <div className={styles.buttonsLayout}>
              {buttonNames.map((name, index) => (
                <Button
                  style={{
                    marginRight: "20px",
                    height: "40px",
                    fontSize: '15px',
                  }}
                  key={index}
                  color="primary"
                  value={name}
                  type="submit"
                  onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleClick(e)}
                >
                  {name}
                </Button>
              ))}
            </div>
          </Paper>
        </Grid>
        <Grid item mobile={12} tablet={4}>
          <Paper className={`${styles.displayBlock} ${styles.flexCol} ${styles.glass} `} sx={partialOpaqueCSS}>
            <Typography>Current memory processes:</Typography>
            <TextField
              disabled
              id="multiline"
              label=""
              multiline
              rows={isMobileScreen ? 1 : 10}
              value={textBox}
              variant="outlined"
            />
          </Paper>
        </Grid>
        <Grid item mobile={12} tablet={12}>
          <Paper className={`${styles.outputBlock} ${styles.flexCol} ${styles.glass} `} sx={partialOpaqueCSS}>
            <MemoryGrid />
          </Paper>
        </Grid>
      </Grid>
    </Paper>
  );
};

export { MemoryManagement };
