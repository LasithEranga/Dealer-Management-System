import { Box, Typography } from "@mui/material";
import React from "react";
import "./index.css";

const ReportTable = ({
  headingCells = ["Gas Tank", "Type", "Quantity", "Unit Price", "Total"],
  tableContent = [],
  columns = ["date", "dealer", "gasTank", "unitPrice", "quantity", "total"],
}) => {
  return (
    <table className="report-table">
      <thead style={{ position: "sticky", top: 0 }}>
        <tr className="report-tr">
          {headingCells.map((oneEl, index) => (
            <th className="report-th" key={index}>
              {oneEl}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="report-body">
        {tableContent.map((oneEl, index) => {
          return (
            <tr className="report-tr" key={index}>
              {columns.map((oneCol, index) => {
                return (
                  <td className="report-td" key={index}>
                    {oneEl[oneCol]}
                  </td>
                );
              })}
            </tr>
          );
        })}

        {/* if tableContent consists less than 10 rows, fill rest with empty data */}
        {tableContent.length < 10 &&
          tableContent.length !== 0 &&
          [...Array(10 - tableContent.length)].map((oneEl, index) => {
            return (
              <tr className="report-tr" key={index}>
                <td colSpan={columns.length}></td>
              </tr>
            );
          })}

        {/* show no records if table content is empty array */}
        {tableContent.length === 0 && (
          <tr className="report-tr">
            <td colSpan={columns.length}>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                height={"100%"}
                my={4}
              >
                <Typography fontSize={"1.2rem"}>No records to show!</Typography>
              </Box>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default ReportTable;
