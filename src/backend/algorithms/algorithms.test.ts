import { process2DArrayToSeparatedArrays } from "../../utils/arrayManipulation";
import { firstComeFirstServe } from "./first-come-first-serve";
import { roundRobin } from "./round-robin";
import { shortestJobFirst } from "./shortest-job-first";

let process1: number[][] = [
  [0, 1],
  [1, 11],
  [3, 3],
  [4, 1],
  [8, 6],
  [14, 2],
  [25, 1],
];

let process2: number[][] = [
  [0, 1],
  [1, 11],
  [3, 3],
  [4, 1],
  [4, 2],
  [8, 6],
  [14, 2],
  [25, 1],
];

let process3: number[][] = [
  [0, 3],
  [3, 4],
  [4, 4],
  [7, 2],
  [9, 8],
];

let twoArrays = process2DArrayToSeparatedArrays(process1);
let at = twoArrays.arrivalTimes;
let bt = twoArrays.burstTimes;

test(`Testing the following process with FCFS ${process}`, () => {
  expect(firstComeFirstServe(at, bt).averageWaitTime).toBe(5.14);
});

test(`Testing the following processes with Shortest Job First${process}`, () => {
  expect(shortestJobFirst(at, bt).averageWaitTime).toBe(4.29);
});

test(`Testing the following processes with Round Robin${process}`, () => {
  expect(roundRobin(at, bt).averageWaitTime).toBe(4.29);
});
