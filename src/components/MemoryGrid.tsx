import React, { useEffect, useState, Dispatch, SetStateAction, CSSProperties } from "react";
import distinctColors from "distinct-colors";
import styles from "./MemoryGrid.module.scss";
import { Log } from "../shared/sharedTypes";

// TODO: Create a datastructure to props for vizualizing memory management algorithms
interface MemoryGridProps {
  history?: [];
}

const MemoryGrid = ({ history }: MemoryGridProps) => {
  //   const palette = distinctColors({ count: report.length,  lightMin: 30, chromaMin: 70 });

  const filledGrid = () => {
    let blocks: JSX.Element[] = [];

    // X-axis headings
    blocks.push(
      <div key={"phase"} className={styles.headingY}>
        Phase
      </div>
    );

    for (let i = 0; i < 50; i++) {
      blocks.push(
        <div key={"x" + i} className={styles.headingX}>
          {i}
        </div>
      );
    }

    for (let i = 1; i <= 10; i++) {
      // Y-axis headings
      blocks.push(
        <div key={"y" + i} className={styles.headingY}>
          {i}
        </div>
      );

      for (let j = 0; j < 50; j++) {
        blocks.push(
          <div key={`${i}${j}`} className={styles.square}>
            -
          </div>
        );
      }
    }

    return blocks;
  };

  return <div className={styles.grid}>{filledGrid()}</div>;
};

export { MemoryGrid };
