import React, { useEffect, useState, Dispatch, SetStateAction, CSSProperties } from "react";
import distinctColors from "distinct-colors";
import styled from "styled-components";
import { Log } from "../shared/sharedTypes";

const UNIT_WIDTH = 30;

interface VisulizerProps {
  history: Log[];
}

interface RulerUnitProps {
  steps: number;
  unitWidth: number;
  unitValue: number;
}

interface UnitProps {
  steps: number;
  unitWidth: number;
  color: string;
}

// TODO: Refactor styled component style attributs to scss module for the next version
const RulerUnit = styled.div<RulerUnitProps>`
  position: relative;

  display: flex;
  align-items: center;
  text-align: left;

  height: 50px;
  width: ${(props) => props.steps * props.unitWidth + 1}px;

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
  width: ${(props) => props.steps * props.unitWidth}px;
  /* width: ${(props) => props.steps * UNIT_WIDTH}%; */

  background-color: ${(props) => props.color};
  border: 1px solid grey;
`;

const Meter = styled.div`
  display: flex;
`;

const Visulizer = ({ history: report }: VisulizerProps) => {
  const palette = distinctColors({ count: report.length,  lightMin: 30, chromaMin: 70 });

  const units: JSX.Element[] = [];
  const rulerUnits: JSX.Element[] = [];

  let lastEndTime = 0;

  if (report !== null) {
    Array.from(report!).map((process, index) => {
      const isEmptyBlock = lastEndTime! - process.startTime! !== 0;

      if (isEmptyBlock) {
        let secondsEmpty = process.endTime! - process.startTime!;

        units.push(<Unit key={'empty' + index} steps={secondsEmpty} unitWidth={UNIT_WIDTH} color={"white"}></Unit>);

        rulerUnits.push(
          <RulerUnit key={'empty' + index} steps={secondsEmpty} unitWidth={UNIT_WIDTH} unitValue={lastEndTime}>
            <div>{lastEndTime}</div>
          </RulerUnit>
        );
      }

      let seconds = process.endTime! - process.startTime!;
      lastEndTime = process.endTime!;

      const color = palette[process.process.id - 1].css();

      units.push(
        <Unit key={index} steps={seconds} unitWidth={UNIT_WIDTH} color={color}>
          {"P" + process.process.id}
        </Unit>
      );

      rulerUnits.push(
        <RulerUnit key={index} steps={seconds} unitWidth={UNIT_WIDTH} unitValue={process.startTime!}>
          <div>{process.startTime}</div>
        </RulerUnit>
      );
    });

    // Adding the last endtime to the ruler.
    rulerUnits.push(
      <RulerUnit key={report.length + 1} steps={1} unitWidth={UNIT_WIDTH} unitValue={lastEndTime}>
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
