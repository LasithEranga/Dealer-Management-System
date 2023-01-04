import { Box, Button, Grid, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { searchGasTank } from "../../../app/api/gasTankServices";
import ContentCard from "../../../components/ContentCard/ContentCard";
import OrderSummeryTable from "../../../components/OrderSummeryTable/OrderSummeryTable";
import StyledAutoComplete from "../../../components/StyledAutoComplete/StyledAutoComplete";
import TitleAndContent from "../../../components/TitleAndContent/TitleAndContent";
import { convertToRupees } from "../../../utils/convertToRupees";
import "./index.css";

const StepOne = ({ orderList, setOrderList, setActiveStep }) => {
  const { name, outstandingAmount } = useSelector((state) => state.loginDMS);
  const [suggestedList, setSuggestedList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const [selected, setSelected] = useState({});
  const [quantity, setQuantity] = useState("");
  const [validationError, setValidationError] = useState({
    isVisible: false,
    message: "",
  });

  useEffect(() => {
    if (keyword !== "") {
      searchGasTank({ keyword }, (response) => {
        setSuggestedList(response.data);
      });
    }
  }, [keyword]);

  useEffect(() => {
    console.log(selected);
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

  return (
    <Box>
      <Grid container mt={2} gap={2}>
        <OrderSummeryTable
          height="16rem"
          title="Purchase Order"
          orderList={orderList}
        />
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
            <Box my={2}>
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
            </Box>
            <Box>
              <TitleAndContent
                title={"Tank Name:"}
                titleSx={{ color: "black" }}
                content={
                  selected.type
                    ? selected.name + " " + _.capitalize(selected.type)
                    : "Please select a tank"
                }
                sx={{ mr: 2, gap: 4.5, pt: 2 }}
              />
            </Box>
            <Box>
              <TitleAndContent
                title={"Selling Price:"}
                titleSx={{ color: "black" }}
                content={convertToRupees(
                  selected.sellingPriceDealer ? selected.sellingPriceDealer : 0
                )}
                sx={{ mr: 2, gap: 3, pt: 2 }}
              />
            </Box>
            <Box>
              <TitleAndContent
                title={"Quantity"}
                titleSx={{ color: "black" }}
                content={
                  <input
                    type={"text"}
                    className="quantity-input "
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(e.target.value);
                    }}
                  />
                }
                sx={{ mr: 2, gap: 7, pt: 2 }}
              />
            </Box>

            <Box
              flexGrow={1}
              display="flex"
              justifyContent={"start"}
              alignItems="center"
              gap={2}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 0, mt: 1 }}
                onClick={onAddClick}
              >
                Add
              </Button>
              {validationError.isVisible && (
                <Typography color={"error"}>
                  *{validationError.message}
                </Typography>
              )}
            </Box>
          </Box>
          <Box>
            <TitleAndContent
              title={"Outstanding Balance"}
              titleSx={{ color: "black" }}
              content={convertToRupees(outstandingAmount)}
              sx={{ mr: 2, gap: 3, mt: 3 }}
            />
            <Box
              flexGrow={1}
              display="flex"
              justifyContent={"start"}
              alignItems="end"
              gap={2}
              mt={2}
            >
              <Button
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 0, flexGrow: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 0, flexGrow: 1 }}
                onClick={() => {
                  setActiveStep(2);
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </ContentCard>
      </Grid>
    </Box>
  );
};

export default StepOne;
