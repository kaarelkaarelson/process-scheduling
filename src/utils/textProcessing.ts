const addDelimiter = (järjend: number[][], eraldaja: string): string => {
  let tulemus:string = "";

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

export { addDelimiter, processStringToArray };
