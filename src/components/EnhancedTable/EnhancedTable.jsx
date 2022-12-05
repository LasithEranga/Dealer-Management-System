import { Button, MenuItem, Select, Typography } from "@mui/material";
import React, { useState } from "react";
import { DEALERS } from "../../data";
import NameAvatar from "../NameAvatar/NameAvatar";
import "./index.css";

const EnhancedTable = ({
  headCells = [
    "Dealer",
    "Name",
    "Address",
    "Store Address",
    "Phone No",
    "Email",
    "Actions",
  ],
  actionButtons = [],
  amountIndex = 5,
  priceEnabled = true,
  enableAvatar = {
    isVisible: true,
    madeBy: [0],
  },
  data = [],
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  return (
    <div>
      <table style={{ width: "100%" }} className="eh-table">
        <thead>
          <tr className="eh-tr">
            {headCells.map((oneEl, index) => (
              <th className="eh-th">{oneEl}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((element, index) => {
              return (
                <tr key={index} className="eh-tr">
                  {enableAvatar.isVisible && (
                    <td className="eh-td">
                      <NameAvatar
                        priceEnabled={priceEnabled}
                        {...(priceEnabled && {
                          amount: Object.values(element)[amountIndex],
                        })}
                        name={enableAvatar.madeBy
                          .map((oneEl) => Object.values(element)[oneEl])
                          .join("")}
                      />
                    </td>
                  )}

                  {Object.values(element)
                    .slice(0, 5)
                    .map((oneEl, index) => {
                      return <td key={index}>{oneEl}</td>;
                    })}

                  {actionButtons.map((oneEl, index) => (
                    <td>
                      <Button
                        onClick={() => {
                          oneEl.action(element);
                        }}
                      >
                        {oneEl.name}
                      </Button>
                    </td>
                  ))}
                </tr>
              );
            })}
        </tbody>
      </table>

      <div
        style={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          marginTop: "10px",
          marginRight: "20px",
        }}
      >
        <div>
          <Typography>Rows per page</Typography>
        </div>
        <div>
          <select
            value={`${rowsPerPage}`}
            onChange={(e) => {
              setRowsPerPage(Number(e.target.value));
            }}
            style={{
              padding: "0px 5px 0px 10px",
              backgroundColor: "Window",
              border: "none",
              marginRight: "20px",
            }}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </select>
        </div>
        <div
          style={{
            marginRight: "20px",
          }}
        >{`${page * rowsPerPage + 1} -${
          page * rowsPerPage + rowsPerPage < data.length
            ? page * rowsPerPage + rowsPerPage
            : page * rowsPerPage + data.length - page * rowsPerPage
        }  of ${data.length}`}</div>
        <Button
          {...(page === 0 && { disabled: true })}
          onClick={() => {
            setPage((prev) => prev - 1);
          }}
        >
          prev
        </Button>
        <Button
          {...(page + 1 >= data.length / rowsPerPage && {
            disabled: true,
          })}
          onClick={() => {
            setPage((prev) => prev + 1);
          }}
        >
          next
        </Button>
      </div>
    </div>
  );
};

export default EnhancedTable;
