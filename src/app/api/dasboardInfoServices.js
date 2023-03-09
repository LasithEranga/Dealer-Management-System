import { post } from "./apiManager";

export const dashboardSalesInfo = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/sales-receipt/dashboardInfo",
    body,
    "dashboardSalesInfoLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const dashboardChart = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/sales-receipt/dashboardChart",
    body,
    "dashboardChartLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
