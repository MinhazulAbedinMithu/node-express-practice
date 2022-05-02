import React, { useEffect, useState } from "react";
import { BsCheck2Circle, BsCircle } from "react-icons/bs";
import { RiDeleteBin6Line, RiCloseFill } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { baseURL } from "./utils/http-common";

const App = () => {
	const [tasks, setTasks] = useState([]);
	const [isEdit, setIsEdit] = useState(false);
	const [taskName, setTaskName] = useState("");
	const [singleTask, setSingleTask] = useState({});

	const handleChange = (e) => {
		const value = e.target.value;
		setTaskName(value);
	};
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
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

	//Delete Func:::
	const handleDelete = async (id) => {
		try {
			await fetch(baseURL + "/" + id, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => console.log(data));
			setTasks(tasks.filter((task) => task._id !== id));
		} catch (error) {
			console.log(error);
		}
	};

	//Single Task for Edit :::
	const editableSingle = async (id) => {
		try {
			await fetch(baseURL + "/" + id)
				.then((res) => res.json())
				.then((data) => setSingleTask(data.task));
		} catch (error) {
			console.log(error);
		}
		setIsEdit(!isEdit);
	};
	//handle onChange task :::
	const handleEditOnchange = (e) => {
		// setSingleTask(([e.target.name] = e.target.value));
		const [name, value] = [
			e.target.name,
			e.target.name === "completed" ? e.target.checked : e.target.value,
		];
		const tempTask = { ...singleTask };
		tempTask[name] = value;
		setSingleTask(tempTask);
		// console.log(e.target.value);
	};

	const handleUpdate = async (e) => {
		e.preventDefault();
		try {
			await fetch(baseURL + "/" + singleTask._id, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(singleTask),
			})
				.then((res) => res.json())
				.then((data) => console.log(data.task));

			window.location.reload();
		} catch (error) {
			console.log(error);
		}
	};

	const getTasks = async () => {
		try {
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

	return (
		<div className="w-full min-h-screen py-10 bg-gradient-to-br from-indigo-900 via-cyan-900 to-rose-900">
			<div className="container mx-auto">
				<h1 className="text-5xl font-bold text-center text-yellow-500">
					Task Manager
				</h1>
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
				<div>
					{tasks.map((task) => (
						<div
							key={task._id}
							className=" bg-gray-600 my-5 w-2/3 mx-auto p-5 rounded-lg shadow-md shadow-gray-500/75 text-gray-100 flex items-center justify-between"
						>
							<div className="flex items-center justify-center gap-4">
								<span>
									{task.completed ? <BsCheck2Circle /> : <BsCircle />}
								</span>
								<h2 className="text-2xl">{task.name}</h2>
							</div>
							<div className="flex items-center justify-center gap-5 text-2xl">
								<FiEdit
									className="text-yellow-400"
									onClick={() => editableSingle(task._id)}
								/>
								<RiDeleteBin6Line
									className="text-rose-600 cursor-pointer"
									onClick={() => handleDelete(task._id)}
								/>
							</div>
						</div>
					))}
				</div>
			</div>
			{isEdit && (
				<div className="absolute w-full h-full top-0 left-0 bg-slate-600/ py-32">
					<div className="w-2/3 relative bg-purple-900 mx-auto rounded-md text-white p-5 px-10">
						<h2 className="text-center text-2xl font-bold">Update Task</h2>
						<form
							action=""
							method="PATCH"
							className="py-10 flex flex-col justify-center items-start gap-3"
						>
							<div className="flex items-center justify-center gap-3">
								<label htmlFor="name" className="text-xl font-bold">
									Task Name
								</label>
								<input
									type="text"
									name="name"
									id="name"
									className="py-1 px-4 rounded-lg text-gray-700 text-xl"
									value={singleTask.name}
									onChange={handleEditOnchange}
								/>
							</div>
							<div className="flex items-center justify-center gap-3">
								<label htmlFor="completed" className="text-xl font-bold">
									Completed
								</label>
								<input
									type="checkbox"
									name="completed"
									defaultChecked={singleTask.completed}
									onChange={handleEditOnchange}
								/>
							</div>
							<button type="submit" onClick={handleUpdate}>
								Update
							</button>
						</form>
						<button
							onClick={() => setIsEdit(false)}
							className="absolute top-2 right-2 text-4xl bg-black p-2 rounded-full font-bold text-rose-600"
						>
							<RiCloseFill />
						</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default App;
