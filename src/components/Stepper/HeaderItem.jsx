import { Done } from "@mui/icons-material";
import { Box, Chip, Grid, Typography } from "@mui/material";
import React from "react";
import ColouredLine from "../ColouredLine/ColouredLine";
import FlexBox from "../FlexBox/FlexBox";
import StepIcon from "./StepIcon";

// Completed, inprogress, pending

const HeaderItem = ({ xs, title, activeStep, icon, step }) => {
  console.log(activeStep, step);
  const pendingColor = "#BDBDBD";
  const activeColor = "#5F36B1";
  return (
    <Grid item xs {...(xs && { xs: xs })}>
      <Grid container mb={0.5}>
        <Grid item xs>
          <FlexBox sx={{ height: "100%" }}>
            <ColouredLine
              width={"100%"}
              height="2px"
              backgroundColor={activeStep >= step ? activeColor : pendingColor}
            />
          </FlexBox>
        </Grid>
        <Grid
          item
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <FlexBox
            sx={{
              width: "40px",
              height: "40px",
              m: 1,
              ml: 0.5,
              borderRadius: "50%",
              backgroundColor: activeStep >= step ? activeColor : pendingColor,
              color: "white",
              mx: 2,
            }}
          >
            {icon}
          </FlexBox>
        </Grid>

        <Grid item xs>
          <FlexBox sx={{ height: "100%" }}>
            <ColouredLine
              width={"100%"}
              height="2px"
              backgroundColor={activeStep > step ? activeColor : pendingColor}
            />
          </FlexBox>
        </Grid>
      </Grid>
      <Typography
        fontWeight={"bold"}
        fontSize="0.8rem"
        textAlign={"center"}
        sx={{
          lineHeight: "0.7rem",
          color: activeStep >= step ? activeColor : pendingColor,
        }}
      >
        {title}
      </Typography>
    </Grid>
  );
};

export default HeaderItem;
