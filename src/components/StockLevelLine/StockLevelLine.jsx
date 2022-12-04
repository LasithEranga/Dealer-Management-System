import { Box } from "@mui/material";
import React from "react";

const StockLevelLine = ({
  fillColor = "",
  title = "",
  currentValue = 0,
  hundredPercentValue = 0,
}) => {
  return (
    <>
      <Box
        my={0.3}
        style={{ color: "#525252", fontWeight: 600 }}
        display="flex"
        justifyContent={"space-between"}
      >
        <Box>{title}</Box>
        <Box>{currentValue}</Box>
      </Box>
      <Box
        sx={{
          position: "relative",
          height: "8px",
          backgroundColor: "#EAEAEA",
        }}
      >
        <Box
          style={{
            width: `${
              (currentValue / hundredPercentValue) * 100 > 100
                ? "100"
                : (currentValue / hundredPercentValue) * 100
            }%`,
            position: "absolute",
            top: 0,
            height: "8px",
            backgroundColor: fillColor,
          }}
        ></Box>
      </Box>
    </>
  );
};

export default StockLevelLine;
