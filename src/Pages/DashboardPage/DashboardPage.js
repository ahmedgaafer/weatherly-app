import React from "react";

import "../assets/css/App.css";
import { Header } from "../../Components/Header/Header";
import Dashboard from "../../Components/Dashboard/Dashboard";

function DashboardPage() {
	return (
		<React.Fragment>
			<Header />
			<Dashboard />
		</React.Fragment>
	);
}

export default DashboardPage;
