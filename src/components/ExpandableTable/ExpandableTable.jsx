import { DownhillSkiing, Download } from "@mui/icons-material";
import {
  Button,
  Divider,
  Grid,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import NameAvatar from "../NameAvatar/NameAvatar";
import "./index.css";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import PlainTable from "../PlainTable/PlainTable";
import { Box } from "@mui/system";
import { convertToRupees } from "../../utils/convertToRupees";
import { getColorFromName } from "../../utils/getColorFromName";

const ExpandableTable = ({
  headCells = [
    "Dealer",
    "Date",
    "Store Address",
    "Phone No",
    "Order Total",
    "State",
    "Actions",
  ],
  actionButtons = [],
  enableAvatar = {
    isVisible: true,
    madeBy: [0],
  },
  data = [
    {
      name: "John Doe",
      address: "1234 Main St",
      storeAddress: "1234 Main St",
      field3: "1234 Main St",
      phoneNo: "123-456-7890",
      email: "lasith@gmail.com",
    },
    {
      name: "John Doe",
      address: "1234 Main St",
      storeAddress: "1234 Main St",
      field3: "1234 Main St",
      phoneNo: "123-456-7890",
      email: "lasith@gmail.com",
    },
    {
      name: "John Doe",
      address: "1234 Main St",
      storeAddress: "1234 Main St",
      field3: "1234 Main St",
      phoneNo: "123-456-7890",
      email: "lasith@gmail.com",
    },
    {
      name: "John Doe",
      address: "1234 Main St",
      storeAddress: "1234 Main St",
      field3: "1234 Main St",
      phoneNo: "123-456-7890",
      email: "lasith@gmail.com",
    },
    {
      name: "John Doe",
      address: "1234 Main St",
      storeAddress: "1234 Main St",
      field3: "1234 Main St",
      phoneNo: "123-456-7890",
      email: "lasith@gmail.com",
    },
    {
      name: "John Doe",
      address: "1234 Main St",
      storeAddress: "1234 Main St",
      field3: "1234 Main St",
      phoneNo: "123-456-7890",
      email: "lasith@gmail.com",
    },
    {
      name: "John Doe",
      address: "1234 Main St",
      storeAddress: "1234 Main St",
      field3: "1234 Main St",
      phoneNo: "123-456-7890",
      email: "lasith@gmail.com",
    },
  ],
}) => {
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState(-1);

  return (
    <div>
      <table style={{ width: "100%" }} className="ep-table">
        <thead>
          <tr className="ep-tr">
            {headCells.map((oneEl, index) => (
              <th className="ep-th" key={index}>
                {oneEl}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((element, index) => {
              return (
                <>
                  <tr key={index} className="ep-tr">
                    {Object.values(element).map((oneEl, index) => {
                      return (
                        <td className="ep-td" key={index}>
                          {enableAvatar.isVisible &&
                          enableAvatar.madeBy.includes(index) ? (
                            <NameAvatar name={oneEl} />
                          ) : (
                            oneEl
                          )}
                        </td>
                      );
                    })}

                    <td className="ep-td">
                      <Button
                        color="primary"
                        onClick={() => {
                          setExpanded(expanded === index ? -1 : index);
                        }}
                      >
                        {expanded === index ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )}
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={headCells.length}>
                      <div
                        className={`
                      ep-td-more 
                      ${expanded === index ? "ep-td-expanded" : ""}
                    `}
                      >
                        <Divider sx={{ mt: 1 }} />
                        <Grid container spacing={2}>
                          <Grid item xs={8}>
                            <PlainTable
                              dataList={[
                                {
                                  gasTank: "12.5Kg Tank",
                                  gasType: "New",
                                  quantity: "10",
                                  cqDealer: "10",
                                  cqInhouse: "10",
                                  price: "500",
                                  total: "500",
                                },
                                {
                                  gasTank: "12.5Kg Tank",
                                  gasType: "New",
                                  quantity: "10",
                                  cqDealer: "10",
                                  cqInhouse: "10",
                                  price: "500",
                                  total: "500",
                                },
                              ]}
                              headCells={[
                                "Gas Tank",
                                "Type",
                                "Quantity",
                                <Tooltip title="Current Quantity @ Dealer Stock">
                                  <span>CQ @ Dealer Stock</span>
                                </Tooltip>,
                                <Tooltip title="Current Quantity @ In-House Stock">
                                  <span>CQ @ In-House Stock</span>
                                </Tooltip>,
                                "Price",
                                "Total",
                              ]}
                            />
                          </Grid>
                          <Divider
                            orientation="vertical"
                            flexItem
                            sx={{ ml: 2, mt: 4, mb: 2 }}
                          />

                          <Grid item xs>
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Paper elevation={1} sx={{ p: 1, mt: 2 }}>
                                  <Box>
                                    <Typography
                                      fontWeight={"bold"}
                                      fontSize="0.8rem"
                                    >
                                      Order Total
                                    </Typography>
                                    <Typography
                                      textAlign={"right"}
                                      fontSize="1.2rem"
                                      sx={{ mt: 4 }}
                                    >
                                      {convertToRupees(500)}
                                    </Typography>
                                  </Box>
                                </Paper>
                              </Grid>
                              <Grid item xs={6}>
                                <Paper elevation={1} sx={{ p: 1, mt: 2 }}>
                                  <Box>
                                    <Tooltip title="Outstanding balance after accepting">
                                      <Typography
                                        fontWeight={"bold"}
                                        fontSize="0.8rem"
                                      >
                                        OB After Accepting
                                      </Typography>
                                    </Tooltip>
                                    <Typography
                                      textAlign={"right"}
                                      fontSize="1.2rem"
                                      sx={{ mt: 4 }}
                                    >
                                      {convertToRupees(500)}
                                    </Typography>
                                  </Box>
                                </Paper>
                              </Grid>
                            </Grid>
                            <Box mt={2}>
                              <Typography fontSize="0.75rem" textAlign={"end"}>
                                Order Placed By Lasith 22/12/2022 12:02:00PM
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                        <Divider />
                      </div>
                    </td>
                  </tr>
                </>
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

export default ExpandableTable;
