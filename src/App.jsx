import React, { useEffect } from "react";
import Router from "./shared/Router";
import { useDispatch, useSelector } from "react-redux";
import { __getTodos } from "./redux/modules/todosSlice";

const App = () => {
	const dispatch = useDispatch();
	const { isLoading, error, todos } = useSelector((state) => state.todos);

	useEffect(() => {
		dispatch(__getTodos()); // axios get하는데 payload 사용 x라서 인자 필요 x
	}, []);

	if (isLoading) {
		return <div>로딩 중 ...</div>;
	}

	if (error) {
		return <div>{error.message}</div>;
	}

	// 위 경우 (로딩, 에러)가 아닌 경우 아래 리턴 / 그래서 undefined,null 등 오류도 안나도록 , optional chaining도필요 x도록
	return (
		<div>
			{todos.map((todo) => (
				<div key={todo.id}>{todo.title}</div>
			))}
		</div>
	);

	// return <Router />;
};

export default App;
