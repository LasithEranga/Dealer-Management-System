import { Box, Chip, Divider, Paper, Typography } from "@mui/material";
import React from "react";
import VeriticalBarCount from "../VeriticalBarCount/VeriticalBarCount";
import StockSummery from "./StockSummery";

const DealerStockCard = () => {
  return (
    <Box
      sx={{
        width: "20rem",
      }}
    >
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
            Dealer Name
          </Typography>
          <Box>
            <Chip
              label="Active"
              color="success"
              size="small"
              variant="outlined"
            />
          </Box>
        </Box>

        <StockSummery />
        <StockSummery />
        <StockSummery />
        <StockSummery />
      </Paper>
    </Box>
  );
};

export default DealerStockCard;
