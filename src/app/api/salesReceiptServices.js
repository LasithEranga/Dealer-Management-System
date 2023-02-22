import { post } from "./apiManager";

export const newRecipt = (body, onSuccess, onFailed, onComplete) => {
  post("/sales-receipt/newReceipt", body, onSuccess, onFailed, onComplete);
};

export const salesReport = (body, onSuccess, onFailed, onComplete) => {
  post("/sales-receipt/salesReport", body, onSuccess, onFailed, onComplete);
};
