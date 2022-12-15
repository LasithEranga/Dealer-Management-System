import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import DealerDetails from "./DealerDetails";
import StockDetails from "./StockDetails";
import StyledAutoComplete from "../../components/StyledAutoComplete/StyledAutoComplete";
import { searchDealer } from "../../app/api/userServices";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import _ from "lodash";
import { getInitials } from "../../utils/generateInitials";
import { covertToRupees } from "../../utils/convertToRupees";
import { getStockByUser, searchGasStock } from "../../app/api/gasStockServices";
import useAutoComplete from "../../hooks/useAutoComplete";

const DistributeStock = () => {
  const { userId } = useSelector((state) => state.loginDMS);

  const [
    dealerKeyword,
    setDealerKeyword,
    suggestedDealerList,
    setSuggestedDealerList,
    selectedDealer,
    setSelectedDealer,
    setSearchedDealer,
  ] = useAutoComplete(searchDealer, { userId });

  useEffect(() => {
    if (selectedDealer.name) {
      setDealerKeyword(selectedDealer.name);
      setSearchedDealer(selectedDealer.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDealer]);

  const [
    stockKeyword,
    setStockKeyword,
    suggestedStockList,
    setSuggestedStockList,
    selectedStock,
    setSelectedStock,
    setSearchedStock,
  ] = useAutoComplete(searchGasStock, { userId });

  useEffect(() => {
    if (selectedStock.name) {
      setStockKeyword(selectedStock.name + " " + selectedStock.gasTankType);
      setSearchedStock(selectedStock.name + " " + selectedStock.gasTankType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStock]);

  return (
    <Box mt={1}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        my={1}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          Distribute Stock
        </Typography>
      </Box>

      <Grid container mt={2} columnSpacing={2}>
        <Grid item xs={5}>
          <ContentCard>
            <Typography fontWeight={"bold"} fontSize="1.5rem">
              Search Dealer
            </Typography>
            <Box sx={{ mr: 2, my: 1 }}>
              <StyledAutoComplete
                title={""}
                placeholder="Search Dealer"
                suggestedList={suggestedDealerList}
                setSuggestedList={setSuggestedDealerList}
                setSelected={setSelectedDealer}
                suggessionName={"Suggested Dealers"}
                madeOf={["name"]}
                keyword={dealerKeyword}
                setKeyword={setDealerKeyword}
              />
            </Box>

            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent="center"
              my={2}
            >
              <Box
                display={"flex"}
                alignItems={"center"}
                justifyContent="center"
                sx={{
                  width: "8rem",
                  height: "8rem",
                  backgroundColor: "#F7F7F7",
                  borderRadius: "50%",
                }}
              >
                <Typography fontSize={"3rem"} fontWeight={"bold"}>
                  {selectedDealer.name
                    ? getInitials(selectedDealer.name)
                    : "search"}
                </Typography>
              </Box>
            </Box>

            <DealerDetails
              title={"Name:"}
              content={selectedDealer.name ?? ""}
            />
            <DealerDetails
              title={"Store:"}
              content={selectedDealer.storeAddress ?? ""}
            />
            <DealerDetails
              title={"Outstanding:"}
              content={covertToRupees(selectedDealer.outstandingAmount ?? 0)}
            />
            <DealerDetails
              title={"Address:"}
              content={selectedDealer.address ?? ""}
            />

            <Box display={"flex"} justifyContent="end" mt={2}>
              <Button variant="contained">Okay</Button>
            </Box>
          </ContentCard>
        </Grid>
        <Grid item xs display={"flex"} flexDirection="column">
          <Box
            p={2}
            flexGrow={1}
            display={"flex"}
            flexDirection="column"
            sx={{ backgroundColor: "white", borderRadius: 2 }}
          >
            <Typography fontWeight={"bold"} fontSize="1.5rem">
              Stock details
            </Typography>
            <Box sx={{ mr: 2, my: 1 }}>
              <StyledAutoComplete
                title={"Tank & Type"}
                placeholder="Search Dealer"
                suggestedList={suggestedStockList}
                setSuggestedList={setSuggestedStockList}
                setSelected={setSelectedStock}
                suggessionName={"Suggested Dealers"}
                madeOf={["name", "gasTankType"]}
                keyword={stockKeyword}
                setKeyword={setStockKeyword}
                mt={0}
              />
            </Box>
            <Box sx={{ mr: 2, my: 1 }}>
              <Typography>Available Qty @ In-House</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                value={selectedStock.quantity ?? "0"}
                sx={{ mt: 1 }}
                inputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            <StockDetails title={"Quantity"} placeholder={"50"} />
            <Box
              display="flex"
              flexGrow={1}
              alignItems={"end"}
              gap={2}
              justifyContent="end"
              mr={2}
            >
              <Button variant="outlined">Clear</Button>
              <Button variant="contained">Allocate</Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DistributeStock;
