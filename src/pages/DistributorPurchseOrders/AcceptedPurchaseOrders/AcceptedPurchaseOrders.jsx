import { Box, Button, Chip, Divider, Typography } from "@mui/material";
import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getOrderByStateAndDistributor,
  rejectOrder,
} from "../../../app/api/purchaseOrderServices";
import ContentCard from "../../../components/ContentCard/ContentCard";
import ExpandableTable from "../../../components/ExpandableTable/ExpandableTable";
import { convertToRupees } from "../../../utils/convertToRupees";

import { Undo } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { showSystemAlert } from "../../../app/alertServices";
import PurchseOrderFiltering from "../../../components/PurchseOrderFiltering/PurchseOrderFiltering";

const AcceptedPurchaseOrdersDistributor = () => {
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.loginDMS);

  const [orders, setOrders] = useState([]);
  const [refreshTable, setRefreshTable] = useState(false);

  const [filteredOrders, setFilteredOrders] = useState([]);

  const actionButtons = [
    {
      tooltip: "Uodo",
      icon: <Undo />,
      onClick: (order) => {
        rejectOrder(
          {
            purchaseOrderId: order._id,
          },
          (response) => {
            if (response.status === 0) {
              setRefreshTable(!refreshTable);
              showSystemAlert(response.message, "success");
            } else {
              showSystemAlert(response.message, "error");
            }
          }
        );
      },
    },
  ];

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
    getOrderByStateAndDistributor(
      { distributor: userId, state: "ACCEPTED" },
      (response) => {
        console.log(response);

        setOrders(response.data);
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
              Accepted Purchase Orders
            </Typography>
            <Box>
              <Button variant="outlined">Export to PDF</Button>
            </Box>
          </Box>
          <Divider orientation="horizontal" sx={{ my: 2 }} />
          <PurchseOrderFiltering
            setFilteredOrders={setFilteredOrders}
            orders={orders}
          />
          <Divider orientation="horizontal" sx={{ my: 2 }} />

          <ExpandableTable
            headCells={headCells}
            data={filteredOrders}
            ignoreTill={1}
            actionButtons={actionButtons}
            showOutstandingAfterAccept={false}
          />
        </ContentCard>
      </Box>
      {/* --------------------------- table section ------------------------------- */}
    </div>
  );
};

export default AcceptedPurchaseOrdersDistributor;
