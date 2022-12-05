import { Box, Button } from "@mui/material";
import React from "react";

const ButtonCard = ({ btnText, btnAction = () => {} }) => {
  return (
    <Box sx={{ height: "60px", p: 1 }}>
      <Button
        variant="outlined"
        sx={{ height: "100%", width: "100%" }}
        onClick={btnAction}
      >
        {btnText}
      </Button>
    </Box>
  );
};

export default ButtonCard;
