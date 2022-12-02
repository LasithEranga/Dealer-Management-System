import {
  Box,
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";

const NewStock = () => {
  return (
    <Box mt={1}>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          New Stock
        </Typography>
      </Box>

      <ContentCard>
        <Grid container columnSpacing={4} rowSpacing={4}>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              Gas Tank Details
            </Typography>
            <Box>
              <Typography sx={{ my: 1 }}>Gas Tank Name</Typography>
              <TextField size="small" fullWidth />
            </Box>
            <Box>
              <Typography sx={{ my: 1 }}>Gas Tank Type</Typography>
              <TextField size="small" fullWidth />
            </Box>
            <Box>
              <Typography sx={{ my: 1 }}>Quantity</Typography>
              <TextField size="small" fullWidth />
            </Box>
            <Box>
              <Typography sx={{ my: 1 }}>Re-Order level</Typography>
              <TextField size="small" fullWidth />
            </Box>
          </Grid>

          <Grid item xs>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              Gas Stock Pricing
            </Typography>
            <Box>
              <Typography sx={{ my: 1 }}>
                Distributor - Ordered Price
              </Typography>
              <TextField size="small" fullWidth />
            </Box>
            <Box>
              <Typography sx={{ my: 1 }}>
                Distributor - Selling Price
              </Typography>
              <TextField size="small" fullWidth />
            </Box>

            <Box>
              <Typography sx={{ my: 1 }}>Dealer - Ordered Price</Typography>
              <TextField size="small" fullWidth />
            </Box>
            <Box>
              <Typography sx={{ my: 1 }}>Dealer - Selling Price</Typography>
              <TextField size="small" fullWidth />
            </Box>
          </Grid>
        </Grid>

        <Box mt={3} display="flex" justifyContent={"end"} gap={3} my={2}>
          <Button variant="outlined" sx={{ px: 5 }}>
            Clear
          </Button>
          <Button variant="contained" sx={{ px: 5 }}>
            Save
          </Button>
        </Box>
      </ContentCard>
    </Box>
  );
};

export default NewStock;
