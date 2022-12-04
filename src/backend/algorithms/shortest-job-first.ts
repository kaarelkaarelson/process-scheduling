import { round } from "../utils/numericHelper";
import { Process, ProcessReport, Log } from "../../shared/sharedTypes";
import PriorityQueue from "ts-priority-queue";

export const shortestJobFirst = (arrivalTimes: number[], burstTimes: number[]): ProcessReport => {
  let history: Log[] = [];
  let numOfProcesses = arrivalTimes.length;
  let i = 0; // index for arriving processes. 
  let totalTime = arrivalTimes[0]; 
  let totalWaitTime = 0;

  const priorityQueue = new PriorityQueue({ comparator: (a: Process, b: Process) => a.burstTime - b.burstTime });

  while (priorityQueue.length > 0 || i < numOfProcesses) {
    // Add arrived processes to priority queue
    for (let j = i; j < numOfProcesses; j++) {
      if (totalTime < arrivalTimes[j]) break;

      const process: Process = {
        id: j + 1,
        arrivalTime: arrivalTimes[j],
        burstTime: burstTimes[j],
      };

      priorityQueue.queue(process);
      i += 1;
    }

    if (priorityQueue.length == 0) {
      // Idle time
      totalTime = arrivalTimes[i];
      continue;
    }

    const currProcess = priorityQueue.dequeue();

    const log: Log = {
      process: currProcess,
      startTime: totalTime,
      endTime: null,
      timeRemaining: currProcess.burstTime,
    };

    totalWaitTime += totalTime - currProcess.arrivalTime;
    let totalTimeBefore = totalTime; // Time before starting process

    totalTime += currProcess.burstTime; // Time after completing process

    log.endTime = totalTime;
    log.timeRemaining! -= totalTime - totalTimeBefore;
    history.push(log);
  }

  const averageWaitTime = totalWaitTime / numOfProcesses;

  return { averageWaitTime: round(averageWaitTime, 2), history: history };
};
