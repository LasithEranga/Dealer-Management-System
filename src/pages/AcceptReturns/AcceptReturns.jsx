import { NextPlan } from "@mui/icons-material";
import {
  Autocomplete,
  Box,
  Button,
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
import "./index.css";
const AcceptReturns = () => {
  const { userId, name } = useSelector((state) => state.loginDMS);

  const [suggestedList, setSuggestedList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState({});
  const [amountLeft, setAmountLeft] = useState("");
  const [validationError, setValidationError] = useState({
    isVisible: false,
    message: "",
  });

  const [orderList, setOrderList] = useState([]);
  const [salesReceiptTankList, setSalesReceiptTankList] = useState([]);
  const [selectedSalesReceipt, setSelectedSalesReceipt] = useState({});
  const [chartData, setChartData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [salesReceipts, setSalesReceipts] = useState([]);
  const [salesReceiptKeyword, setSalesReceiptKeyword] = useState("");
  const [insertRecordAt, setInsertRecordAt] = useState(-1);

  useEffect(() => {
    stockInfoChartData(
      {
        userId,
      },
      (response) => {
        setChartData(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  }, [refresh]);

  // useEffect(() => {
  //   if (keyword !== "") {
  //     searchGasTank({ keyword }, (response) => {
  //       setSuggestedList(response.data);
  //     });
  //   }
  // }, [keyword]);

  // useEffect(() => {
  //   console.log(orderList);
  //   if (selected.name) {
  //     setKeyword(selected.name + " " + _.capitalize(selected.type));
  //   }
  // }, [selected]);

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

  const onAddClick = () => {
    if (selected.name) {
      if (Number(amountLeft) > 0) {
        setValidationError({
          isVisible: false,
          message: "",
        });
        const tempSelected = { ...selected };
        let tankWeight = selected.name.split(" ")[0];

        tankWeight = parseFloat(tankWeight.substring(0, tankWeight.length - 2));

        tempSelected["amountLeft"] = Number(amountLeft);
        tempSelected["returnPrice"] = (
          (Number(amountLeft) / tankWeight) *
          selected.sellingPriceDealer
        ).toFixed(2);
        console.log(tempSelected);
        setOrderList((prev) => [...prev, tempSelected]);
        setKeyword("");
        setSelected({});
        setAmountLeft("");
      } else {
        setValidationError({
          isVisible: true,
          message: "Please type the amount left",
        });
      }
    } else {
      setValidationError({
        isVisible: true,
        message: "Please select a gas tank",
      });
    }
  };

  const onPrintClick = () => {
    newReturnRecipt(
      {
        dealerId: userId,
        gasTanks: orderList.map((oneEl) => ({
          _id: oneEl._id,
          amountLeft: oneEl.amountLeft,
          returnPrice: parseFloat(oneEl.returnPrice),
        })),
      },
      (response) => {
        showSystemAlert("Recipt printed", "success");
        setOrderList([]);
        setRefresh((prev) => !prev);
        setSalesReceiptTankList([]);
        setSalesReceiptKeyword("");
        setSalesReceipts([]);
      }
    );
  };

  useEffect(() => {
    console.log(salesReceiptTankList);
  }, [salesReceiptTankList]);

  useEffect(() => {
    if (insertRecordAt !== -1) {
      setOrderList((prev) => {
        console.log(salesReceiptTankList[insertRecordAt]);
        return [...prev, salesReceiptTankList[insertRecordAt]];
      });
      //reduce 1 from quantity in tank  list
      let temp = [...salesReceiptTankList];
      temp[insertRecordAt].quantity -= 1;
      if (temp[insertRecordAt].quantity === 0) {
        temp.splice(insertRecordAt, 1);
      } else {
        //reset fields
        temp[insertRecordAt].amountLeft = "";
        temp[insertRecordAt].returnPrice = "";
      }
      setSalesReceiptTankList(temp);

      setInsertRecordAt(-1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [insertRecordAt]);

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
                    //set selling price copy to show in table
                    value.gasTanks.forEach((oneEl, index) => {
                      oneEl["sellingPrice"] = convertToRupees(
                        oneEl.sellingPriceDealer
                      );
                      oneEl["action"] = (
                        <>
                          <Box
                            display={"flex"}
                            alignItems={"center"}
                            justifyContent={"space-evenly"}
                          >
                            <Input
                              placeholder="A. left"
                              title="Amount left in tank"
                              variant="standard"
                              size="small"
                              type="number"
                              id={`${index}`}
                              sx={{
                                minWidth: "20px",
                                maxWidth: "75px",
                                "& input": {
                                  minWidth: "20px",
                                  maxWidth: "75px",
                                },
                              }}
                              endAdornment={
                                <InputAdornment position="start">
                                  Kg
                                </InputAdornment>
                              }
                              value={salesReceiptTankList[index]?.amountLeft}
                              onChange={(e) => {
                                const index = Number(e.target.id);
                                setSalesReceiptTankList((prev) => {
                                  prev[index]["amountLeft"] = e.target.value;
                                  let tankWeight =
                                    prev[index].name.split("KG")[0];
                                  prev[index]["returnPrice"] = (
                                    (e.target.value / tankWeight) *
                                    prev[index].sellingPriceDealer
                                  ).toFixed(2);
                                  return [...prev];
                                });
                              }}
                            />
                            <IconButton
                              color="primary"
                              title="Add tank to return receipt"
                              id={`${index}`}
                              onClick={(e) => {
                                const index = Number(e.target.id);
                                console.log(index);
                                setInsertRecordAt(index);
                              }}
                            >
                              <NextPlan />
                            </IconButton>
                          </Box>
                        </>
                      );
                    });
                    setSalesReceiptTankList(value.gasTanks);
                    setSelectedSalesReceipt(value);
                  }}
                />
              </Box>

              <Box>
                <OrderSummeryTable
                  orderList={salesReceiptTankList}
                  hideTitles={true}
                  cols={["name", "type", "quantity", "sellingPrice", "action"]}
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
                />
              </Box>
              <Box
                flexGrow={1}
                mt={1}
                display="flex"
                justifyContent={"end"}
                alignItems="end"
                gap={2}
              >
                <Button
                  color="primary"
                  onClick={onAddClick}
                  sx={{ borderRadius: 0.5, boxShadow: 0 }}
                  variant="contained"
                >
                  Clear
                </Button>
                <Button
                  color="secondary"
                  variant="contained"
                  sx={{ borderRadius: 0.5, boxShadow: 0 }}
                  onClick={onPrintClick}
                >
                  Print
                </Button>
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
                    content={"#455556156"}
                  />,
                  <TitleAndContent
                    title={"Issued on:"}
                    content={new Date().toISOString().substring(0, 10)}
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
                "amountLeft",
                "sellingPriceDealer",
                "returnPrice",
              ]}
            />
          </ContentCard>
        </Grid>
      </Grid>
      {/* <Grid container gap={2} mt={2}>
        <Grid item xs>
          <ContentCard sx={{ height: "12rem" }}>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Stock Info
            </Typography>
            <Box display={"flex"} gap={3}>
              {chartData.map((oneEl) => (
                <DoughnutChartWithText
                  chartTitle={_.capitalize(oneEl._id) + " Tank"}
                  dataSet={[
                    oneEl.quantity,
                    oneEl.fullStockValue - oneEl.quantity,
                  ]}
                  count={oneEl.quantity}
                />
              ))}
            </Box>
          </ContentCard>
        </Grid>
        <Grid item xs={5}>
          <ContentCard>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Recently Selected
            </Typography>
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Grid item xs={6}>
                <ButtonCard btnText={"12.5Kg New Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"12.5Kg New Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"12.5Kg New Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"12.5Kg New Tank"} />
              </Grid>
            </Grid>
          </ContentCard>
        </Grid>
      </Grid> */}
    </Box>
  );
};

export default AcceptReturns;
