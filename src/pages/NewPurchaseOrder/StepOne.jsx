import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";
import OrderSummeryTable from "../../components/OrderSummeryTable/OrderSummeryTable";
import TitleAndContent from "../../components/TitleAndContent/TitleAndContent";

const StepOne = () => {
  return (
    <Box>
      <Grid container mt={2} gap={2}>
        <OrderSummeryTable height="16rem" title="Purchase Order" />
        <ContentCard sx={{ pl: 3 }}>
          <Typography fontSize={"1.3rem"} fontWeight="bold">
            Tank Details
          </Typography>
          <Box
            sx={{
              height: "15.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Box my={2}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search Gas tank name"
              />
            </Box>
            <Box>
              <TitleAndContent
                title={"Tank Name:"}
                titleSx={{ color: "black" }}
                content="5KG Refilled"
                sx={{ mr: 2, gap: 4.5, pt: 2 }}
              />
            </Box>
            <Box>
              <TitleAndContent
                title={"Selling Price:"}
                titleSx={{ color: "black" }}
                content="Rs. 5000.00"
                sx={{ mr: 2, gap: 3, pt: 2 }}
              />
            </Box>
            <Box>
              <TitleAndContent
                title={"Quantity"}
                titleSx={{ color: "black" }}
                content={<input type={"text"} />}
                sx={{ mr: 2, gap: 7, pt: 2 }}
              />
            </Box>
            <Box
              flexGrow={1}
              display="flex"
              justifyContent={"start"}
              alignItems="end"
              gap={2}
            >
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 0 }}
              >
                Add
              </Button>
            </Box>
          </Box>
          <Box>
            <TitleAndContent
              title={"Outstanding Balance"}
              titleSx={{ color: "black" }}
              content="Rs. 5000.00"
              sx={{ mr: 2, gap: 3, pt: 2 }}
            />
            <Box
              flexGrow={1}
              display="flex"
              justifyContent={"start"}
              alignItems="end"
              gap={2}
              mt={2}
            >
              <Button
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 0, flexGrow: 1 }}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                sx={{ borderRadius: 0, flexGrow: 1 }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </ContentCard>
      </Grid>
    </Box>
  );
};

export default StepOne;
