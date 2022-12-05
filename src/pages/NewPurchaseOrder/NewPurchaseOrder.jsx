import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import Stepper from "../../components/Stepper/Stepper";
import StepOne from "./StepOne";

const NewPurchaseOrder = () => {
  const activeStep = 1;
  return (
    <Box>
      <Typography fontSize="1.5rem" fontWeight="bold" sx={{ my: 1 }}>
        New Purchase Order
      </Typography>
      <Box>
        <Stepper />
      </Box>
      <Box>{activeStep === 1 && <StepOne />}</Box>
    </Box>
  );
};

export default NewPurchaseOrder;
