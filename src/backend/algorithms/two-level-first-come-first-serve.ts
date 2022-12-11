import { Queue } from "queue-typescript";
import { round } from "../utils/numericHelper";
import { Process, ProcessReport, Log } from "../../shared/sharedTypes";

export const twoLevelFirstComeFirstServe = (arrivalTimes: number[], burstTimes: number[]): ProcessReport => {
  let history: Log[] = [];
  let currProcessLog: Log | null = null;
  let numOfProcesses = arrivalTimes.length;
  let i = 0; // index for arriving processes.
  let totalTime = 0;
  let totalWaitTime = 0;

  // Processes with burst time <= pivot ==> high priority queue
  // Processes with burst time > pivot ==> low priority queue
  let pivot = 5;
  const highPriorityQueue = new Queue<Log>();
  const lowPriorityQueue = new Queue<Log>();

  while (i < numOfProcesses || currProcessLog !== null || lowPriorityQueue.length > 0 || highPriorityQueue.length > 0) {
    // Adding arrived process to priority queue
    if (totalTime === arrivalTimes[i]) {
      const process: Process = {
        id: i + 1,
        arrivalTime: arrivalTimes[i],
        burstTime: burstTimes[i],
      };

      const log: Log = {
        process: process,
        startTime: null,
        endTime: null,
        timeRemaining: process.burstTime,
      };

      if (isHighPriorityProcess(process, pivot)) highPriorityQueue.enqueue(log);
      else lowPriorityQueue.enqueue(log);

      i++;
    }

    if (currProcessLog !== null) {
      if (currProcessLog.timeRemaining === 0) {
        currProcessLog.endTime = totalTime;

        let copyLog = Object.assign({}, currProcessLog);
        history.push(copyLog);

        currProcessLog = null;
      } else if (!isHighPriorityProcess(currProcessLog.process, pivot) && highPriorityQueue.length > 0) {
        currProcessLog.endTime = totalTime;

        let copyLog = Object.assign({}, currProcessLog);
        history.push(copyLog);

        if (currProcessLog.timeRemaining <= pivot) highPriorityQueue.enqueue(currProcessLog) 
        else lowPriorityQueue.enqueue(currProcessLog);

        currProcessLog = highPriorityQueue.dequeue();

        currProcessLog.startTime = totalTime;
        totalWaitTime += totalTime - (currProcessLog.endTime ?? currProcessLog.process.arrivalTime);

        currProcessLog.timeRemaining--;
      } else {
        currProcessLog.timeRemaining--;
      }
    }

    if (currProcessLog === null && (highPriorityQueue.length > 0 || lowPriorityQueue.length > 0)) {
      currProcessLog = highPriorityQueue.dequeue() ?? lowPriorityQueue.dequeue();

      currProcessLog.startTime = totalTime;
      totalWaitTime += totalTime - (currProcessLog.endTime ?? currProcessLog.process.arrivalTime);

      currProcessLog.timeRemaining--;
    }

    totalTime++;
  }
  const averageWaitTime = totalWaitTime / numOfProcesses;

  return { averageWaitTime: round(averageWaitTime, 2), history: history };
};

function isHighPriorityProcess(process: Process, pivot: number) {
  return process.burstTime <= pivot;
}
