import { post } from "./apiManager";

export const salesReport = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/reports/sales",
    body,
    "salesReportLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const receivables = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/reports/receivables",
    body,
    "receivablesReportLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const returns = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/reports/returns",
    body,
    "returnsReportLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const stockReport = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/reports/stocks",
    body,
    "stockReportLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const dealerStockReport = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/reports/dealer-stocks",
    body,
    "dealerStockReportLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
