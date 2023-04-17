import { post } from "./apiManager";

export const getStockByUser = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/stocks/getStocksByUser",
    body,
    "getStockByUserLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
export const updateStock = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/stocks/updateStock",
    body,
    "updateStockLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const updateReOrderLevel = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/stocks/updateReOrderLevel",
    body,
    "updateReOrderLevelLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getStocksByUserAndType = (
  body,
  onSuccess,
  onFailed,
  onComplete
) => {
  post(
    "/stocks/getStocksByUserAndType",
    body,
    "getStocksByUserAndTypeLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const searchGasStock = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/stocks/search",
    body,
    "searchGasStockLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getStockSummery = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/stocks/stockSummery",
    body,
    "getStockSummeryLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getChartData = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/stocks/stockChartData",
    body,
    "getChartDataLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
export const newStock = (body, onSuccess, onFailed, onComplete) => {
  post("/stocks/new", body, "newStockLoading", onSuccess, onFailed, onComplete);
};
export const newStockDealer = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/stocks/newStockDealer",
    body,
    "newStockDealerLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getReOrderLevel = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/stocks/getReOrderLevel",
    body,
    "getReOrderLevelLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const stockInfoChartData = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/stocks/stockInfoChartData",
    body,
    "stockInfoChartDataLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getDealerStockSummery = (
  body,
  onSuccess,
  onFailed,
  onComplete
) => {
  post(
    "/stocks/getDealerStockSummery",
    body,
    "getDealerStockSummeryLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
