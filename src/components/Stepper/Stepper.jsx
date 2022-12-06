import React from "react";
import GradingIcon from "@mui/icons-material/Grading";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import TaskIcon from "@mui/icons-material/Task";
import { Grid } from "@mui/material";
import HeaderItem from "./HeaderItem";

const Stepper = ({ activeStep }) => {
  console.log(activeStep);
  return (
    <>
      {/* stepper header */}
      <Grid container justifyContent={"center"} ml={1} pr={2}>
        <HeaderItem
          title={"Order Details"}
          icon={<ReceiptLongIcon />}
          step={1}
          activeStep={activeStep}
        />
        <HeaderItem
          title={"Review Order"}
          icon={<GradingIcon />}
          step={2}
          activeStep={activeStep}
        />
        <HeaderItem
          title={"Place Order"}
          icon={<TaskIcon />}
          step={3}
          activeStep={activeStep}
        />
      </Grid>
    </>
  );
};

export default Stepper;
