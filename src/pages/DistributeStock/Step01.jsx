import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const Step01 = () => {
  return (
    <Box
      sx={{ height: "88%" }}
      display="flex"
      justifyContent={"center"}
      alignItems="center"
    >
      <TextField
        type={"text"}
        placeholder="Search by dealer name"
        sx={{ width: "30rem" }}
      />
    </Box>
  );
};

export default Step01;
