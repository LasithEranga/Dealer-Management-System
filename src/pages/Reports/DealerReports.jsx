import {
  ArrowCircleDown,
  Description,
  Inventory,
  KeyboardReturn,
  LocalShipping,
  TrendingUp,
} from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import ReportCard from "../../components/ReportCard/ReportCard";

export const ICON_SIZE = "3rem";

const DealerReports = () => {
  const navigate = useNavigate();

  return (
    <Box mt={1}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          Reports
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        <ReportCard
          icon={
            <TrendingUp
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Sales Report"
          onClick={() => {
            navigate("sales-report");
          }}
        />

        <ReportCard
          icon={
            <ArrowCircleDown
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Paybales"
          onClick={() => {
            navigate("payables-report");
          }}
        />

        <ReportCard
          icon={
            <KeyboardReturn
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Tank Returns"
          onClick={() => {
            navigate("dealer-tank-returns-report");
          }}
        />

        <ReportCard
          icon={
            <Inventory
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Stocks"
          onClick={() => {
            navigate("stocks-report");
          }}
        />
        <ReportCard
          icon={
            <LocalShipping
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Stocks In Transit"
          onClick={() => {
            navigate("dealer-stocks-in-transit");
          }}
        />

        <ReportCard
          icon={
            <Description
              sx={{
                fontSize: ICON_SIZE,
              }}
            />
          }
          title="Purchase Orders"
          onClick={() => {
            navigate("purchase-orders-report");
          }}
        />
      </Box>
    </Box>
  );
};

export default DealerReports;
