import { Button } from "@mui/material";
import React from "react";

const QuickActionBtn = ({ title, onClick = () => {} }) => {
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
      onClick={onClick}
    >
      {title}
    </Button>
  );
};

export default QuickActionBtn;
