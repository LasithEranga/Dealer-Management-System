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
    <Box mt={1} >
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          New Stock
        </Typography>
      </Box>

      <ContentCard sx={{px:3, mr:1}}>
        <Grid container columnSpacing={4} rowSpacing={4} pt={0.5}>
          <Grid item xs={6}>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              Gas Tank Details
            </Typography>
            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>Gas Tank Name</Typography>
              <TextField size="small" fullWidth />
            </Box>
            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>Gas Tank Type</Typography>
              <TextField size="small" fullWidth />
            </Box>
            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>Quantity</Typography>
              <TextField size="small" fullWidth />
            </Box>
            <Box>
              <Typography sx={{ mb: 1, mt: 3 }}>Re-Order level</Typography>
              <TextField size="small" fullWidth />
            </Box>
          </Grid>

          <Grid item xs>
            <Typography sx={{ fontSize: "1rem", fontWeight: "bold" }}>
              Gas Stock Pricing
            </Typography>
            <Box>
              <Typography sx={{mb: 1, mt: 3 }}>
                Distributor - Ordered Price
              </Typography>
              <TextField size="small" fullWidth />
            </Box>
            <Box>
              <Typography sx={{mb: 1, mt: 3 }}>
                Distributor - Selling Price
              </Typography>
              <TextField size="small" fullWidth />
            </Box>

            <Box>
              <Typography sx={{mb: 1, mt: 3 }}>Dealer - Ordered Price</Typography>
              <TextField size="small" fullWidth />
            </Box>
            <Box>
              <Typography sx={{mb: 1, mt: 3 }}>Dealer - Selling Price</Typography>
              <TextField size="small" fullWidth />
            </Box>
          </Grid>
        </Grid>

        <Box pt={3}  display="flex" justifyContent={"end"} gap={3} >
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
