import { post } from "./apiManager";

export const newOrder = (body, onSuccess, onFailed, onComplete) => {
  post("/purchase-orders/newOrder", body, onSuccess, onFailed, onComplete);
};
