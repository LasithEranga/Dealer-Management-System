import React from "react";

const ErrorText = ({ message }) => {
  return (
    <span
      style={{
        color: "red",
        fontSize: "0.8rem",
        fontWeight: 200,
      }}
    >
      *{message}
    </span>
  );
};

export default ErrorText;
