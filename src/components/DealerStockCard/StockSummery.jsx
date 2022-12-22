import { Box, Typography } from "@mui/material";
import React from "react";
import VeriticalBarCount from "../VeriticalBarCount/VeriticalBarCount";

const StockSummery = () => {
  return (
    <Box>
      <Typography
        sx={{
          mt: 2,
          fontSize: "0.8rem",
          fontWeight: "bold",
        }}
      >
        Gas tank
      </Typography>
      <Box display={"flex"}>
        <VeriticalBarCount count={30} title={"New "} color="#0002A1" />
        <VeriticalBarCount count={30} title={"Refilled "} color="#0002A1" />
        <VeriticalBarCount count={30} title={"Returned "} color="#0002A1" />
        <VeriticalBarCount count={30} title={"Empty "} color="#0002A1" />
      </Box>
    </Box>
  );
};

export default StockSummery;
