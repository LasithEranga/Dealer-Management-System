import { Box, Typography } from "@mui/material";
import _ from "lodash";
import React from "react";

const StockReportTable = ({ title, data = {} }) => {
  return (
    <>
      <Box
        sx={{
          py: 1,
          pl: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography fontWeight={"bold"}>{title}</Typography>
      </Box>
      <table className="stock-tb-table">
        <thead>
          <tr>
            <th className="stock-tb-th">Tank type</th>
            <th className="stock-tb-th">Qty in stock</th>
            <th className="stock-tb-th" title="Distributor selling price">
              Dis. selling price
            </th>
            <th className="stock-tb-th" title="Dealer selling price">
              Dea. selling price
            </th>
            <th className="stock-tb-th">Distribution</th>
          </tr>
        </thead>

        <tbody>
          {Object.keys(data).map((oneEl, index) => {
            return (
              <tr className="stock-tb-tr" key={index}>
                <td className="stock-tb-td">{_.capitalize(oneEl)}</td>
                <td className="stock-tb-td ">{data[oneEl].currentValue}</td>
                <td className="stock-tb-td">
                  {data[oneEl].sellingPriceDistributor}
                </td>
                <td className="stock-tb-td">
                  {data[oneEl].sellingPriceDealer}
                </td>
                <td className="stock-tb-td">{data[oneEl].tankDistribution}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default StockReportTable;
