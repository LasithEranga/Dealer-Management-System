import { Grid, Typography } from "@mui/material";
import React from "react";

const DealerDetails = ({ title, content }) => {
  return (
    <Grid container my={2}>
      <Grid item xs={4}>
        <Typography fontWeight={"bold"}>{title} </Typography>
      </Grid>
      <Grid item xs={8}>
        <Typography>{content} </Typography>
      </Grid>
    </Grid>
  );
};

export default DealerDetails;
