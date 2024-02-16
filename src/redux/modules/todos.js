import { createSlice } from "@reduxjs/toolkit";
import React from "react";
import { v4 as uuidv4 } from "uuid";

// action items
// const ADD_TODO = "ADD_TODO";
// const REMOVE_TODO = "REMOVE_TODO";
// const SWITCH_TODO = "SWITCH_TODO";

/**
 * 메서드 개요 : todo 객체를 입력받아, 기존 todolist에 더함
 * 2022.12.16 : 최초작성
 *
 * @param {todo 객체} payload
 * @returns
 */
// export const addTodo = (payload) => {
// 	// action creator 들을 내보냈었음 (아래 remove, switch 등도)
// 	return {
// 		type: ADD_TODO, // type과 payload를 가진 action객체를 만들었었다
// 		payload,
// 	};
// };

/**
 * 메서드 개요 : todo의 id를 입력받아, 일치하는 todolist를 삭제
 * 2022.12.16 : 최초작성
 *
 * @param {todo의 id} payload
 * @returns
 */
// export const removeTodo = (payload) => {
// 	return {
// 		type: REMOVE_TODO,
// 		payload,
// 	};
// };

/**
 * 메서드 개요 : todo의 id를 입력받아, 일치하는 todo 아이템의 isDone을 반대로 변경
 * 2022.12.16 : 최초작성
 *
 * @param {*} payload
 * @returns
 */
// export const switchTodo = (payload) => {
// 	return {
// 		type: SWITCH_TODO,
// 		payload,
// 	};
// };

// initial states
const initialState = [
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
];

// reducers
// const todos = (state = initialState, action) => {
// 	switch (action.type) {
// 		case ADD_TODO: // 기존의 배열에 입력받은 객체를 더함
// 			return [...state, action.payload];
// 		case REMOVE_TODO: // 기존의 배열에서 입력받은 id의 객체를 제거(filter)
// 			return state.filter((item) => item.id !== action.payload);
// 		case SWITCH_TODO: // 기존의 배열에서 입력받은 id에 해당하는 것만 isDone을 반대로 변경(아니면 그대로 반환)
// 			return state.map((item) => {
// 				if (item.id === action.payload) {
// 					return { ...item, isDone: !item.isDone };
// 				} else {
// 					return item;
// 				}
// 			});
// 		default:
// 			return state;
// 	}
// };

// export
// export default todos;

// 기존 redux
// 1. export action creator
// 2. export reducer
// 3. action value (를 정의)

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
});

// action creator로서 내보낼 수 있다
export const { addTodo, removeTodo, switchTodo } = todosSlice.actions;
// reducer도 내보내기
export default todosSlice.reducer;
