import { post } from "./apiManager";

export const newReturnRecipt = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/return-receipt/newReturnReceipt",
    body,
    "newReturnReceiptLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
