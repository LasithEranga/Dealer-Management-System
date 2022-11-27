import { Divider, Grid } from "@mui/material";
import React from "react";

const FlexDivider = () => {
  return (
    <Grid item xs display={"flex"} alignItems={"center"}>
      <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
    </Grid>
  );
};

export default FlexDivider;
