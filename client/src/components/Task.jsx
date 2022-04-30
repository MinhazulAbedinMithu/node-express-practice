import React from "react";
import { BsCheck2Circle, BsCircle } from "react-icons/bs";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
import { baseURL } from "../utils/http-common";

const Task = (task) => {
	const { _id: id, name, completed } = task.task;
	console.log(id, name, completed);

	const handleDelete = async () => {
		console.log("clicked", id);
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
	return (
		<div className=" bg-gray-600 my-5 w-2/3 mx-auto p-5 rounded-lg shadow-md shadow-gray-500/75 text-gray-100 flex items-center justify-between">
			<div className="flex items-center justify-center gap-4">
				<span>{completed ? <BsCheck2Circle /> : <BsCircle />}</span>
				<h2 className="text-2xl">{name}</h2>
			</div>
			<div className="flex items-center justify-center gap-5 text-2xl">
				<FiEdit className="text-yellow-400" />
				<RiDeleteBin6Line className="text-rose-600" onClick={handleDelete} />
			</div>
		</div>
	);
};

export default Task;
