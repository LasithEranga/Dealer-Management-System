import { Grid, Typography } from "@mui/material";
import React from "react";

const RowItem = ({ title, content, sx = {} }) => {
  return (
    <Grid container sx={sx}>
      <Grid item xs>
        <Typography fontSize={"0.9rem"} fontWeight="bold">
          {title}
        </Typography>
      </Grid>
      <Grid item xs>
        <Typography fontSize={"0.9rem"} fontWeight="bold">
          {content}
        </Typography>
      </Grid>
    </Grid>
  );
};

export default RowItem;
