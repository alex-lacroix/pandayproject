import { createStore } from "redux";

const store = createStore(
  reducer,
  { loggedIn: false, results: [], username: "" },
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export default store;
