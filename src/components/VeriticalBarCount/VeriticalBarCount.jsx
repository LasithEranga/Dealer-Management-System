import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";

const VeriticalBarCount = ({ title, count = 0, maxCount = 100, color }) => {
  return (
    <Box
      height={"4.5rem"}
      width="70px"
      sx={{ height: { xs: "6.5rem", lg: "3rem" } }}
    >
      <Tooltip title={count + " Numbers"}>
        <Box
          position={"relative"}
          height={"75%"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: color,
              opacity: 0.15,
              height: "100%",
              width: "15px",
              position: "absolute",
              left: "50",
              borderRadius: 0.4,
            }}
          ></Box>
          <Box
            sx={{
              backgroundColor: color,
              height: (count / maxCount) * 100 + "%",
              width: "15px",
              position: "absolute",
              left: "50",
              bottom: "0",
              borderRadius: 0.4,
            }}
          ></Box>
        </Box>
      </Tooltip>
      <Typography textAlign={"center"} fontSize="0.8rem">
        {count}
      </Typography>
      <Typography
        textAlign={"center"}
        fontSize="0.6rem"
        fontWeight={"bold"}
        lineHeight={0.5}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default VeriticalBarCount;
