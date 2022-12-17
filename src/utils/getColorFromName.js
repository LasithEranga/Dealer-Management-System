export const getColorFromName = (name) => {
  let charSum = 0;
  for (let i = 0; i < name.length; i++) {
    charSum += name.charCodeAt(i);
  }
  charSum = charSum % 255;
  console.log(charSum);
  return `rgba( ${(Number(charSum) * 0.9).toFixed(0)}, ${(
    Number(charSum) * 0.8
  ).toFixed(0)}, ${(Number(charSum) * 0.5).toFixed(0)}, 1)`;
};
