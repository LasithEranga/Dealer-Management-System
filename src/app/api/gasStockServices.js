import { post } from "./apiManager";

export const getStockByUser = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/getStocksByUser", body, onSuccess, onFailed, onComplete);
};
export const searchGasStock = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/search", body, onSuccess, onFailed, onComplete);
};

export const getStockSummery = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/stockSummery", body, onSuccess, onFailed, onComplete);
};

export const getChartData = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/stockChartData", body, onSuccess, onFailed, onComplete);
};
export const newStock = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/new", body, onSuccess, onFailed, onComplete);
};
export const getReOrderLevel = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/getReOrderLevel", body, onSuccess, onFailed, onComplete);
};

export const getDealerStockSummery = (
  body,
  onSuccess,
  onFailed,
  onComplete
) => {
  post("/stocks/getDealerStockSummery", body, onSuccess, onFailed, onComplete);
};
