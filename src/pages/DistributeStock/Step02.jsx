import { Box, Divider, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import FlexDivider from "../../components/FlexDivider/FlexDivider";

const Step02 = () => {
  return (
    <Box sx={{ height: "88%" }} display="flex" justifyContent={"center"}>
      <Box width={"96%"}>
        <Grid container mt={2} mb={1}>
          <Grid item mr={1}>
            <Typography> Dealer Details</Typography>
          </Grid>

          <Grid item xs display={"flex"} alignItems={"end"} mb={1}>
            <Divider sx={{ width: "100%", borderBottomWidth: "2px" }} />
          </Grid>
        </Grid>

        <Grid container mt={3}>
          <Grid item xs>
            <Box>
              <Typography>Dealer Name</Typography>
              <Typography>Lasith Eranda</Typography>
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <Typography>Store Name</Typography>
              <Typography>Lasith's Store</Typography>
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <Typography>Dealer Address</Typography>
              <Typography>Lasith Eranda</Typography>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Step02;
