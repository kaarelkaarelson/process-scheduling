import { round } from "../utils/numericHelper";
import { Process, ProcessReport, Log} from "../../shared/sharedTypes";

export const firstComeFirstServe = (arrivalTimes: number[], burstTimes: number[]): ProcessReport => {
  let history: Log[] = []
  let numOfProcesses = arrivalTimes.length;
  let totalTime = arrivalTimes[0]; 
  let totalWaitTime = 0;

  for (let i = 0; i < numOfProcesses; i++) {
    if (arrivalTimes[i] > totalTime) {
      totalTime += arrivalTimes[i] - totalTime;
    }

    const currProcess: Process = {
      id: i+1,
      arrivalTime: arrivalTimes[i],
      burstTime: burstTimes[i],
    };

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
    log.timeRemaining -= totalTime - totalTimeBefore;
    history.push(log)
  }

  // Formatting output
  const averageWaitTime = totalWaitTime / numOfProcesses;

  return { averageWaitTime: round(averageWaitTime, 2), history: history};
};
