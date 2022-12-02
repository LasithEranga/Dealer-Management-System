import { Delete, Edit } from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import GasTankCard from "./GasTankCard";

const ViewGasTanks = () => {
  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        my={1}
        mb={2}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          View Gas tanks
        </Typography>
      </Box>
      <Box>
        <Grid container columnSpacing={1.5} rowSpacing={1.5}>
          <GasTankCard />
          <GasTankCard />
          <GasTankCard />
          <GasTankCard />
          <GasTankCard />
          <GasTankCard />
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewGasTanks;
