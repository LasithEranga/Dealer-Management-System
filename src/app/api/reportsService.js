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
