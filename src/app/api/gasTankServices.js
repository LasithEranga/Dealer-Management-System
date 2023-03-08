import { post } from "./apiManager";

export const newTank = (body, onSuccess, onFailed, onComplete) => {
  post("/tanks/new", body, "newTankLoading", onSuccess, onFailed, onComplete);
};

export const searchGasTank = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/tanks/search",
    body,
    "searchGasTankLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getTankNames = (onSuccess, onFailed, onComplete) => {
  post(
    "/tanks/getNames",
    {},
    "tankNamesLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getTankTypes = (onSuccess, onFailed, onComplete) => {
  post(
    "/tanks/getTypes",
    {},
    "tankTypesLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const updateTank = (body, onSuccess, onFailed, onComplete) => {
  post(
    "/tanks/update",
    body,
    "updateTankLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};

export const getAllTanks = (onSuccess, onFailed, onComplete) => {
  post(
    "/tanks/getAll",
    {},
    "getAllTanksLoading",
    onSuccess,
    onFailed,
    onComplete
  );
};
