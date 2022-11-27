import { Box, TextField, Typography } from "@mui/material";
import React from "react";

const StockDetails = ({ title, placeholder }) => {
  return (
    <Box sx={{ mr: 2, my: 1 }}>
      <Typography>{title}</Typography>
      <TextField
        fullWidth
        size="small"
        variant="outlined"
        placeholder={placeholder}
        sx={{ mt: 1 }}
      />
    </Box>
  );
};

export default StockDetails;
