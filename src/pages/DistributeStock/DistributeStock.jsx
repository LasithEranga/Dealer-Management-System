import { Search } from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import FlexDivider from "../../components/FlexDivider/FlexDivider";
import IconWithText from "../../components/IconWithText/IconWithText";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
const DistributeStock = () => {
  return (
    <Box mt={2}>
      <Grid container columnSpacing={2}>
        <FlexDivider />
        <Grid item>
          <IconWithText
            icon={<PersonSearchIcon sx={{ fontSize: "2rem" }} />}
            title={"Search Dealer"}
          />
        </Grid>
        <FlexDivider />
        <Grid item>
          <IconWithText
            icon={<StackedBarChartOutlinedIcon sx={{ fontSize: "2rem" }} />}
            title={"Stock Details"}
          />
        </Grid>
        <FlexDivider />
        <IconWithText
          icon={<LocalShippingIcon sx={{ fontSize: "2rem" }} />}
          title={"Allocate Stock"}
        />
        <FlexDivider />
      </Grid>
    </Box>
  );
};

export default DistributeStock;
