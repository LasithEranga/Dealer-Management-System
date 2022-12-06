import React from "react";
import "./index.css";

const ReceiptTable = () => {
  return (
    <table className="report-table">
      <thead className="report-table-head">
        <tr>
          <th className="report-th">Tank Name</th>
          <th className="report-th">Tank Type</th>
          <th className="report-th">Qty</th>
          <th className="report-th text-end ">Unit Price (Rs)</th>
          <th className="report-th text-end ">Total Price (Rs)</th>
        </tr>
      </thead>
      <tbody>
        <tr className="report-tr">
          <td className="report-td">5KG Tank</td>
          <td className="report-td">New</td>
          <td className="report-td">50</td>
          <td className="report-td text-end">1500.00</td>
          <td className="report-td text-end">75,000.00</td>
        </tr>
        <tr className="report-tr">
          <td className="report-td">5KG Tank</td>
          <td className="report-td">New</td>
          <td className="report-td">50</td>
          <td className="report-td text-end">1500.00</td>
          <td className="report-td text-end">75,000.00</td>
        </tr>
        <tr className="report-tr">
          <td className="report-td">5KG Tank</td>
          <td className="report-td">New</td>
          <td className="report-td">50</td>
          <td className="report-td text-end">1500.00</td>
          <td className="report-td text-end">75,000.00</td>
        </tr>
        <tr className="report-tr">
          <td className="report-td">5KG Tank</td>
          <td className="report-td">New</td>
          <td className="report-td">50</td>
          <td className="report-td text-end">1500.00</td>
          <td className="report-td text-end">75,000.00</td>
        </tr>
        <tr className="report-tr">
          <td className="report-td">5KG Tank</td>
          <td className="report-td">New</td>
          <td className="report-td">50</td>
          <td className="report-td text-end">1500.00</td>
          <td className="report-td text-end">75,000.00</td>
        </tr>
      </tbody>
    </table>
  );
};

export default ReceiptTable;
