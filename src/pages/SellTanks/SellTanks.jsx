import { Delete } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showSystemAlert } from "../../app/alertServices";
import { downloadFile } from "../../app/api/fileDownloadService";
import {
  getStockSummery,
  stockInfoChartData,
} from "../../app/api/gasStockServices";
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
  const loadingDMS = useSelector((state) => state.loadingDMS);
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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    stockInfoChartData(
      {
        userId,
        types: ["NEW", "REFILLED"],
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
      searchGasTank({ keyword, types: ["NEW", "REFILLED"] }, (response) => {
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
          <Box
            display={"flex"}
            alignItems="center"
            justifyContent={"space-between"}
            pr={2}
          >
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

  const printReceipt = (fileName) => {
    downloadFile(
      fileName,
      (data) => {
        const iframe = document.createElement("iframe"); //load content in an iframe to print later
        document.body.appendChild(iframe);

        iframe.style.display = "none";
        iframe.src = data;
        iframe.onload = function () {
          setTimeout(function () {
            iframe.focus();
            iframe.contentWindow.print();
          }, 1);
        };
      },
      (error) => {},
      () => {
        setLoading(false);
      }
    );
  };

  const onPrintClick = () => {
    if (orderList.length > 0) {
      setValidationError({
        isVisible: false,
        message: "",
      });
      setLoading(true);
      newRecipt(
        {
          dealerId: userId,
          gasTanks: orderList.map((oneEl) => ({
            _id: oneEl._id,
            quantity: oneEl.quantity,
          })),
        },
        (response) => {
          if (response?.status === 0) {
            showSystemAlert("sales recipt created!", "success");
            printReceipt(response?.data?.fileName);
          } else {
            showSystemAlert(response?.error, "error");
          }
        },
        (error) => {
          showSystemAlert("Something went wrong", "error");
        },
        () => {
          setOrderList([]);
          setRefresh((prev) => !prev);
        }
      );
    } else {
      setValidationError({
        isVisible: true,
        message: "Please add some gas tanks to the list",
      });
    }
  };

  return (
    <Box my={1} mb={2}>
      <Typography fontSize="1.5rem" fontWeight="bold">
        Sell Gas Tank
      </Typography>

      <Grid container gap={2} mt={2}>
        <Grid item xs>
          <ContentCard
            sx={{
              pb: 3.5,
            }}
          >
            <OrderSummeryTable
              orderList={orderList}
              cols={["name", "type", "quantity", "sellingPrice", "total"]}
              receiptInfo={{
                leftSideContent: [
                  <TitleAndContent
                    title={"Issue by:"}
                    content={name}
                    key={1}
                  />,
                ],
                rightSideContent: [
                  <TitleAndContent
                    title={"Date:"}
                    content={new Date().toISOString().substring(0, 10)}
                    key={2}
                  />,
                ],
              }}
              height={"10rem"}
              totalCalculatedBy={"sellingPriceDealer"}
            />
          </ContentCard>
        </Grid>
        <Grid item xs={5}>
          <ContentCard sx={{ pl: 3, pb: 3 }}>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Tank Details{" "}
              {validationError.isVisible ? (
                <span
                  style={{
                    color: "red",
                    fontSize: "0.8rem",
                  }}
                >
                  * {validationError.message}
                </span>
              ) : (
                ""
              )}
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
                {loading ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    sx={{ borderRadius: 0, boxShadow: 0 }}
                    disabled
                  >
                    Print Bill{" "}
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
                    Print Bill
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ borderRadius: 0, boxShadow: 0 }}
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
          <ContentCard>
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
              {chartData.map((oneEl, index) => {
                const tankName =
                  oneEl.name.split(" ")[0] +
                  " " +
                  _.upperFirst(_.lowerCase(oneEl.type));
                return (
                  <DoughnutChartWithText
                    key={index}
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
          <ContentCard sx={{ pb: 3.8 }}>
            <Typography fontSize={"1.3rem"} fontWeight="bold">
              Recently Selected
            </Typography>
            <Grid container columnSpacing={1} rowSpacing={1}>
              <Grid item xs={6}>
                <ButtonCard btnText={"2.3Kg New Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"5Kg New Tank"} />
              </Grid>
              <Grid item xs={6}>
                <ButtonCard btnText={"37.5Kg New Tank"} />
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
