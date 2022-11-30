function validateProcessString(text: string) {
  let isValid = /^(?:\d+,\d+;)*\d+,\d+$/.test(text);
  return isValid;
}
export { validateProcessString };
