import { post } from "./apiManager";

export const newRecipt = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/sales-receipt/newReceipt",
    body,
    "newReceiptLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const newDistributorReturnRecipt = (
  body,
  onSuccess,
  onFailed,
  onComplete
) => {
  post(
    "/distributor-return/newDistributorReturnRecipt",
    body,
    "newDistributorReturnReciptLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const searchSalesReceiptsByRef = (
  body,
  onSuccess,
  onFailed,
  onComplete
) => {
  post(
    "/sales-receipt/searchSalesReceiptsByRef",
    body,
    "searchSalesReceiptsByRefLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const dealerSalesChartData = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/sales-receipt/dealerSalesChart",
    body,
    "dealerSalesChartDataLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const dealerSalesByGasTankName = (
  body,
  onSuccess,
  onFailed,
  onComplete
) => {
  post(
    "/sales-receipt/dealerSalesByGasTankName",
    body,
    "dealerSalesChartDataLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const dealerSalesSummery = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/sales-receipt/dealerSalesSummery",
    body,
    "dealerSalesSummeryLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
