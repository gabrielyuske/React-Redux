import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// eslint-disable-next-line import/no-anonymous-default-export
export default reducers => {
  const persistReducers = persistReducers({
    key: "REACT-BASE",
    storage,
    whilelist: ["example"],
  },
    reducers
  );

  return persistReducer;
}
