import { post } from "./apiManager";

export const newRecipt = (body, onSuccess, onFailed, onComplete) => {
  post("/sales-receipt/newReceipt", body, onSuccess, onFailed, onComplete);
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
    onSuccess,
    onFailed,
    onComplete
  );
};
