import { post } from "./apiManager";

export const newOrder = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/purchase-orders/newOrder",
    body,
    "newOrderLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
export const acceptOrder = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/purchase-orders/accept",
    body,
    "acceptOrderLoading",

    onSuccess,
    onFailed,
    onComplete
  );
};

export const saveOrder = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/purchase-orders/save",
    body,
    "saveOrderLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
export const purchaseOrderMarkAsPaid = (
  body,
  onSuccess,
  onFailed,
  onComplete
) => {
  post(
    "/purchase-orders/confirmPayment",
    body,
    "markingAsPaid",
    onSuccess,
    onFailed,
    onComplete
  );
};
export const rejectOrder = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/purchase-orders/reject",
    body,
    "rejectOrderLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
export const getAllOrders = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/purchase-orders/getAll",
    body,
    "getAllOrdersLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getOrderByStateAndDistributor = (
  body,
  onSuccess,
  onFailed,
  onComplete
) => {
  post(
    "/purchase-orders/getOrderByStateAndDistributor",
    body,
    "getOrderByStateAndDistributorLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getAllOrdersByStateAndDealer = (
  body,
  onSuccess,
  onFailed,
  onComplete
) => {
  post(
    "/purchase-orders/getAllOrdersByStateAndDealer",
    body,
    "getAllOrdersByStateAndDealerLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
