import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { showSystemAlert } from "../../app/alertServices";
import { searchGasStock } from "../../app/api/gasStockServices";
import { acceptOrder, newOrder } from "../../app/api/purchaseOrderServices";
import { searchDealer } from "../../app/api/userServices";
import ContentCard from "../../components/ContentCard/ContentCard";
import PlainTable from "../../components/PlainTable/PlainTable";
import StyledAutoComplete from "../../components/StyledAutoComplete/StyledAutoComplete";
import useAutoComplete from "../../hooks/useAutoComplete";
import { covertToRupees } from "../../utils/convertToRupees";
import { getInitials } from "../../utils/generateInitials";
import DealerDetails from "./DealerDetails";

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

  const [selectedStockList, setSelectedStockList] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [newOrderId, setNewOrderId] = useState("");

  useEffect(() => {
    if (selectedStock.name) {
      setStockKeyword(selectedStock.name + " " + selectedStock.gasTankType);
      setSearchedStock(selectedStock.name + " " + selectedStock.gasTankType);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStock]);

  const handleAddClick = () => {
    if (selectedStock.name) {
      setSelectedStockList((prev) => [
        ...prev,
        {
          _id: selectedStock.gasTankId,
          orderedPriceDealer: selectedStock.orderedPriceDealer,
          total: selectedStock.orderedPriceDealer * quantity,
          name: selectedStock.name,
          gasTankType: selectedStock.gasTankType,
          quantity: quantity,
          orderedPriceDealerLabel: covertToRupees(
            selectedStock.orderedPriceDealer
          ),
          totalLabel: covertToRupees(
            selectedStock.orderedPriceDealer * quantity
          ),
        },
      ]);
      setSelectedStock({});
      setStockKeyword("");
      setQuantity("");
    }
  };

  const handleOnClickDistribute = () => {
    // place a purchase order and then accept it automatically
    const request = {
      distributorId: userId,
      dealerId: selectedDealer._id,
      gasTanks: selectedStockList.map((stock) => {
        return {
          _id: stock._id,
          quantity: stock.quantity,
          unitState: "PENDING",
        };
      }),
      state: "PENDING",
    };

    newOrder(
      request,
      (response) => {
        console.log(response);
        acceptOrder(
          {
            purchaseOrderId: response.data._id,
          },
          (response) => {
            console.log(response);
            if (response.status === 0) {
              showSystemAlert("Distribution Success!", "success");
              setSelectedStockList([]);
              setSelectedDealer({});
            } else {
              showSystemAlert("Distribution Failed!", "error");
            }
          },
          (err) => {
            console.log(err);
          }
        );
      },
      (err) => {
        console.log(err);
      }
    );

    //accept the order
  };

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
              content={
                selectedDealer.outstandingAmount
                  ? covertToRupees(selectedDealer.outstandingAmount)
                  : ""
              }
            />
            <DealerDetails
              title={"Address:"}
              content={selectedDealer.address ?? ""}
            />
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
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <StyledAutoComplete
                  title={"Tank & Type"}
                  placeholder="Search stock"
                  suggestedList={suggestedStockList}
                  setSuggestedList={setSuggestedStockList}
                  setSelected={setSelectedStock}
                  suggessionName={"Suggested Stocks"}
                  madeOf={["name", "gasTankType"]}
                  keyword={stockKeyword}
                  setKeyword={setStockKeyword}
                  mt={0}
                />
              </Grid>
              <Grid item xs={4}>
                <Box>
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
              </Grid>
              <Grid item xs={4}>
                <Box>
                  <Typography>Quantity</Typography>
                  <TextField
                    fullWidth
                    size="small"
                    variant="outlined"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    sx={{ mt: 1 }}
                  />
                </Box>
              </Grid>
            </Grid>
            <Box mt={2} display="flex" justifyContent="flex-end">
              <Button variant="contained" onClick={handleAddClick}>
                Add
              </Button>
            </Box>

            <Box>
              <PlainTable
                dataList={selectedStockList}
                height="10rem"
                ignoreFirstColumns={3}
              />
            </Box>
            <Box
              display="flex"
              flexGrow={1}
              alignItems={"end"}
              gap={2}
              justifyContent="end"
              mr={2}
            >
              <Button variant="outlined">Clear All</Button>
              <Button variant="contained" onClick={handleOnClickDistribute}>
                Distribute
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DistributeStock;
