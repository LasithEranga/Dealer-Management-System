import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";

const GasTankCard = ({
  _id,
  name,
  type,
  orderedPriceDealer,
  orderedPriceDistributor,
  sellingPriceDealer,
  sellingPriceDistributor,
  setShowEditModal,
  setValues,
}) => {
  return (
    <Grid item xs={3}>
      <ContentCard sx={{ boxShadow: 1 }}>
        <Typography fontWeight={"bold"} fontSize="1.2rem">
          {name}
        </Typography>
        <Grid container my={1}>
          <Grid item xs={4}>
            <Typography>Tank Type:</Typography>
          </Grid>
          <Grid item xs>
            {name} {type}
          </Grid>
        </Grid>
        <Divider sx={{ height: "5px", my: 1 }} />

        <Typography fontWeight={"bold"} fontSize="0.9rem">
          Distributor
        </Typography>

        <Grid container my={0.2}>
          <Grid item xs={6}>
            <Typography>Ordering Price:</Typography>
          </Grid>
          <Grid item xs>
            Rs. {orderedPriceDistributor}
          </Grid>
        </Grid>
        <Grid container my={0.2}>
          <Grid item xs={6}>
            <Typography>Selling Price:</Typography>
          </Grid>
          <Grid item xs>
            Rs. {sellingPriceDistributor}
          </Grid>
        </Grid>
        <Divider sx={{ height: "5px", my: 1 }} />
        <Typography fontWeight={"bold"} fontSize="0.9rem">
          Dealer
        </Typography>

        <Grid container my={0.2}>
          <Grid item xs={6}>
            <Typography>Ordering Price:</Typography>
          </Grid>
          <Grid item xs>
            Rs. {orderedPriceDealer}
          </Grid>
        </Grid>
        <Grid container my={0.2}>
          <Grid item xs={6}>
            <Typography>Selling Price:</Typography>
          </Grid>
          <Grid item xs>
            Rs. {sellingPriceDealer}
          </Grid>
        </Grid>
        <Box display={"flex"} justifyContent="end" mt={2}>
          <Button
            onClick={() => {
              setValues(
                _id,
                name,
                type,
                orderedPriceDealer,
                orderedPriceDistributor,
                sellingPriceDealer,
                sellingPriceDistributor
              );
              setShowEditModal(true);
            }}
          >
            Edit
          </Button>
        </Box>
      </ContentCard>
    </Grid>
  );
};

export default GasTankCard;