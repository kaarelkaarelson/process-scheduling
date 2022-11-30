import { type } from "@testing-library/user-event/dist/type";

interface Process {
  // For a process we only care about in which order it arrived from the queue
  id: number; // Id is given based on in what order the process comes.
  arrivalTime: number;
  burstTime: number;
}

interface LogOld {
  process: Process;
  startTime: number;
  endTime: number | null;
  isCompleted: boolean;
}

interface Log {
  process: Process;
  startTime: number | null;
  endTime: number | null;
  timeRemaining: number ;
}

type ProcessReportOld = {
  averageWaitTime: number;
  history: LogOld[] | null;
};

type ProcessReport = {
  averageWaitTime: number;
  history: Log[] | null;
};

export type { Process, LogOld, Log, ProcessReportOld, ProcessReport };
