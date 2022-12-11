import PriorityQueue from "ts-priority-queue";
import { Log } from "../../shared/sharedTypes";

test(`Testing priority queue`, () => {
  const pq = new PriorityQueue({
    comparator: (a: Log, b: Log) => {
      if (a.endTime === null && b.endTime === null) {
        return a.process.arrivalTime - b.process.arrivalTime;
      }
      if (a.endTime === null) {
        return -1;
      }
      if (b.endTime === null) {
        return -1;
      } else return a.endTime - b.endTime;
    },
  });

  const log1: Log = {
    process: {
      id: 1,
      arrivalTime: 1,
      burstTime: 4,
    },
    startTime: null,
    endTime: null,
    timeRemaining: 4,
  };

  const log2: Log = {
    process: {
      id: 2,
      arrivalTime: 2,
      burstTime: 1,
    },
    startTime: null,
    endTime: null,
    timeRemaining: 1,
  };

  const log3: Log = {
    process: {
      id: 3,
      arrivalTime: 3,
      burstTime: 2,
    },
    startTime: null,
    endTime: null,
    timeRemaining: 2,
  };

  // Enqueing in reverse order.
  pq.queue(log3)
  pq.queue(log2)
  pq.queue(log1)

  // Expecting in initial order - the order processes arrived.
  expect(pq.dequeue()).toBe(log1);
  expect(pq.dequeue()).toBe(log2);
  expect(pq.dequeue()).toBe(log3);
});
