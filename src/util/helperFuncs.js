export const generateRandomHex = () => {
  let hexCode = "#" + Math.floor(Math.random() * 16777215).toString(16);
  if (hexCode.length < 7) {
    return generateRandomHex();
  }
  return hexCode;
};
