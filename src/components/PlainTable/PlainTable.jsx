import { Box } from "@mui/material";
import React from "react";
import "./index.css";

const PlainTable = ({
  height,
  headCells = ["Gas Tank", "Type", "Quantity", "Unit Price", "Total"],
  dataList = [],
  noDataMessage = "Please select a gas tank",
  ignoreFirstColumns = 0,
}) => {
  return (
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
            {headCells.map((oneEl, index) => (
              <th key={index} className="sales-th">
                {oneEl}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="sales-body">
          {dataList.map((oneEl, index) => {
            return (
              <tr className="sales-tr " key={index}>
                {Object.values(oneEl)
                  .slice(ignoreFirstColumns)
                  .map((oneEl, index) => (
                    <td className="sales-td text-center" key={index}>
                      {oneEl}
                    </td>
                  ))}
              </tr>
            );
          })}
          {dataList.length === 0 && (
            <tr className="sales-tr ">
              <td className="sales-td text-center py-5 " colSpan={5}>
                {noDataMessage}
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
  );
};

export default PlainTable;
