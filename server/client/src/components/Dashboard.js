import React from "react";
import { Link } from "react-router-dom";

const Dashboard = () => {
	return (
		<div>
			Dashboard
			<div className="fixed-action-btn">
				<Link to="/surveys/new" className="btn-floating btn-large grey">
					<i className="material-icons">blur_on</i>
				</Link>
			</div>
		</div>
	);
};

export default Dashboard;
