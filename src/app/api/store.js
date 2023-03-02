import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import loginReducer from "../../reducers/loginSlice";
import alertReducer from "../../reducers/alertSlice";
import chartColorsReducer from "../../reducers/chartColorSlice";

function loadingReducer(state = {}, action) {
  if (action.type === "SET_LOADING_FOR") {
    state[action.payload.loadingAction] = 1;
  } else if (action.type === "CLEAR_LOADING_FOR") {
    state[action.payload.loadingAction] = undefined;
  }
  return state;
}

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["alertDMS", "loadingDMS"],
};
const rootReducer = combineReducers({
  loginDMS: loginReducer,
  alertDMS: alertReducer,
  chartColorsDMS: chartColorsReducer,
  loadingDMS: loadingReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
