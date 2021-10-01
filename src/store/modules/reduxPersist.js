import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

// eslint-disable-next-line import/no-anonymous-default-export
export default reducers => {
  const persistReducers = persistReducer({
<<<<<<< HEAD
    key: "CONSUMO-API",
=======
    key: "REACT-BASE",
>>>>>>> 84e2ab3a1a0107aef9211f9a78bf89d346e4ecff
    storage,
    whilelist: ["auth"],
  },
    reducers
  );

  return persistReducers;
};
