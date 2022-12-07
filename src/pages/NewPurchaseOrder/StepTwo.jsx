import { Button, Grid, Typography } from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import React, { useState } from "react";
import CustomModal from "../../components/CustomModal/CustomModal";
import ReceiptTable from "../../components/ReciptTable/ReceiptTable";
import RowItem from "../../components/RowItem/RowItem";
import logo from "../../asessts/logo.png";
import { useEffect } from "react";
import { covertToRupees } from "../../utils/convertToRupees";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  maxHeight: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
  pr: 0,
  borderRadius: 1,
};
const StepTwo = ({ orderList, setActiveStep }) => {
  const [open, setOpen] = useState(true);
  const [orderTotal, setOrderTotal] = useState(true);

  const onClickNext = () => {
    setActiveStep(4);
    setOpen(false);
  };

  useEffect(() => {
    let total = 0;
    orderList.forEach((oneEl) => {
      total = total + oneEl.quantity * oneEl.orderedPriceDealer;
    });
    setOrderTotal(total);
  }, [orderList]);
  return (
    <CustomModal open={open} setOpen={setOpen} width={600} pr={2}>
      <Box>
        <img src={logo} alt="" width={"100px"} height={"35px"} />
        <Typography fontSize="1.5rem" fontWeight={"bold"} sx={{ my: 1 }}>
          PURCHASE ORDER
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#7b27c1", pl: 1 }}>
        <Typography fontSize="1.5rem" color={"white"}>
          Order Details
        </Typography>
      </Box>
      <Box sx={{ backgroundColor: "#E1E1E1", pl: 1 }}>
        <Grid container pt={1}>
          <Grid item xs>
            <RowItem title={"Order No"} content={": #37478"} sx={{ mt: 1 }} />
            <RowItem title={"Date"} content={": 25/12/2022"} sx={{ mt: 1 }} />
            <RowItem
              title={"Delivery Address"}
              content={
                <>
                  <Typography sx={{ fontWeight: "bold" }}>
                    : Sampath Store,
                  </Typography>
                  <Typography sx={{ pl: 1 }}>200D,</Typography>
                  <Typography sx={{ pl: 1 }}>Panadura Rd,</Typography>
                  <Typography sx={{ pl: 1 }}>Horana.</Typography>
                </>
              }
              sx={{ mt: 1 }}
            />
          </Grid>
          <Grid item xs={5}>
            <RowItem
              title={"Distributor"}
              content={": Vajira"}
              sx={{ mt: 1 }}
            />
            <RowItem title={"Dealer"} content={": Sampath"} sx={{ mt: 1 }} />
            <RowItem
              title={"Status"}
              content={
                <Box display={"flex"} alignItems="center">
                  <Typography fontWeight="bold">:</Typography>
                  <Typography color={"#1CB82B"} sx={{ ml: 1 }}>
                    Pending
                  </Typography>
                  <Box
                    sx={{
                      ml: 1,
                      mt: 0.5,
                      height: "0.7rem",
                      width: "0.7rem",
                      backgroundColor: "#1CB82B",
                      borderRadius: "50%",
                    }}
                  ></Box>
                </Box>
              }
              sx={{ mt: 1 }}
            />
          </Grid>
        </Grid>
      </Box>

      <Box
        mt={2}
        height="10rem"
        sx={{ overflowY: "auto", scrollbarWidth: "thin" }}
      >
        <ReceiptTable orderList={orderList} />
      </Box>
      <Box
        mt={2}
        display="flex"
        justifyContent={"end"}
        alignItems="center"
        gap={2}
      >
        <Box
          sx={{
            backgroundColor: "#7b27c1",
            p: 1,
            px: 2,
            color: "white",
          }}
        >
          ORDER TOTAL
        </Box>
        <Typography fontWeight={"bold"} fontSize="1.2rem">
          {covertToRupees(orderTotal)}
        </Typography>
      </Box>
      <Box
        sx={{
          height: "5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "end",
        }}
      >
        <Button
          color="secondary"
          variant="outlined"
          sx={{ borderRadius: 0.5, px: 4 }}
        >
          Back
        </Button>
        <Button
          variant="outlined"
          sx={{ borderRadius: 0.1, px: 4 }}
          onClick={onClickNext}
        >
          Next
        </Button>
      </Box>
    </CustomModal>
  );
};

export default StepTwo;
