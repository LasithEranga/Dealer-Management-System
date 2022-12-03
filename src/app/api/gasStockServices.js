import { post } from "./apiManager";

const getAllStocks = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/getAll", body, onSuccess, onFailed, onComplete);
};
const getStockByUser = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/new", body, onSuccess, onFailed, onComplete);
};
const newStock = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/new", body, onSuccess, onFailed, onComplete);
};
