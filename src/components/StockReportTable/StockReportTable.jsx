import { Box, Typography } from "@mui/material";
import React from "react";

const StockReportTable = () => {
  return (
    <>
      <Box
        sx={{
          py: 1,
          pl: 2,
          backgroundColor: "#f5f5f5",
        }}
      >
        <Typography fontWeight={"bold"}>2.3 Gas Tanks</Typography>
      </Box>
      <table className="stock-tb-table">
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
        <tr className="stock-tb-tr">
          <td className="stock-tb-td">5kg</td>
          <td className="stock-tb-td">0</td>
          <td className="stock-tb-td">0</td>
          <td className="stock-tb-td">0</td>
          <td className="stock-tb-td">0</td>
        </tr>
      </table>
    </>
  );
};

export default StockReportTable;
