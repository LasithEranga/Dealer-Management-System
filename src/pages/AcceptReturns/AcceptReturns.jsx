import {
  Autocomplete,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showSystemAlert } from "../../app/alertServices";
import { stockInfoChartData } from "../../app/api/gasStockServices";
import { searchGasTank } from "../../app/api/gasTankServices";
import { newReturnRecipt } from "../../app/api/returnReceiptServices";
import { newRecipt } from "../../app/api/salesReceiptServices";
import ButtonCard from "../../components/ButtonCard/ButtonCard";
import ContentCard from "../../components/ContentCard/ContentCard";
import DoughnutChartWithText from "../../components/DoughnutChartWithText/DoughnutChartWithText";
import OrderSummeryTable from "../../components/OrderSummeryTable/OrderSummeryTable";
import StyledAutoComplete from "../../components/StyledAutoComplete/StyledAutoComplete";
import TitleAndContent from "../../components/TitleAndContent/TitleAndContent";
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
  const [chartData, setChartData] = useState([]);
  const [refresh, setRefresh] = useState(false);

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

  useEffect(() => {
    if (keyword !== "") {
      searchGasTank({ keyword }, (response) => {
        setSuggestedList(response.data);
      });
    }
  }, [keyword]);

  useEffect(() => {
    console.log(orderList);
    if (selected.name) {
      setKeyword(selected.name + " " + _.capitalize(selected.type));
    }
  }, [selected]);

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
      }
    );
  };

  return (
    <Box my={1} mb={2}>
      <Typography fontSize="1.5rem" fontWeight="bold">
        Accept Returned Gas Tanks
      </Typography>

      <Grid container gap={2} mt={2}>
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
        <Grid item xs={5}>
          <ContentCard sx={{ pl: 3 }}>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Sales Receipt
            </Typography>
            <Box
              sx={{
                height: "15.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box my={2} display="flex" alignItems={"center"}>
                {/* <StyledAutoComplete
                  title={"Gas Tank Name"}
                  suggestedList={suggestedList}
                  keyword={keyword}
                  setKeyword={setKeyword}
                  setSuggestedList={setSuggestedList}
                  setSelected={setSelected}
                  suggessionName={"Suggested Gas Tanks"}
                  mt={0}
                /> */}
                <Typography>Sales receipt id :</Typography>
                <Autocomplete
                  options={[]}
                  sx={{
                    ml: 1,
                    flexGrow: 1,
                  }}
                  getOptionLabel={(option) => option.name}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      placeholder="Search receipt id"
                      fullWidth
                      size="small"
                    />
                  )}
                  onChange={(e, value) => console.log(value)}
                />
              </Box>

              <Box>
                {/* <TitleAndContent
                  title={"Amount Left"}
                  titleSx={{ color: "black" }}
                  content={
                    <input
                      type={"text"}
                      value={amountLeft}
                      onChange={(e) => {
                        setAmountLeft(e.target.value);
                      }}
                    />
                  }
                  sx={{ mr: 2, gap: 4, pt: 2 }}
                /> */}
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
                  color="secondary"
                  sx={{ borderRadius: 0 }}
                  onClick={onPrintClick}
                >
                  Print
                </Button>
                <Button
                  color="primary"
                  sx={{ borderRadius: 0 }}
                  onClick={onAddClick}
                >
                  Add
                </Button>
              </Box>
            </Box>
          </ContentCard>
        </Grid>
      </Grid>
      <Grid container gap={2} mt={2}>
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
      </Grid>
    </Box>
  );
};

export default AcceptReturns;
