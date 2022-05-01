import React, { useContext, useState } from "react";
import { BsCheck2Circle, BsCircle } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { baseURL } from "../utils/http-common";
import { TaskContext } from "../App";

const Task = (task) => {
	const [isEdit, setIsEdit] = useContext(TaskContext);
	const { _id: id, name, completed } = task.task;
	const [singleTask, setSingleTask] = useState({});

	const handleDelete = async (e) => {
		try {
			await fetch(baseURL + "/" + id, {
				method: "DELETE",
			})
				.then((res) => res.json())
				.then((data) => console.log(data));
		} catch (error) {
			console.log(error);
		}
	};
	const loadEdit = async (e) => {
		setIsEdit(!isEdit);
		try {
			fetch(baseURL + "/" + id)
				.then((res) => res.json())
				.then((data) => setSingleTask(data.task));
		} catch (error) {
			console.log(error);
		}
	};
	return (
		<>
			<div className=" bg-gray-600 my-5 w-2/3 mx-auto p-5 rounded-lg shadow-md shadow-gray-500/75 text-gray-100 flex items-center justify-between">
				<div className="flex items-center justify-center gap-4">
					<span>{completed ? <BsCheck2Circle /> : <BsCircle />}</span>
					<h2 className="text-2xl">{name}</h2>
				</div>
				<div className="flex items-center justify-center gap-5 text-2xl">
					<FiEdit className="text-yellow-400" onClick={loadEdit} />
					<RiDeleteBin6Line className="text-rose-600" onClick={handleDelete} />
				</div>
			</div>
			{isEdit && (
				<div className="absolute w-full h-full top-0 left-0 bg-slate-500/75">
					<h2>Edit screen</h2>
					<form action="" method="PATCH">
						<input type="text" name="name" id="name" value={singleTask.name} />
					</form>
					<button onClick={() => setIsEdit(false)}>close</button>
				</div>
			)}
		</>
	);
};

export default Task;
