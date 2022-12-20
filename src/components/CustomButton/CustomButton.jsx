import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ children, onClick = () => {}, sx = {} }) => {
  return (
    <Button
      sx={{
        minHeight: 20,
        minWidth: 20,
        p: 0.5,
        borderRadius: "50%",
        lineHeight: 0,
        ...sx,
      }}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

export default CustomButton;
