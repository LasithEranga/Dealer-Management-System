import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import ContentCard from "../components/ContentCard/ContentCard";
import ExpandableTable from "../components/ExpandableTable/ExpandableTable";

const Test = () => {
  return (
    <Box>
      <ContentCard>
        <Box
          display={"flex"}
          justifyContent="space-between"
          alignItems={"center"}
          my={1}
        >
          <Typography fontSize={"1.5rem"} fontWeight="bold">
            Saved Purchase Orders
          </Typography>
          <Box>
            <Button variant="outlined">Export to PDF</Button>
          </Box>
        </Box>
        <Divider orientation="horizontal" sx={{ my: 2 }} />
        <Box>
          <Grid container>
            <Grid item xs={4}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by Dealer name"
              />
            </Grid>
            <Grid item xs></Grid>
            <Grid item xs={5} display="flex" gap={1}>
              <FormControl size="small" sx={{ flexGrow: 1 }}>
                <Select defaultValue={""} value="Date">
                  <MenuItem value={"Date"} disabled>
                    Date
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ flexGrow: 1 }}>
                <Select defaultValue={""} value="Status">
                  <MenuItem value={"Status"} disabled>
                    Status
                  </MenuItem>
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ flexGrow: 1 }}>
                <Select defaultValue={""} value="ob">
                  <MenuItem value={"ob"} disabled>
                    Outstanding balance
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        <Divider orientation="horizontal" sx={{ my: 2 }} />

        <ExpandableTable />
      </ContentCard>
    </Box>
  );
};

export default Test;
