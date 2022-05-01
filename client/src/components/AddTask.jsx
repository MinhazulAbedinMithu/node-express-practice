// import React, { useContext, useState } from "react";
// import { TaskContext } from "../App";
// import { baseURL } from "../utils/http-common";

import { useContext, useState } from "react";
import { TaskContext } from "../App";
import { baseURL } from "../utils/http-common";

const AddTask = () => {
	const [taskName, setTaskName] = useState("");
	const [tasks, setTasks] = useContext(TaskContext);

	const handleChange = (e) => {
		const value = e.target.value;
		setTaskName(value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			// const response = await axios.post(baseURL);
			// console.log(response);
			// console.log("task", taskName);

			await fetch(baseURL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: taskName }),
			})
				.then((res) => res.json())
				.then((data) => setTasks([...tasks, data.newTask]));

			setTaskName("");
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="w-2/3 flex items-center justify-center mx-auto py-16 bg-green-700/25 rounded-xl my-10">
			<form
			action=""
			method="post"
			className="flex flex-col items-center justify-center gap-3"
		>
			<input
				type="text"
				name="name"
				id="name"
				placeholder="Task Name"
				className="py-2 px-5 text-xl rounded-md"
				onChange={handleChange}
				value={taskName}
			/>
			<span className="text-md font-thin text-green-500"></span>
			<button
				onClick={handleSubmit}
				className="font-bold text-xl bg-yellow-500 text-indigo-700 px-5 py-2 rounded-md"
			>
				Add Task
			</button>
		</form>
		</div>
	);
};

export default AddTask;
