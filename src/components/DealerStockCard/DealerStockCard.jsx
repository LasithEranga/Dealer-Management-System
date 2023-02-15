import { Box, Chip, Divider, Grid, Paper, Typography } from "@mui/material";
import React from "react";
import VeriticalBarCount from "../VeriticalBarCount/VeriticalBarCount";
import StockSummery from "./StockSummery";

const DealerStockCard = ({ dealer = {} }) => {
  return (
    <Grid item xs={3.8}>
      <Paper
        sx={{
          p: 1,
          px: 2,
          pb: 4,
        }}
      >
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography
            sx={{
              fontSize: "1.2rem",
              fontWeight: "bold",
            }}
          >
            {dealer.name ? dealer.name : ""}
          </Typography>
        </Box>
        {dealer.stocks.map((stock, index) => {
          return <StockSummery stock={stock} key={index} />;
        })}
      </Paper>
    </Grid>
  );
};

export default DealerStockCard;
