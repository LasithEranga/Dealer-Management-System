import React from "react";
import "./index.css";

const ReceiptTable = ({ orderList }) => {
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
        {orderList.map((oneEl, index) => (
          <tr className="report-tr">
            <td className="report-td">{oneEl.name}</td>
            <td className="report-td">{oneEl.type}</td>
            <td className="report-td">{oneEl.quantity}</td>
            <td className="report-td text-end">{oneEl.orderedPriceDealer}</td>
            <td className="report-td text-end">
              {oneEl.quantity * oneEl.orderedPriceDealer}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ReceiptTable;
