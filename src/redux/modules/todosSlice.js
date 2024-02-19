import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import React from "react";
import { v4 as uuidv4 } from "uuid";

const initialState = {
	todos: [
		{
			id: uuidv4(),
			title: "리액트 공부하기",
			contents: "빨리빨리 암기하기",
			isDone: false,
		},
		{
			id: uuidv4(),
			title: "스프링 공부하기",
			contents: "인강 열심히 들어보기!!",
			isDone: true,
		},
		{
			id: uuidv4(),
			title: "데이트",
			contents: "홍대입구역에서 3시까지",
			isDone: false,
		},
	],
	isLoading: false,
	isError: false,
	error: null,
};

// Thunk
export const __getTodos = createAsyncThunk(
	// 두 개의 인자
	"getTodos", // 1. 문자열 이름
	async (payload, thunkAPI) => {
		// 2. 함수
		// thunk함수-서버랑 통신하기 때문에 반드시 비동기함수여야
		// 서버 통신 항상 성공 x -> try, catch로 묶어주기
		try {
			const response = await axios.get("http://localhost:4001/todos");
			console.log("response", response.data);

			// toolkit에서 제공하는 API
			// Promise -> resolve되니 경우(=네트워크 요청이 성공한 경우)에 dispatch해주는 기능 (이 기능이 끝나고나서 리듀서로 보내주는)을 가진 API
			// (dispatch란 리듀서에게 action / type,payload 전달하는 거)
			return thunkAPI.fulfillWithValue(response.data); // 의미있는 data 부분만 store로 넘겨주면됨 / response.data가 action.payload로 넘어가 // 꼭 리턴해주기 -> 그래야 extraReducer로넘어가
		} catch (error) {
			console.log("error", error);

			// toolkit에서 제공하는 API
			return thunkAPI.rejectWithValue(error); // 에러시 이 error객체가 action.payload로 넘어가 // 꼭 리턴해주기
		}
	}
);

// -> redux toolkit에서는 [slice] - action cretar, reducers 등 한번에 만들기 !! 아래에
const todosSlice = createSlice({
	name: "todos", // 이름 정해주기
	initialState, // 원래 initialState: initialState 인데 key-value같으니까 단축속성명
	reducers: {
		addTodo: (state, action) => {
			return [...state, action.payload];
		}, // 이 이름들로 action creator만들어져
		removeTodo: (state, action) => {
			return state.filter((item) => item.id !== action.payload);
		}, // 위에서 각각의 리듀서의 return문 다 {}안에 쓰고, ()인자는 action, state
		switchTodo: (state, action) => {
			return state.map((item) => {
				if (item.id === action.payload) {
					return { ...item, isDone: !item.isDone };
				} else {
					return item;
				}
			});
		},
	},
	extraReducers: {
		[__getTodos.pending]: (state, action) => {
			// 아직 진행 중일 때
			state.isLoading = true;
			state.isError = false; // 아직 에러인 지 모르는 상태니까
		},
		[__getTodos.fulfilled]: (state, action) => {
			// 이행된 경우
			console.log("fulfilled : ", action); // action객체 안에 type, payload 확인가능
			state.isLoading = false;
			state.isError = false;
			state = action.payload; // 서버부터 받은 값 넣어주기
		},
		[__getTodos.rejected]: (state, action) => {
			// 실패한 경우
			state.isLoading = false; // 실패한 경우도 isLoading상태는 아니니까
			state.isError = true;
			state.error = action.payload;
		},
	},
});

export const { addTodo, removeTodo, switchTodo } = todosSlice.actions;
export const {} = todosSlice.actions;
export default todosSlice.reducer;
