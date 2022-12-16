import {
  Box,
  Button,
  Chip,
  Divider,
  FormControl,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllOrders } from "../../app/api/purchaseOrderServices";
import ContentCard from "../../components/ContentCard/ContentCard";
import EnhancedTable from "../../components/EnhancedTable/EnhancedTable";
import { covertToRupees } from "../../utils/convertToRupees";

const ViewPurchaseOrders = () => {
  const { userId } = useSelector((state) => state.loginDMS);

  const [showEditModal, setShowEditModal] = useState(false);
  const [dealers, setDealers] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);
  const [update, setUpdate] = useState({
    isUpdating: true,
    _id: "",
  });

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("pleaseSelect");
  const [outstandingBalance, setOutstandingamount] = useState({
    min: "",
    max: "",
  });

  const headCells = [
    "Dealer",
    "Store Address",
    "Phone No",
    "Outstanding Amount",
    "Order Total",
    "State",
    "Actions",
  ];

  const createData = (
    name,
    outstandingAmount,
    phoneNumber,
    total,
    state,
    storeAddress,
    _id
  ) => {
    return {
      name,
      storeAddress,
      phoneNumber,
      outstandingAmount: covertToRupees(outstandingAmount),
      total: covertToRupees(total),
      state: (
        <>
          <Chip
            size="small"
            label={_.capitalize(state)}
            color="warning"
            sx={{ color: "white", fontWeight: "bold" }}
          />
        </>
      ),
    };
  };

  useEffect(() => {
    getAllOrders((response) => {
      console.log(response);

      setDealers(
        response.data.map((oneEl) =>
          createData(
            oneEl.dealer?.name,
            oneEl.dealer?.outstandingAmount,
            oneEl.dealer?.phoneNumber,
            oneEl.total,
            oneEl.state,
            oneEl.dealer?.storeAddress,
            oneEl._id
          )
        )
      );
    });
  }, [refreshTable]);

  return (
    <div>
      {/* --------------------------- table section ------------------------------- */}
      <Box>
        <ContentCard>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            my={1}
          >
            <Typography fontSize={"1.5rem"} fontWeight="bold">
              View Purchase Orders
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
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                  value={search}
                />
              </Grid>
              <Grid item xs></Grid>
              <Grid item xs={5} display="flex" gap={1}>
                <FormControl size="small" sx={{ flexGrow: 1 }}>
                  <Select
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                    defaultValue={""}
                    value="Date"
                  >
                    <MenuItem value={"Date"} disabled>
                      Date
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ flexGrow: 1 }}>
                  <Select
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                    defaultValue={""}
                    value="Status"
                  >
                    <MenuItem value={"Status"} disabled>
                      Status
                    </MenuItem>
                  </Select>
                </FormControl>
                <FormControl size="small" sx={{ flexGrow: 1 }}>
                  <Select
                    onChange={(e) => {
                      setSortBy(e.target.value);
                    }}
                    defaultValue={""}
                    value="ob"
                  >
                    <MenuItem value={"ob"} disabled>
                      Outstanding balance
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>
          <Divider orientation="horizontal" sx={{ my: 2 }} />

          <EnhancedTable
            headCells={headCells}
            data={dealers}
            amountIndex={3}
            enableAvatar={{
              isVisible: false,
            }}
            upto={6}
            actionButtons={[
              {
                name: "Accept",
                action: () => {},
              },
            ]}
          />
        </ContentCard>
      </Box>
      {/* --------------------------- table section ------------------------------- */}
    </div>
  );
};

export default ViewPurchaseOrders;
