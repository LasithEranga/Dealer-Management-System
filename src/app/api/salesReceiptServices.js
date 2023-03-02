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
