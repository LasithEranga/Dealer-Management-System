import {
  Box,
  Button,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ContentCard from "../../components/ContentCard/ContentCard";

const Dealers = () => {
  return (
    <div>
      <Box
        display={"flex"}
        justifyContent="space-between"
        alignItems="center"
        my={1}
        mb={2}
      >
        <Typography fontSize="1.5rem" fontWeight="bold">
          Dealers
        </Typography>
        <Box>
          <Button>Download PDF</Button>
          <Button>Add Dealer</Button>
        </Box>
      </Box>
      <Box>
        <ContentCard>
          <Grid container rowSpacing={1} columnSpacing={1}>
            <Grid item xs={3}>
              <Box>
                <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
                  Search for dealer
                </Typography>
                <TextField fullWidth size="small" placeholder="Dealer name" />
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box>
                <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
                  Status
                </Typography>
                <FormControl fullWidth size="small">
                  <Select>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box>
                <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
                  Category
                </Typography>
                <FormControl fullWidth size="small">
                  <Select>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={3}>
              <Box>
                <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
                  Customer
                </Typography>
                <FormControl fullWidth size="small">
                  <Select>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Grid>
          </Grid>
        </ContentCard>
      </Box>
    </div>
  );
};

export default Dealers;
