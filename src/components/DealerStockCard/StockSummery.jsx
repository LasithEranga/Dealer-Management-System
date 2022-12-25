import { Box, Typography } from "@mui/material";
import React from "react";
import { getColorFromName } from "../../utils/getColorFromName";
import VeriticalBarCount from "../VeriticalBarCount/VeriticalBarCount";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import MovingIcon from "@mui/icons-material/Moving";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import BoltIcon from "@mui/icons-material/Bolt";

const StockSummery = ({ stock = {} }) => {
  return (
    <Box>
      <Typography
        sx={{
          mt: 1,
          fontSize: "0.8rem",
          fontWeight: "bold",
        }}
      >
        {stock.tankName ? stock.tankName : ""}
      </Typography>
      <Box display={"flex"}>
        {stock.quantities.map((quantity, index) => {
          const badges = [];

          const stockType =
            quantity.stockMovingSpeed === "N/A"
              ? null
              : quantity.stockMovingSpeed === "FAST_MOVING"
              ? {
                  title: "Fast moving stock",
                  icon: <BoltIcon sx={{ fontSize: "1rem", color: "blue" }} />,
                }
              : quantity.stockMovingSpeed === "MODERATE_MOVING"
              ? {
                  title: "Moderate moving stock",
                  icon: (
                    <MovingIcon sx={{ fontSize: "0.8rem", color: "blue" }} />
                  ),
                }
              : quantity.stockMovingSpeed === "SLOW_MOVING"
              ? {
                  title: "Slow moving stock",
                  icon: (
                    <SlowMotionVideoIcon
                      sx={{ fontSize: "0.8rem", color: "blue" }}
                    />
                  ),
                }
              : null;
          if (stockType) {
            badges.push(stockType);
          }

          //if last updated date is older than two weeks show it
          if (quantity.lastUpdated !== "N/A") {
            const lastUpdatedDate = new Date(quantity.lastUpdated);
            const notUpdatedSince = new Date(
              new Date().setDate(new Date().getDate() + 10)
            );
            console.log(notUpdatedSince, lastUpdatedDate);
            if (lastUpdatedDate < notUpdatedSince) {
              console.log("last updated date is older than two weeks");
              badges.push({
                title: "Last updated on " + lastUpdatedDate.toLocaleString(),
                icon: (
                  <WarningAmberIcon
                    sx={{ fontSize: "1rem", color: "#DEDC18" }}
                  />
                ),
              });
            }
          }

          return (
            <VeriticalBarCount
              key={index}
              count={quantity.currentValue}
              maxCount={quantity.hundredPercentValue}
              title={quantity.tankType}
              color={getColorFromName(quantity.tankType)}
              badges={badges}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default StockSummery;
