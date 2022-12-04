import { round } from "../utils/numericHelper";
import { Process, ProcessReport, Log } from "../../shared/sharedTypes";
import PriorityQueue from "ts-priority-queue";

export const roundRobin = (arrivalTimes: number[], burstTimes: number[]): ProcessReport => {
  let history: Log[] = [];
  let numOfProcesses = arrivalTimes.length;
  let i = 0; // index for arriving processes.
  let totalTime = arrivalTimes[0];
  let totalWaitTime = 0;
  let quantum = 5;

  const priorityQueue = new PriorityQueue({
    comparator: (a: Log, b: Log) => {
      return a.endTime === null && b.endTime === null
        ? a.process.arrivalTime - b.process.arrivalTime
        : a.endTime === null
        ? -1
        : b.endTime === null
        ? 1
        : a.endTime - b.endTime;
    },
  });

  while (priorityQueue.length > 0 || i < numOfProcesses) {

    // Adding arrived processes to priority queue
    for (let j = i; j < numOfProcesses; j++, i++) {
      if (totalTime < arrivalTimes[j]) break;

      const process: Process = {
        id: j + 1,
        arrivalTime: arrivalTimes[j],
        burstTime: burstTimes[j],
      };

      const log: Log = {
        process: process,
        startTime: null,
        endTime: null,
        timeRemaining: process.burstTime,
      };

      priorityQueue.queue(log);
    }

    // Idle time
    if (priorityQueue.length == 0) {
      totalTime = arrivalTimes[i];
      continue;
    }

    const processLog = priorityQueue.dequeue();

    totalWaitTime += totalTime - (processLog.endTime ?? processLog.process.arrivalTime);
    let workTime = Math.min(quantum, processLog!.timeRemaining);

    processLog.startTime = totalTime;
    processLog.endTime = totalTime + workTime;
    processLog.timeRemaining -= workTime;

    totalTime = processLog.endTime;

    let copyLog = Object.assign({}, processLog);
    history.push(copyLog);

    if (processLog.timeRemaining == 0) continue;

    priorityQueue.queue(processLog);
  }

  const averageWaitTime = totalWaitTime / numOfProcesses;

  return { averageWaitTime: round(averageWaitTime, 2), history: history };
};
