import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div>
			<h1>Task Manager</h1>
			<Link to="/add-task">add task</Link>
			<Link to="/edit-task">edit task</Link>
		</div>
	);
};

export default Home;
