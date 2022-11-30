const round = (num: number, decimalPlace: number) => {
  const coefficient = 10 ** decimalPlace;
  return Math.round((num + Number.EPSILON) * coefficient) / coefficient;
};

export { round };
