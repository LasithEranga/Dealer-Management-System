import React from "react";
import "./index.css";

const ReportTable = ({
  headingCells = ["Gas Tank", "Type", "Quantity", "Unit Price", "Total"],
  tableContent = [
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
    {
      date: "2021-09-01",
      dealer: "Dealer 1",
      gasTank: "Gas Tank 1",
      unitPrice: 100,
      quantity: 10,
      total: 1000,
    },
  ],
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
      </tbody>
    </table>
  );
};

export default ReportTable;
