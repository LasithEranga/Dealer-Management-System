import { Done } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
const StepThree = ({ orderList, setActiveStep }) => {
  return (
    <Box mt={2}>
      <ContentCard>
        <Box
          sx={{
            height: "18rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            display={"flex"}
            justifyContent="center"
            alignItems={"center"}
            color="#00AB55"
          >
            <CheckCircleOutlineIcon sx={{ fontSize: "5rem" }} />
            <Typography fontSize={"1.5rem"}>Purchase Order Placed!</Typography>
          </Box>
        </Box>
        <Box display={"flex"} justifyContent="end" alignItems={"center"} pr={3}>
          <Button
            sx={{ px: 4, borderRadius: 0.2 }}
            variant="contained"
            onClick={() => {
              setActiveStep(1);
            }}
          >
            Done
          </Button>
        </Box>
      </ContentCard>
    </Box>
  );
};

export default StepThree;
