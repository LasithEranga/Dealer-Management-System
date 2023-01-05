import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import loginReducer from "../../reducers/loginSlice";
import alertReducer from "../../reducers/alertSlice";
import chartColorsReducer from "../../reducers/chartColorSlice";

const persistConfig = {
  key: "root",
  storage,
  blacklist: ["alertDMS"],
};
const rootReducer = combineReducers({
  loginDMS: loginReducer,
  alertDMS: alertReducer,
  chartColorsDMS: chartColorsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export const persistor = persistStore(store);
