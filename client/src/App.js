import React, { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Task from "./components/Task";
import { baseURL } from "./utils/http-common";

const App = () => {
	const [tasks, setTasks] = useState([]);

	const getTasks = async () => {
		try {
			// const response = await axios.get(baseURL);
			// setTasks(response.tasks);
			await fetch(baseURL)
				.then((res) => res.json())
				.then((data) => setTasks(data.tasks));
		} catch (error) {
			console.log(error);
		}
	};
	useEffect(() => {
		getTasks();
	}, []);

	console.log(tasks);

	return (
		<div className="w-full min-h-screen py-10 bg-gradient-to-br from-indigo-900 via-cyan-900 to-rose-900">
			<div className="container mx-auto">
				<h1 className="text-5xl font-bold text-center text-yellow-500">
					Task Manager
				</h1>
				<AddTask />
				<div>
					{tasks.map((task) => (
						<Task task={task} />
					))}
				</div>
			</div>
		</div>
	);
};

export default App;
