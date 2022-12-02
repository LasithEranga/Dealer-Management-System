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
import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";

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
                  Sort By
                </Typography>
                <FormControl fullWidth size="small">
                  <Select>
                    {/* <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem> */}
                  </Select>
                </FormControl>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Box>
                <Typography fontWeight={"bold"} sx={{ mb: 1 }}>
                  Outstanding Balance
                </Typography>
                <Box display={"flex"} gtap={2}>
                  <FormControl fullWidth size="small">
                    <TextField size="small" placeholder="min: Rs:2000.00" />
                  </FormControl>
                  <Box mx={2}>
                    <Typography fontSize="1.5rem" fontWeight={"bold"}>
                      {" "}
                      -{" "}
                    </Typography>
                  </Box>
                  <FormControl fullWidth size="small">
                    <TextField size="small" placeholder="Max: Rs:50000.00" />
                  </FormControl>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </ContentCard>
      </Box>

      {/* --------------------------- table section ------------------------------- */}
      <Box mt={2}>
        <ContentCard>
          <EnhancedTable />
        </ContentCard>
      </Box>
      {/* --------------------------- table section ------------------------------- */}
    </div>
  );
};

export default Dealers;
