import { Box, Tooltip, Typography } from "@mui/material";
import React from "react";
import BoltIcon from "@mui/icons-material/Bolt";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import FlexBox from "../FlexBox/FlexBox";

const VeriticalBarCount = ({
  title,
  count = 0,
  maxCount = 100,
  color,
  badges = [],
}) => {
  return (
    <Box width="70px" sx={{ minHeight: { xs: "6.5rem", lg: "5rem" }, mt: 1 }}>
      <Tooltip title={count + " tanks"}>
        <Box
          position={"relative"}
          height={"50%"}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: color,
              opacity: 0.2,
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
        lineHeight={1}
      >
        {title}
      </Typography>
      <FlexBox sx={{ my: 0.5 }}>
        {badges.map((badge, index) => {
          return (
            <Tooltip title={badge.title} key={index}>
              {badge.icon}
            </Tooltip>
          );
        })}
      </FlexBox>
    </Box>
  );
};

export default VeriticalBarCount;
