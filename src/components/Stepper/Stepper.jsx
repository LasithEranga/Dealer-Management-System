import { Person } from "@mui/icons-material";
import { Box, Grid } from "@mui/material";
import React from "react";
import HeaderItem from "./HeaderItem";
import StepIcon from "./StepIcon";

const Stepper = ({ activeStep }) => {
  return (
    <>
      {/* stepper header */}
      <Grid container justifyContent={"center"} ml={1} pr={2}>
        <HeaderItem title={"Order Details"} stepNo="01" />
        <HeaderItem title={"Review Order"} stepNo="02" />
        <HeaderItem title={"Place Order"} stepNo="03" />
      </Grid>
    </>
  );
};

export default Stepper;
