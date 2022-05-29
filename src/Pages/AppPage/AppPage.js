import React from "react";
import { useSelector } from "react-redux";
import "../assets/css/App.css";
import { Header } from "../../Components/Header/Header";
import Landing from "../../Components/Landing/Landing";
import Dashboard from "../../Components/Dashboard/Dashboard";
import { currentPage } from "../../app/appSlice";

const routeConfig = {
	home: {
		component: <Landing />,
	},
	dashboard: {
		component: <Dashboard />,
	},
};

function AppPage() {
	const page = useSelector(currentPage);
	return (
		<React.Fragment>
			<Header />
			{routeConfig[page].component}
		</React.Fragment>
	);
}

export default AppPage;
