import { Search } from "@mui/icons-material";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React from "react";
import FlexDivider from "../../components/FlexDivider/FlexDivider";
import IconWithText from "../../components/IconWithText/IconWithText";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import StackedBarChartOutlinedIcon from "@mui/icons-material/StackedBarChartOutlined";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import Step01 from "./Step01";
import ContentCard from "../../components/ContentCard/ContentCard";
import Titlebar from "../../components/Titlebar/Titlebar";
import Step02 from "./Step02";
const DistributeStock = () => {
  return (
    <Box mt={2}>
      <ContentCard>
        <Titlebar title={"Distribute Stock"} />
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

        <Box mb={1}>
          <Box
            sx={{
              height: "63vh",
              border: "1px solid #9f86d0",
              borderRadius: 3,
            }}
            mt={2}
            display="flex"
            flexDirection={"column"}
          >
            {/* <Step01 /> */}
            <Step02 />

            <Box
              display={"flex"}
              justifyContent="space-between"
              flexGrow={1}
              mx={3}
            >
              <Typography>btn back</Typography>
              <Typography>btn fwd</Typography>
            </Box>
          </Box>
        </Box>
      </ContentCard>
    </Box>
  );
};

export default DistributeStock;
