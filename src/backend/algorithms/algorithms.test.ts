import { twoLevelFirstComeFirstServe } from './two-level-first-come-first-serve';
import { process2DArrayToSeparatedArrays } from "../../utils/arrayManipulation";
import { firstComeFirstServe } from "./first-come-first-serve";
import { roundRobin } from "./round-robin";
import { shortestJobFirst } from "./shortest-job-first";
import processes from "../../data/processes.json";

const data = processes;

const pattern1 = data[0];
const { arrivalTimes: at1, burstTimes: bt1 } = process2DArrayToSeparatedArrays(pattern1.processes);

const pattern2 = data[1];
const { arrivalTimes: at2, burstTimes: bt2 } = process2DArrayToSeparatedArrays(pattern2.processes);

const pattern3 = data[2];
const { arrivalTimes: at3, burstTimes: bt3 } = process2DArrayToSeparatedArrays(pattern3.processes);

test(`Testing the following process with FCFS ${process}`, () => {
  expect(firstComeFirstServe(at1, bt1).averageWaitTime).toBe(5.14);
});

test(`Testing the following processes with Shortest Job First ${process}`, () => {
  expect(shortestJobFirst(at1, bt1).averageWaitTime).toBe(4.29);
});

test(`Testing the following processes with Round Robin ${process}`, () => {
  expect(roundRobin(at1, bt1).averageWaitTime).toBe(4.29);
});

test(`Testing the following processes with Two Level First Come First Serve ${process}`, () => {
  expect(twoLevelFirstComeFirstServe(at1, bt1).averageWaitTime).toBe(2.57);
});
