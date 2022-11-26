import { Box } from "@mui/material";
import React from "react";

const EstimatedLevelCard = ({
  tankType = "",
  newTankEndDate = "",
  refilledTankEndDate = "",
}) => {
  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 1,
        minWidth: "11.2rem",
        backgroundColor: "#F9F9F9",
        border: "1px solid #F9F9F9",
      }}
    >
      <Box sx={{ fontWeight: 600, fontSize: "1.3rem" }}>{tankType}</Box>
      <Box className="mt-2" sx={{ fontWeight: 550, fontSize: "1rem" }}>
        New Tanks
      </Box>
      <Box className="" sx={{ fontWeight: 550, fontSize: "0.9rem" }}>
        by {newTankEndDate}
      </Box>
      <Box className="mt-2" sx={{ fontWeight: 600, fontSize: "1rem" }}>
        Refilled Tanks
      </Box>
      <Box className="" sx={{ fontWeight: 550, fontSize: "0.9rem" }}>
        by {refilledTankEndDate}
      </Box>
    </Box>
  );
};

export default EstimatedLevelCard;
