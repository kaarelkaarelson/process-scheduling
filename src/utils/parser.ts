const addDelimiter = (järjend: number[][], eraldaja: string): string => {
  let tulemus: string = "";

  järjend.map((element, index) => (tulemus += index + 1 < järjend.length ? element + eraldaja : element));

  return tulemus;
};

const processStringToArray = (processString: string): number[][] => {
  const slices = processString.split(";");
  let processSequence: number[][] = [];

  for (let i = 0; i < slices.length; i++) {
    const pair = slices[i].split(",");

    const process: number[] = [parseInt(pair[0]), parseInt(pair[1])];
    processSequence.push(process);
  }

  return processSequence;
};

const processStringToData = (processString: string): { arrivalTimes: number[]; burstTimes: number[] } => {
  const at = [];
  const bt = [];
  const slices = processString.split(";");

  console.log(processString, slices);
  for (let i = 0; i < slices.length; i++) {
    let process = slices[i].split(',');

    at.push(parseInt(process[0]));
    bt.push(parseInt(process[1]));
  }


  return { arrivalTimes: at, burstTimes: bt };
};

export { addDelimiter, processStringToArray, processStringToData };
