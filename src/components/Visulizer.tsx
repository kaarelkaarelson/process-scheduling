import React, { useEffect, useState, Dispatch, SetStateAction, CSSProperties } from "react";
import { selectColor } from "../utils/colorGenerator";
import distinctColors from "distinct-colors";
import styled from "styled-components";
import { Log } from "../shared/sharedTypes";

const UNIT_WIDTH = 30;

interface VisulizerProps {
  history: Log[];
}

interface RulerUnitProps {
  steps: number;
  unitValue: number;
}

interface UnitProps {
  steps: number;
  color: string;
}

// New Styled Components

const RulerUnit = styled.div<RulerUnitProps>`
  position: relative;

  display: flex;
  align-items: center;
  text-align: left;

  height: 50px;
  width: ${(props) => props.steps * UNIT_WIDTH + 1}px;

  border-left: 1px solid;
  border-image: linear-gradient(to bottom, grey 20%, transparent 20%) 0% 100% 1;

  > div {
    position: relative;
    left: ${(props) => (props.unitValue < 10 ? "-5" : "-9")}px;
  }
`;

const Unit = styled.div<UnitProps>`
  position: relative;

  display: flex;
  justify-content: center;
  align-items: center;

  height: 50px;
  width: ${(props) => props.steps * UNIT_WIDTH}px;
  /* width: ${(props) => props.steps * UNIT_WIDTH}%; */

  background-color: ${(props) => props.color};
  border: 1px solid grey;
`;

const Meter = styled.div`
  display: flex;
`;

const Visulizer = ({ history: report }: VisulizerProps) => {
  const palette = distinctColors({ count: report.length, lightMin: 40, chromaMin: 60 });

  const units: JSX.Element[] = [];
  const rulerUnits: JSX.Element[] = [];

  let lastEndTime = 0;

  if (report !== null) {
    Array.from(report!).map((process) => {
      const isEmptyBlock = lastEndTime! - process.startTime! !== 0;

      if (isEmptyBlock) {
        // console.log(lastEndTime, process.startTime);
        let secondsEmpty = process.endTime! - process.startTime!;

        console.log(secondsEmpty);
        units.push(
          <Unit steps={secondsEmpty} color={"white"}>
            {" "}
          </Unit>
        );

        rulerUnits.push(
          <RulerUnit steps={secondsEmpty} unitValue={lastEndTime}>
            <div>{lastEndTime}</div>
          </RulerUnit>
        );
      }

      let seconds = process.endTime! - process.startTime!;
      lastEndTime = process.endTime!;

      const color = palette[process.process.id - 1].css();
      console.log(seconds);

      units.push(
        <Unit steps={seconds} color={color}>
          {"P" + process.process.id}
        </Unit>
      );

      rulerUnits.push(
        <RulerUnit steps={seconds} unitValue={process.startTime!}>
          <div>{process.startTime}</div>
        </RulerUnit>
      );
    });

    // Adding the last endtime.
    rulerUnits.push(
      <RulerUnit steps={1} unitValue={lastEndTime}>
        <div>{lastEndTime}</div>
      </RulerUnit>
    );
  }

  return (
    <div>
      <Meter>{units}</Meter>
      <Meter>{rulerUnits}</Meter>
    </div>
  );
};

export { Visulizer };
