import { Search } from "@mui/icons-material";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { showSystemAlert } from "../../app/alertServices";
import { searchGasStock } from "../../app/api/gasStockServices";
import { acceptOrder, newOrder } from "../../app/api/purchaseOrderServices";
import { searchDealer } from "../../app/api/userServices";
import ContentCard from "../../components/ContentCard/ContentCard";
import PlainTable from "../../components/PlainTable/PlainTable";
import StyledAutoComplete from "../../components/StyledAutoComplete/StyledAutoComplete";
import useAutoComplete from "../../hooks/useAutoComplete";
import { convertToRupees } from "../../utils/convertToRupees";
import { getInitials } from "../../utils/generateInitials";
import DealerDetails from "./DealerDetails";

const DistributeStock = () => {
  const { userId } = useSelector((state) => state.loginDMS);
  const locationState = useLocation().state;
  const [order, setOrder] = useState(
    locationState ? locationState.order : null
  );

  const [
    dealerKeyword,
    setDealerKeyword,
    suggestedDealerList,
    setSuggestedDealerList,
    selectedDealer,
    setSelectedDealer,
    setSearchedDealer,
  ] = useAutoComplete(searchDealer, { userId });
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
    if (selectedDealer.name) {
      setDealerKeyword(selectedDealer.name);
      setSearchedDealer(selectedDealer.name);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDealer]);

  useEffect(() => {
    console.log(order);
    if (order) {
      //setting the gas tank details
      setSelectedStockList(
        order.gasTanks.map((oneEl) => {
          return {
            _id: oneEl.gasTank._id,
            orderedPriceDistributor: oneEl.orderedPriceDealer,
            orderedPriceDealer: oneEl.orderedPriceDealer,
            total: oneEl.subTotal,
            name: oneEl.gasTank.name,
            gasTankType: oneEl.gasTank.type,
            quantity: oneEl.quantity,
            orderedPriceDealerLabel: convertToRupees(oneEl.orderedPriceDealer),
            totalLabel: convertToRupees(oneEl.subTotal),
          };
        })
      );
      //setting the dealer details
      setSelectedDealer(order.dealer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order]);

  const [selectedStockList, setSelectedStockList] = useState([]);
  const [quantity, setQuantity] = useState("");

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
          orderedPriceDistributor: selectedStock.orderedPriceDealer,
          total: selectedStock.orderedPriceDealer * quantity,
          name: selectedStock.name,
          gasTankType: selectedStock.gasTankType,
          quantity: quantity,
          orderedPriceDealerLabel: convertToRupees(
            selectedStock.orderedPriceDealer
          ),
          totalLabel: convertToRupees(
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
    //accept order directly, if the deaker has previously made the order
    if (order) {
      acceptOrder(
        {
          purchaseOrderId: order._id,
        },
        (response) => {
          console.log(response);
          if (response.status === 0) {
            showSystemAlert("Distribution Success!", "success");
            setSelectedStockList([]);
            setOrder(null);
            setSelectedDealer({});
            setDealerKeyword("");
          }
        }
      );
      return;
    }

    // place a purchase order and then accept it automatically
    const request = {
      distributorId: userId,
      dealerId: selectedDealer._id,
      placedBy: "Distributor",
      gasTanks: selectedStockList.map((stock) => {
        return {
          _id: stock._id,
          quantity: stock.quantity,
          orderedPriceDealer: stock.orderedPriceDealer,
          orderedPriceDistributor: stock.orderedPriceDistributor,
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
              setDealerKeyword("");
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
                  {selectedDealer.name ? (
                    getInitials(selectedDealer.name)
                  ) : (
                    <Search sx={{ fontSize: "5rem", mt: 3 }} />
                  )}
                </Typography>
              </Box>
            </Box>

            <DealerDetails
              title={"Name:"}
              content={_.capitalize(selectedDealer.name) ?? ""}
            />
            <DealerDetails
              title={"Store:"}
              content={selectedDealer.storeAddress ?? ""}
            />
            <DealerDetails
              title={"Outstanding:"}
              content={
                selectedDealer.outstandingAmount
                  ? convertToRupees(selectedDealer.outstandingAmount)
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
                ignoreFirstColumns={4}
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
