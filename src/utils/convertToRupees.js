export const covertToRupees = (value) => {
  return Number.isInteger(value)
    ? `Rs. ${value}.00`
    : `Rs.${Number(value).toFixed(2)}`;
};
