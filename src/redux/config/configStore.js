// import { createStore } from "redux";
// import { combineReducers } from "redux";
import todos from "../modules/todos";
import { configureStore } from "@reduxjs/toolkit";

// 1. create rootReducer with reducers
// const rootReducer = combineReducers({
//   todos,
// });

// 2. create store
// const store = createStore(rootReducer);

// 1과 2를 합친 redux toolkit 방식
const store = configureStore({
	reducer: {
		todos,
	},
});

// 3. export
export default store;
