import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import DealerDetails from "./DealerDetails";
import StockDetails from "./StockDetails";
const DistributeStock = () => {
  return (
    <Box mt={2}>
      <ContentCard>
        <Typography fontSize={"1.5rem"} lineHeight="1.5rem" fontWeight={"bold"}>
          Distribute Stock
        </Typography>
      </ContentCard>

      <Grid container mt={2} columnSpacing={2}>
        <Grid item xs={5}>
          <ContentCard>
            <Typography fontWeight={"bold"} fontSize="1.5rem">
              Search Dealer
            </Typography>
            <Box sx={{ mr: 2, my: 1 }}>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                placeholder="Search dealer"
                sx={{ mt: 1 }}
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
                  LE
                </Typography>
              </Box>
            </Box>

            <DealerDetails title={"Name:"} content={"Lasith Eranda "} />
            <DealerDetails title={"Store:"} content={"Lasith's Store "} />
            <DealerDetails title={"Outstanding:"} content={"Rs: 38467.89 "} />
            <DealerDetails
              title={"Address:"}
              content={"200D, Thibbotugoda, Pokunuwita "}
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
            <StockDetails title={"Tank Type"} placeholder={"Search dealer"} />
            <StockDetails
              title={"Available Qty @ In-House"}
              placeholder={"568"}
            />
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
