import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";

const NewGasTank = () => {
  return (
    <Box mt={1} p={1}>
      <ContentCard>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography fontSize="1.5rem" fontWeight="bold">
            New Gas Tank
          </Typography>
        </Box>
        <Typography sx={{ mt: 2, fontSize: "1rem", fontWeight: "bold" }}>
          Gas Tank Details
        </Typography>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Gas Tank Name</Typography>
              <TextField size="small" fullWidth />
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Tank Type</Typography>
              <TextField size="small" fullWidth />
            </Box>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 2, fontSize: "1rem", fontWeight: "bold" }}>
          Distributor Pricing
        </Typography>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Ordered Price</Typography>
              <TextField size="small" fullWidth />
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Selling Price</Typography>
              <TextField size="small" fullWidth />
            </Box>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 2, fontSize: "1rem", fontWeight: "bold" }}>
          Dealer Pricing
        </Typography>
        <Grid container columnSpacing={2} rowSpacing={2}>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Ordered Price</Typography>
              <TextField size="small" fullWidth />
            </Box>
          </Grid>
          <Grid item xs>
            <Box>
              <Typography sx={{ my: 1 }}>Selling Price</Typography>
              <TextField size="small" fullWidth />
            </Box>
          </Grid>
        </Grid>
        <Box mt={3} display="flex" justifyContent={"end"} gap={3} my={4}>
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

export default NewGasTank;
