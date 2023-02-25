import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showSystemAlert } from "../../app/alertServices";
import { stockInfoChartData } from "../../app/api/gasStockServices";
import { searchGasTank } from "../../app/api/gasTankServices";
import { newRecipt } from "../../app/api/salesReceiptServices";
import ButtonCard from "../../components/ButtonCard/ButtonCard";
import ContentCard from "../../components/ContentCard/ContentCard";
import DoughnutChartWithText from "../../components/DoughnutChartWithText/DoughnutChartWithText";
import OrderSummeryTable from "../../components/OrderSummeryTable/OrderSummeryTable";
import StyledAutoComplete from "../../components/StyledAutoComplete/StyledAutoComplete";
import TitleAndContent from "../../components/TitleAndContent/TitleAndContent";
import { convertToRupees } from "../../utils/convertToRupees";
import "./index.css";
const SellTanks = () => {
  const { userId, name } = useSelector((state) => state.loginDMS);

  const [suggestedList, setSuggestedList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState("");
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
      if (Number(quantity) > 0) {
        setValidationError({
          isVisible: false,
          message: "",
        });
        const tempSelected = { ...selected };
        tempSelected["quantity"] = Number(quantity);
        tempSelected["total"] = convertToRupees(
          Number(quantity) * selected.sellingPriceDealer
        );
        tempSelected["sellingPrice"] = convertToRupees(
          selected.sellingPriceDealer
        );

        //set a function to delete the item from the list
        tempSelected["name"] = (
          <Box display={"flex"} alignItems="center">
            <Typography>{tempSelected["name"]}</Typography>
            <IconButton
              title="Delete"
              onClick={() => {
                setOrderList((prev) => {
                  return prev.filter((oneEl) => oneEl._id !== tempSelected._id);
                });
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        );

        setOrderList((prev) => [...prev, tempSelected]);
        setKeyword("");
        setSelected({});
        setQuantity("");
      } else {
        setValidationError({
          isVisible: true,
          message: "Please type the quantity",
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
    console.log("print");
    newRecipt(
      {
        dealerId: userId,
        gasTanks: orderList.map((oneEl) => ({
          _id: oneEl._id,
          quantity: oneEl.quantity,
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
        Sell Gas Tank
      </Typography>

      <Grid container gap={2} mt={2}>
        <OrderSummeryTable
          orderList={orderList}
          cols={["name", "type", "quantity", "sellingPrice", "total"]}
          receiptInfo={{
            leftSideContent: [
              <TitleAndContent title={"Issue by:"} content={name} key={1} />,
            ],
            rightSideContent: [
              <TitleAndContent
                title={"Date:"}
                content={new Date().toISOString().substring(0, 10)}
                key={2}
              />,
            ],
          }}
          totalCalculatedBy={"sellingPriceDealer"}
        />
        <Grid item xs={5}>
          <ContentCard sx={{ pl: 3 }}>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Tank Details
            </Typography>
            <Box
              sx={{
                height: "15.5rem",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box my={2} display="flex" gap={2}>
                <StyledAutoComplete
                  title={"Gas Tank Name"}
                  suggestedList={suggestedList}
                  keyword={keyword}
                  setKeyword={setKeyword}
                  setSuggestedList={setSuggestedList}
                  setSelected={setSelected}
                  suggessionName={"Suggested Gas Tanks"}
                  mt={0}
                />
                <Box
                  sx={{
                    width: "5rem",
                  }}
                >
                  <Typography>Qty</Typography>
                  <TextField
                    sx={{
                      mt: 1,
                    }}
                    size="small"
                    type={"text"}
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box>
                <TitleAndContent
                  title={"Tank Name"}
                  titleSx={{ color: "black" }}
                  content={`: ${selected.name ? selected.name : ""}`}
                  sx={{ mr: 2, gap: 4.5, pt: 2 }}
                />
              </Box>
              <Box>
                <TitleAndContent
                  title={"Selling Price"}
                  titleSx={{ color: "black" }}
                  content={`: ${
                    selected.sellingPriceDealer
                      ? convertToRupees(selected.sellingPriceDealer)
                      : ""
                  }`}
                  sx={{ mr: 2, gap: 3, pt: 2 }}
                />
              </Box>
              <Box>
                <TitleAndContent
                  title={"Quantity"}
                  titleSx={{ color: "black" }}
                  content={`: ${quantity}`}
                  sx={{ mr: 2, gap: 7, pt: 2 }}
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
                  variant="contained"
                  color="secondary"
                  sx={{ borderRadius: 0 }}
                  onClick={onPrintClick}
                >
                  Print Bill
                </Button>
                <Button
                  variant="contained"
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
              {chartData.map((oneEl, index) => (
                <DoughnutChartWithText
                  key={index}
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

export default SellTanks;
