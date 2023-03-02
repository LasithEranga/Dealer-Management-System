import { NextPlan } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showSystemAlert } from "../../app/alertServices";
import { stockInfoChartData } from "../../app/api/gasStockServices";
import { newReturnRecipt } from "../../app/api/returnReceiptServices";
import { searchSalesReceiptsByRef } from "../../app/api/salesReceiptServices";
import ContentCard from "../../components/ContentCard/ContentCard";
import OrderSummeryTable from "../../components/OrderSummeryTable/OrderSummeryTable";
import TitleAndContent from "../../components/TitleAndContent/TitleAndContent";
import { convertToRupees } from "../../utils/convertToRupees";
import { printReceipt } from "../../utils/printReceipt";
import "./index.css";

const AcceptReturns = () => {
  const { userId, name } = useSelector((state) => state.loginDMS);
  const [orderList, setOrderList] = useState([]);
  const [salesReceiptTankList, setSalesReceiptTankList] = useState([]);
  const [selectedSalesReceipt, setSelectedSalesReceipt] = useState({});
  const [salesReceipts, setSalesReceipts] = useState([]);
  const [salesReceiptKeyword, setSalesReceiptKeyword] = useState("");
  const [insertRecordAt, setInsertRecordAt] = useState(-1);
  const [updateTable, setUpdateTable] = useState(false);
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (salesReceiptKeyword !== "") {
      searchSalesReceiptsByRef(
        {
          dealer: userId,
          refIdKeyword: salesReceiptKeyword,
        },
        (response) => {
          setSalesReceipts(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }, [salesReceiptKeyword]);

  const onPrintClick = () => {
    if (orderList.length === 0) {
      showSystemAlert("Please add tanks to return receipt", "error");
      return;
    }
    setLoading(true);
    newReturnRecipt(
      {
        dealerId: userId,
        salesReceiptId: selectedSalesReceipt._id,
        gasTanks: orderList.map((oneEl) => ({
          _id: oneEl._id,
          amountLeft: oneEl.amountLeft,
          returnPrice: parseFloat(oneEl.returnPrice),
        })),
      },
      (response) => {
        if (response.status === 0) {
          printReceipt(response?.data?.fileName, setLoading);
          showSystemAlert("Gas tank returned", "success");
          setOrderList([]);
          setSalesReceiptTankList([]);
          setSalesReceiptKeyword("");
          setSalesReceipts([]);
          setSelectedSalesReceipt({});
          setUpdateTable(true);
        } else {
          showSystemAlert(
            response?.error ? response.error : "Something went wrong",
            "error"
          );
        }
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    console.log(salesReceiptTankList);
    if (updateTable) {
      salesReceiptTankList.forEach((oneEl, index) => {
        oneEl["sellingPrice"] = convertToRupees(oneEl.sellingPriceDealer);
        oneEl["action"] = (
          <>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"space-evenly"}
            >
              <Input
                placeholder="A. left"
                title={
                  oneEl.returnableQuantity <= 0
                    ? "No more returns possible"
                    : "Amount left in tank"
                }
                variant="standard"
                size="small"
                sx={{
                  minWidth: "20px",
                  maxWidth: "75px",
                  "& input": {
                    minWidth: "20px",
                    maxWidth: "75px",
                  },
                }}
                disabled={oneEl.returnableQuantity <= 0}
                endAdornment={
                  <InputAdornment position="start">Kg</InputAdornment>
                }
                value={quantities[oneEl._id]?.amountLeft || ""}
                onChange={(e) => {
                  onChangeAmountLeft(e, oneEl);
                }}
              />
              <IconButton
                color="primary"
                disabled={oneEl.returnableQuantity <= 0}
                title={
                  oneEl.returnableQuantity <= 0
                    ? "No more returns possible"
                    : "Add tank to return receipt"
                }
                onClick={(e) => {
                  setInsertRecordAt(oneEl._id);
                }}
              >
                <NextPlan />
              </IconButton>
            </Box>
          </>
        );
      });
      setSalesReceiptTankList(
        salesReceiptTankList.map((oneEl) => ({ ...oneEl }))
      );
      setUpdateTable(false);
    }
  }, [salesReceiptTankList, updateTable]);

  useEffect(() => {
    if (insertRecordAt !== -1) {
      const gasTank = salesReceiptTankList.find(
        (oneEl) => oneEl._id === insertRecordAt
      );
      if (gasTank) {
        // set amount left and return price
        gasTank.amountLeft = quantities[insertRecordAt]?.amountLeft;
        gasTank.displayAmountLeft = `${quantities[insertRecordAt]?.amountLeft} Kg`;
        gasTank.returnPrice = quantities[insertRecordAt]?.returnPrice;
        gasTank.dispayReturnPrice = convertToRupees(
          quantities[insertRecordAt]?.returnPrice
        );

        gasTank.quantity = 1;

        // show error if amount left is not set
        if (!gasTank.amountLeft) {
          showSystemAlert("Please set amount left", "error");
          setInsertRecordAt(-1);
          return;
        }

        // add to order list
        setOrderList((prev) => [...prev, gasTank]);

        // reset quantities
        setQuantities((prev) => {
          let temp = { ...prev };
          delete temp[insertRecordAt];
          return temp;
        });
        let temp = salesReceiptTankList.map((oneEl) => ({ ...oneEl }));
        const updatedGasTank = temp.find(
          (oneEl) => oneEl._id === insertRecordAt
        );
        if (updatedGasTank) {
          updatedGasTank.returnableQuantity -= 1;
          if (updatedGasTank.returnableQuantity === 0) {
            temp.splice(temp.indexOf(updatedGasTank), 1);
          }
        }
        setSalesReceiptTankList(temp);
        setUpdateTable(true);
      }

      setInsertRecordAt(-1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insertRecordAt, salesReceiptTankList]);

  const onChangeAmountLeft = (e, oneEl) => {
    let tankWeight = oneEl.name.split("KG")[0];
    setQuantities((prev) => {
      return {
        ...prev,
        [oneEl._id]: {
          amountLeft: e.target.value,
          returnPrice: (
            (e.target.value / tankWeight) *
            oneEl.sellingPriceDealer
          ).toFixed(2),
        },
      };
    });
    setUpdateTable(true);
  };

  return (
    <Box my={1} mb={2}>
      <Typography fontSize="1.5rem" fontWeight="bold">
        Accept Returned Gas Tanks
      </Typography>

      <Grid container gap={2} mt={2}>
        <Grid item xs={5.5}>
          <ContentCard sx={{ pl: 2 }}>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Sales Receipt
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box my={2} display="flex" alignItems={"center"}>
                <Typography>Sales receipt id :</Typography>
                <Autocomplete
                  options={salesReceipts}
                  sx={{
                    ml: 1,
                    flexGrow: 1,
                  }}
                  clearOnBlur={true}
                  getOptionLabel={(option) => option.refId}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search receipt id"
                      fullWidth
                      size="small"
                      onChange={(e) => {
                        setSalesReceiptKeyword(e.target.value);
                      }}
                    />
                  )}
                  onChange={(e, value) => {
                    if (!value) return;
                    setSalesReceiptTankList(
                      value.gasTanks.map((oneEl) => ({ ...oneEl }))
                    );
                    setSelectedSalesReceipt(value);
                    setUpdateTable(true);
                  }}
                />
              </Box>

              <Box>
                <OrderSummeryTable
                  orderList={salesReceiptTankList}
                  hideTitles={true}
                  cols={[
                    "name",
                    "type",
                    "returnableQuantity",
                    "sellingPrice",
                    "action",
                  ]}
                  headingCells={[
                    "Gas Tank",
                    "Type",
                    "Quantity",
                    "Unit Price",
                    "Action",
                  ]}
                  receiptInfo={{
                    leftSideContent: [],
                    rightSideContent: [],
                  }}
                  totalCalculatedBy={"sellingPriceDealer"}
                  height="17rem"
                />
              </Box>
            </Box>
          </ContentCard>
        </Grid>
        <Grid item xs>
          <ContentCard sx={{ height: "100%" }}>
            <OrderSummeryTable
              orderList={orderList}
              title="Return Receipt"
              receiptInfo={{
                leftSideContent: [
                  <TitleAndContent
                    title={"Sales receipt:"}
                    content={
                      selectedSalesReceipt.refId
                        ? `#${selectedSalesReceipt.refId}`
                        : ""
                    }
                  />,
                  <TitleAndContent
                    title={"Issued on:"}
                    content={
                      selectedSalesReceipt.updatedAt
                        ? new Date(selectedSalesReceipt.updatedAt)
                            .toISOString()
                            .substring(0, 10)
                        : ""
                    }
                  />,
                  <TitleAndContent title={"Issued by:"} content={name} />,
                ],
                rightSideContent: [
                  <TitleAndContent
                    title={"Date:"}
                    content={new Date().toISOString().substring(0, 10)}
                  />,
                ],
              }}
              headingCells={[
                "Gas Tank",
                "Type",
                "Amount Left",
                "Selling Price",
                "Return Price",
              ]}
              cols={[
                "name",
                "type",
                "displayAmountLeft",
                "sellingPrice",
                "dispayReturnPrice",
              ]}
              totalCalculatedBy={"returnPrice"}
            />
            <Box
              flexGrow={1}
              mt={2}
              display="flex"
              justifyContent={"end"}
              alignItems="end"
              gap={2}
            >
              <Button
                color="primary"
                sx={{ borderRadius: 0.5, boxShadow: 0 }}
                variant="contained"
              >
                Clear
              </Button>
              {loading ? (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: 0, boxShadow: 0 }}
                  disabled
                >
                  Print{" "}
                  <CircularProgress
                    size={15}
                    color="inherit"
                    sx={{
                      ml: 1,
                    }}
                  />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: 0, boxShadow: 0 }}
                  onClick={onPrintClick}
                >
                  Print
                </Button>
              )}
            </Box>
          </ContentCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AcceptReturns;
