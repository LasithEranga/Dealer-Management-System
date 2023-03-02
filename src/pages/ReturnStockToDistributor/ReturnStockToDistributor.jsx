import { Box, Button, Grid, TextField, Typography } from "@mui/material";
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

const ReturnStockToDistributor = () => {
  const { userId } = useSelector((state) => state.loginDMS);
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
        types: ["EMPTY", "RETURNED"],
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
      searchGasTank({ keyword, types: ["EMPTY", "RETURNED"] }, (response) => {
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
        Return Stock To Distributor
      </Typography>

      <Grid container gap={2} mt={2}>
        <Grid item xs>
          <ContentCard
            sx={{
              pb: 5,
            }}
          >
            <Typography
              fontSize={"1.3rem"}
              fontWeight="bold"
              textAlign={"center"}
            >
              Return receipt
            </Typography>
            <OrderSummeryTable
              orderList={orderList}
              title={"Return Receipt"}
              headingCells={["Gas Tank", "Type", "Quantity", "Ordered Price"]}
              cols={["name", "type", "quantity", "orderedPriceDealer"]}
              height={"13.5rem"}
              hideTitles={true}
            />
          </ContentCard>
        </Grid>
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
              <Box my={1} display="flex" gap={2}>
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
                  content={`: ${
                    selected.name
                      ? selected.name + " " + _.capitalize(selected.type)
                      : "Search Tank"
                  }`}
                  sx={{ mr: 2, gap: 4.5, pt: 2 }}
                />
              </Box>
              <Box>
                <TitleAndContent
                  title={"Ordered Price"}
                  titleSx={{ color: "black" }}
                  content={`: ${
                    selected.orderedPriceDealer
                      ? convertToRupees(selected.orderedPriceDealer)
                      : "-"
                  }`}
                  sx={{ mr: 2, gap: 2, pt: 2 }}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  my: 1.5,
                }}
              >
                <TitleAndContent
                  title={"Quantity"}
                  titleSx={{ color: "black" }}
                  content={<>: {quantity ? quantity : "-"}</>}
                  sx={{ mr: 2, gap: 7 }}
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
                  sx={{ borderRadius: 0, boxShadow: "none" }}
                  onClick={onPrintClick}
                >
                  Print Reciept
                </Button>
                <Button
                  color="primary"
                  variant="contained"
                  sx={{ borderRadius: 0, boxShadow: "none" }}
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
        <Grid item xs={6.8}>
          <ContentCard sx={{ height: "12rem" }}>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Stock Info
            </Typography>
            <Box
              display={"flex"}
              gap={3}
              sx={{
                width: "100%",
                overflowX: "auto",
                scrollbarWidth: "thin",
                overflowY: "hidden",
                pb: 1,
              }}
            >
              {chartData.map((oneEl) => {
                const tankName =
                  oneEl.name.split(" ")[0] +
                  " " +
                  _.upperFirst(_.lowerCase(oneEl.type));
                return (
                  <DoughnutChartWithText
                    chartTitle={tankName}
                    dataSet={[
                      oneEl.quantity,
                      oneEl.fullStockValue - oneEl.quantity,
                    ]}
                    count={oneEl.quantity}
                  />
                );
              })}
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
                <ButtonCard btnText={"12.5Kg Empty Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"37.5Kg Empty Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"2.3Kg Empty Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"5Kg Empty Tank"} />
              </Grid>
            </Grid>
          </ContentCard>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ReturnStockToDistributor;
