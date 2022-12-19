import { Done } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import DotsAnimation from "../../components/DotsAnimation/DotsAnimation";
import { useEffect } from "react";
import { newOrder } from "../../app/api/purchaseOrderServices";
import { useSelector } from "react-redux";
import { showSystemAlert } from "../../app/alertServices";
const StepThree = ({ orderList, setActiveStep, setOrderList }) => {
  const { userId, name, distributor } = useSelector((state) => state.loginDMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    newOrder(
      {
        distributorId: distributor._id,
        dealerId: userId,
        placedBy: name,
        gasTanks: orderList,
        state: "PENDING",
      },
      (response) => {
        if (response.status === 0) {
          showSystemAlert(response.message, "success");
          setOrderList([]);
          setLoading(false);
        } else {
        }
      }
    );
  }, []);
  return (
    <Box mt={2}>
      <ContentCard>
        <Box
          sx={{
            height: "18rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading && (
            <Box>
              <h1>Processing your order</h1>
              <DotsAnimation />
            </Box>
          )}

          {!loading && (
            <Box
              display={"flex"}
              justifyContent="center"
              alignItems={"center"}
              color="#00AB55"
            >
              <CheckCircleOutlineIcon sx={{ fontSize: "5rem" }} />
              <Typography fontSize={"1.5rem"}>
                Purchase Order Placed!
              </Typography>
            </Box>
          )}
        </Box>
        {!loading && (
          <Box
            display={"flex"}
            justifyContent="end"
            alignItems={"center"}
            pr={3}
          >
            <Button
              sx={{ px: 4, borderRadius: 0.2 }}
              variant="contained"
              onClick={() => {
                setActiveStep(1);
              }}
            >
              Done
            </Button>
          </Box>
        )}
      </ContentCard>
    </Box>
  );
};

export default StepThree;
