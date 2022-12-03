import { Delete, Edit } from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getAllTanks } from "../../app/api/gasTankServices";
import ContentCard from "../../components/ContentCard/ContentCard";
import GasTankCard from "./GasTankCard";

const ViewGasTanks = () => {
  const [gasTanks, setGasTanks] = useState([]);
  useEffect(() => {
    getAllTanks(
      (response) => {
        console.log(response);
        setGasTanks(response.data);
      },
      () => {}
    );
  }, []);

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
          {gasTanks.map((oneEl, index) => {
            return <GasTankCard key={index} {...oneEl} />;
          })}
        </Grid>
      </Box>
    </Box>
  );
};

export default ViewGasTanks;
