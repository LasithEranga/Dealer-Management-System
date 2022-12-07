import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { covertToRupees } from "../../utils/convertToRupees";
import ContentCard from "../ContentCard/ContentCard";
import TitleAndContent from "../TitleAndContent/TitleAndContent";
import "./index.css";

const OrderSummeryTable = ({
  title = " Sales Receipt",
  height = "10rem",
  orderList = [],
}) => {
  const { name, outstandingAmount } = useSelector((state) => state.loginDMS);

  const [total, setTotal] = useState(0);

  useEffect(() => {
    let total = 0;
    orderList.forEach((oneEl) => {
      total = total + oneEl.quantity * oneEl.orderedPriceDealer;
    });
    setTotal(total);
  }, [orderList]);

  return (
    <Grid item xs>
      <ContentCard>
        <Typography fontSize={"1.3rem"} fontWeight="bold" textAlign={"center"}>
          {title}
        </Typography>

        <Box>
          <Box display={"flex"} justifyContent="space-between">
            <TitleAndContent title={"Receipt No:"} content="65468" />
            <TitleAndContent
              title={"Date:"}
              content={new Date().toISOString().substring(0, 10)}
            />
          </Box>
          <Box mt={1}>
            <TitleAndContent title={"Dealer:"} content={name} />
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
              <tr className="sales-tr">
                <th className="sales-th">Gas Tank</th>
                <th className="sales-th">Type</th>
                <th className="sales-th">Quantity</th>
                <th className="sales-th">Unit Price</th>
                <th className="sales-th">Total</th>
              </tr>
            </thead>
            <tbody className="sales-body">
              {orderList.map((oneEl, index) => {
                return (
                  <tr className="sales-tr " key={index}>
                    <td className="sales-td">{oneEl.name}</td>
                    <td className="sales-td">{oneEl.type}</td>
                    <td className="sales-td">{oneEl.quantity}</td>
                    <td className="sales-td">{oneEl.orderedPriceDealer}</td>
                    <td className="sales-td">
                      {oneEl.quantity * oneEl.orderedPriceDealer}
                    </td>
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
            content={covertToRupees(total)}
            sx={{ mr: 2 }}
          />
        </Box>
      </ContentCard>
    </Grid>
  );
};

export default OrderSummeryTable;
