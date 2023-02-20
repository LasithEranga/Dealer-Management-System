import { ArrowDownward, ArrowUpward } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

const AnalyticsCard = ({ title, changedRatio, isIncreased, currentValue }) => {
  return (
    <Box p={1}>
      <Box
        sx={{
          border: "1px solid #eee",
          borderRadius: "5px",
          p: 1,
          pb: 2,
        }}
      >
        <Box
          display={"flex"}
          alignItems="center"
          justifyContent={"space-between"}
        >
          <Box display={"flex"} alignItems="center">
            <Typography
              color={"#979797"}
              fontWeight="bold"
              mr={3}
              fontSize="1rem"
            >
              {title}
            </Typography>
            <Typography
              sx={{
                color: isIncreased ? "#61e3a2" : "red",
              }}
              fontWeight="bold"
            >
              {changedRatio}
            </Typography>
            {isIncreased ? (
              <ArrowUpward
                sx={{
                  fontSize: "0.9rem",
                  color: "#61e3a2",
                }}
              />
            ) : (
              <ArrowDownward
                sx={{
                  color: "red",
                }}
              />
            )}
          </Box>
          <Box>
            <Box
              sx={{
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                backgroundColor: isIncreased ? "#61e3a2" : "red",
              }}
            ></Box>
          </Box>
        </Box>
        <Box>
          <Typography
            sx={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              pt: 2,
              ml: 2,
            }}
          >
            {currentValue}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AnalyticsCard;
