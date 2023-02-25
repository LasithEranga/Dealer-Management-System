import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { convertToRupees } from "../../utils/convertToRupees";
import ContentCard from "../ContentCard/ContentCard";
import TitleAndContent from "../TitleAndContent/TitleAndContent";
import "./index.css";

const OrderSummeryTable = ({
  title = " Sales Receipt",
  height = "10rem",
  orderList = [],
  receiptInfo = {},
  headingCells = ["Gas Tank", "Type", "Quantity", "Unit Price", "Total"],
  cols = ["name", "type", "quantity", "orderedPriceDealer", "total"],
  totalCalculatedBy = "orderedPriceDealer",
}) => {
  let total = 0;
  orderList.forEach((oneEl) => {
    total = total + oneEl.quantity * oneEl[totalCalculatedBy];
  });
  console.log(total);

  return (
    <Grid item xs>
      <ContentCard>
        <Typography fontSize={"1.3rem"} fontWeight="bold" textAlign={"center"}>
          {title}
        </Typography>

        <Box>
          <Box display={"flex"} justifyContent="space-between" py={2}>
            <Box>
              {receiptInfo.leftSideContent &&
                receiptInfo.leftSideContent.map((oneEl) => {
                  return oneEl;
                })}
            </Box>
            <Box>
              {receiptInfo.rightSideContent &&
                receiptInfo.rightSideContent.map((oneEl) => {
                  return oneEl;
                })}
            </Box>
          </Box>
        </Box>

        <Box
          mt={2}
          sx={{
            height,
            overflowY: "auto",
            scrollbarWidth: "thin",
          }}
          display="flex"
          flexDirection={"column"}
        >
          <table className="sales-table">
            <thead style={{ position: "sticky", top: 0 }}>
              <tr className="sales-tr ">
                {headingCells.map((oneEl, index) => (
                  <th
                    className={`sales-th ${index > 1 ? "text-center" : ""}`}
                    key={`th${index}`}
                  >
                    {oneEl}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="sales-body">
              {orderList.map((oneEl, index) => {
                return (
                  <tr className="sales-tr " key={`tr${index}`}>
                    {cols.map((oneCol, index) => {
                      return (
                        <td
                          className={`sales-td ${
                            index > 1 ? "text-center" : ""
                          }`}
                          key={index}
                        >
                          {oneEl[oneCol]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
              {orderList.length === 0 && (
                <tr className="sales-tr ">
                  <td className="sales-td text-center py-5 " colSpan={5}>
                    Please select a gas tank
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <Box
            sx={{
              flexGrow: 1,
            }}
          ></Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "end",
            alignItems: "end",
          }}
        >
          <TitleAndContent
            title={"Total:"}
            content={convertToRupees(total)}
            sx={{ mr: 2 }}
          />
        </Box>
      </ContentCard>
    </Grid>
  );
};

export default OrderSummeryTable;
