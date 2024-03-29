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
import { getAllOrdersByStateAndDealer } from "../../../app/api/purchaseOrderServices";
import ContentCard from "../../../components/ContentCard/ContentCard";
import ExpandableTable from "../../../components/ExpandableTable/ExpandableTable";
import { convertToRupees } from "../../../utils/convertToRupees";
import SwipeRightIcon from "@mui/icons-material/SwipeRight";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useNavigate } from "react-router-dom";

const DeclinedPurchaseOrders = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.loginDMS);

  const [showEditModal, setShowEditModal] = useState(false);
  const [orders, setOrders] = useState([]);
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

  const actionButtons = [];

  const headCells = [
    "Dealer",
    "Date",
    "Store Address",
    "Phone No",
    <Box display={"flex"} justifyContent={"center"} ml={2}>
      Outstanding
    </Box>,
    <Box display={"flex"} justifyContent={"center"} ml={2}>
      State
    </Box>,
    <Box display={"flex"} justifyContent={"center"} ml={2}>
      Actions
    </Box>,
  ];

  const createData = (
    order,
    name,
    date,
    storeAddress,
    phoneNumber,
    outstandingBalance,
    state
  ) => {
    return {
      order,
      name,
      date,
      storeAddress,
      phoneNumber,
      total: (
        <Box display={"flex"} justifyContent={"center"}>
          {convertToRupees(outstandingBalance)}
        </Box>
      ),

      state: (
        <>
          <Box display={"flex"} justifyContent={"center"}>
            <Chip
              size="small"
              label={_.capitalize(state)}
              color="warning"
              sx={{ color: "white", fontWeight: "bold" }}
            />
          </Box>
        </>
      ),
    };
  };

  useEffect(() => {
    getAllOrdersByStateAndDealer(
      { dealer: userId, state: "REJECTED" },
      (response) => {
        console.log(response);

        setOrders(
          response.data.map((oneEl) =>
            createData(
              oneEl,
              oneEl.dealer?.name,
              new Date(oneEl.createdAt).toLocaleDateString(),
              oneEl.dealer?.storeAddress,
              oneEl.dealer?.phoneNumber,
              oneEl.dealer?.outstandingAmount,
              oneEl.state
            )
          )
        );
      }
    );
  }, [refreshTable]);

  return (
    <div>
      {/* --------------------------- table section ------------------------------- */}
      <Box mt={2}>
        <ContentCard>
          <Box
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            my={1}
          >
            <Typography fontSize={"1.5rem"} fontWeight="bold">
              Declined Purchase Orders
            </Typography>
            <Box>
              <Button variant="outlined">Export to PDF</Button>
            </Box>
          </Box>
          <Divider orientation="horizontal" sx={{ my: 2 }} />

          <ExpandableTable
            headCells={headCells}
            data={orders}
            ignoreTill={1}
            actionButtons={actionButtons}
            dealerView={true}
            showOutstandingAfterAccept={false}
          />
        </ContentCard>
      </Box>
      {/* --------------------------- table section ------------------------------- */}
    </div>
  );
};

export default DeclinedPurchaseOrders;
