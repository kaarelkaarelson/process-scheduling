import { round } from "../utils/numericHelper";
import { Queue } from "../data-structures/queue";
import { Process, ProcessReport, Log } from "../../shared/sharedTypes";

export const roundRobin = (arrivalTimes: number[], burstTimes: number[]): ProcessReport => {
  let totalTime = arrivalTimes[0];
  let totalWaitTime = 0;
  let numOfProcesses = arrivalTimes.length;
  let i = 0; // index for arriving processes.
  let history: Log[] = [];
  let quantum = 5; 
  let finishedProcessLog: Log | null = null

  const queue = new Queue<Log>();

  while (queue.size() > 0 || i < numOfProcesses) {
    // Add arrived processes to priority queue
    for (let j = i; j < numOfProcesses; j++) {
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

      queue.enqueue(log);
      i += 1;
    }

    if (finishedProcessLog !== null) {
      queue.enqueue(finishedProcessLog)
      finishedProcessLog = null;
    }

    // Idle time
    if (queue.size() == 0) {
      totalTime = arrivalTimes[i];
      continue;
    }
    
    const processLog = queue.dequeue();

    totalWaitTime += totalTime - processLog!.endTime!;
    let workTime = Math.min(quantum, processLog!.timeRemaining)

    processLog!.startTime = totalTime;
    processLog!.endTime = totalTime + workTime; 
    processLog!.timeRemaining -= workTime; 

    totalTime = processLog!.endTime; // Time after completing process

    let copyLog = Object.assign({}, processLog) // Shallow copy to keep process object reference.
    history.push(copyLog);

    if (processLog!.timeRemaining == 0) continue

    finishedProcessLog = processLog!
  }

  const averageWaitTime = totalWaitTime / numOfProcesses;

  console.log(history)
  return { averageWaitTime: round(averageWaitTime, 2), history: history };
};
