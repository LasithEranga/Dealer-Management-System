import { Box, Typography } from "@mui/material";
import React, { useState } from "react";
import { useEffect } from "react";
import ContentCard from "../../../components/ContentCard/ContentCard";
import Stepper from "../../../components/Stepper/Stepper";
import StepOne from "./StepOne";
import StepThree from "./StepThree";
import StepTwo from "./StepTwo";
const NewPurchaseOrder = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    console.log(activeStep);
  }, [activeStep]);

  return (
    <Box>
      <Typography fontSize="1.5rem" fontWeight="bold" sx={{ my: 1 }}>
        New Purchase Order
      </Typography>
      <Box>
        <ContentCard>
          <Stepper activeStep={activeStep} />
        </ContentCard>
      </Box>
      <Box>
        {activeStep === 1 && (
          <StepOne
            setActiveStep={setActiveStep}
            orderList={orderList}
            setOrderList={setOrderList}
          />
        )}

        {activeStep === 2 && (
          <StepTwo
            setActiveStep={setActiveStep}
            orderList={orderList}
            setOrderList={setOrderList}
          />
          // <CustomModal open={open} setOpen={setOpen} width={600} pr={2}>
          //   <Box>
          //     <img src={logo} alt="" width={"100px"} height={"35px"} />
          //     <Typography fontSize="1.5rem" fontWeight={"bold"} sx={{ my: 1 }}>
          //       PURCHASE ORDER
          //     </Typography>
          //   </Box>
          //   <Box sx={{ backgroundColor: "#7b27c1", pl: 1 }}>
          //     <Typography fontSize="1.5rem" color={"white"}>
          //       Order Details
          //     </Typography>
          //   </Box>
          //   <Box sx={{ backgroundColor: "#E1E1E1", pl: 1 }}>
          //     <Grid container pt={1}>
          //       <Grid item xs>
          //         <RowItem
          //           title={"Order No"}
          //           content={": #37478"}
          //           sx={{ mt: 1 }}
          //         />
          //         <RowItem
          //           title={"Date"}
          //           content={": 25/12/2022"}
          //           sx={{ mt: 1 }}
          //         />
          //         <RowItem
          //           title={"Delivery Address"}
          //           content={
          //             <>
          //               <Typography sx={{ fontWeight: "bold" }}>
          //                 : Sampath Store,
          //               </Typography>
          //               <Typography sx={{ pl: 1 }}>200D,</Typography>
          //               <Typography sx={{ pl: 1 }}>Panadura Rd,</Typography>
          //               <Typography sx={{ pl: 1 }}>Horana.</Typography>
          //             </>
          //           }
          //           sx={{ mt: 1 }}
          //         />
          //       </Grid>
          //       <Grid item xs={5}>
          //         <RowItem
          //           title={"Distributor"}
          //           content={": Vajira"}
          //           sx={{ mt: 1 }}
          //         />
          //         <RowItem
          //           title={"Dealer"}
          //           content={": Sampath"}
          //           sx={{ mt: 1 }}
          //         />
          //         <RowItem
          //           title={"Status"}
          //           content={
          //             <Box display={"flex"} alignItems="center">
          //               <Typography fontWeight="bold">:</Typography>
          //               <Typography color={"#1CB82B"} sx={{ ml: 1 }}>
          //                 Pending
          //               </Typography>
          //               <Box
          //                 sx={{
          //                   ml: 1,
          //                   mt: 0.5,
          //                   height: "0.7rem",
          //                   width: "0.7rem",
          //                   backgroundColor: "#1CB82B",
          //                   borderRadius: "50%",
          //                 }}
          //               ></Box>
          //             </Box>
          //           }
          //           sx={{ mt: 1 }}
          //         />
          //       </Grid>
          //     </Grid>
          //   </Box>

          //   <Box
          //     mt={2}
          //     height="10rem"
          //     sx={{ overflowY: "auto", scrollbarWidth: "thin" }}
          //   >
          //     <ReceiptTable />
          //   </Box>
          //   <Box
          //     mt={2}
          //     display="flex"
          //     justifyContent={"end"}
          //     alignItems="center"
          //     gap={2}
          //   >
          //     <Box
          //       sx={{
          //         backgroundColor: "#7b27c1",
          //         p: 1,
          //         px: 2,
          //         color: "white",
          //       }}
          //     >
          //       ORDER TOTAL
          //     </Box>
          //     <Typography fontWeight={"bold"} fontSize="1.2rem">
          //       Rs: 125000.00
          //     </Typography>
          //   </Box>
          //   <Box
          //     sx={{
          //       height: "5rem",
          //       display: "flex",
          //       justifyContent: "space-between",
          //       alignItems: "end",
          //     }}
          //   >
          //     <Button
          //       color="secondary"
          //       variant="outlined"
          //       sx={{ borderRadius: 0.5, px: 4 }}
          //     >
          //       Back
          //     </Button>
          //     <Button
          //       variant="outlined"
          //       sx={{ borderRadius: 0.1, px: 4 }}
          //       onClick={onClickNext}
          //     >
          //       Next
          //     </Button>
          //   </Box>
          // </CustomModal>
        )}

        {activeStep === 4 && (
          <StepThree
            setActiveStep={setActiveStep}
            orderList={orderList}
            setOrderList={setOrderList}
          />
        )}
      </Box>
    </Box>
  );
};

export default NewPurchaseOrder;
