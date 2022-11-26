import { Button } from "@mui/material";
import React from "react";

const QuickActionBtn = ({ title }) => {
  return (
    <Button
      variant="outlined"
      sx={{
        width: "12rem",
        height: "3rem",
        borderColor: "#BCBCBC",
        color: "black",
        fontWeight: 550,
      }}
    >
      {title}
    </Button>
  );
};

export default QuickActionBtn;
