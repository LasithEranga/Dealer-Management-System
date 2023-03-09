export const convertToRupees = (value) => {
  if (value) {
    let strNumber = value.toString();
    const splitted = strNumber.split("");
    for (let i = splitted.length - 3; i > 0; i -= 3) {
      splitted.splice(i, 0, ",");
    }

    return Number.isInteger(value)
      ? `Rs. ${splitted.join("")}.00`
      : `Rs.${Number(value).toFixed(2)}`;
  }
  return "Rs. 0.00";
};
