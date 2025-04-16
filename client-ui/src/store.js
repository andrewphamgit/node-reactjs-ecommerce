import {configureStore} from "@reduxjs/toolkit";
import RootReducer from "./slices/root-slices.js";

const saveMore = () => (next) => (action) => {
  switch (action.type) {
    default:
      break;
  }

  return next(action);
}

const rootReducer = (state, action) => {
  // reset all state when any other page
  return RootReducer(state, action);
}

const store = configureStore({
  reducer: rootReducer,
  devTools: "PROD" !== import.meta.env.VITE_NODE_ENV,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware({serializableCheck: true, actionCreatorCheck: true}).concat(saveMore)],
});

export default store;