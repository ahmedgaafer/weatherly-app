import React from "react";
import { Header } from "../../Components/Header/Header";
import { useSelector } from "react-redux";
import { selectImperial } from "../../Components/Switch/switchSlice";
import { userIP } from "../../app/appSlice";
function Dashboard() {
	const imperial = useSelector(selectImperial);
	const IP = useSelector(userIP);
	// TODO: DASHBOARD Compoenent

	return (
		<div className="body dashboard">
			<div>{`${imperial}     DASHBOARD Component ${IP}`}</div>
		</div>
	);
}

export default Dashboard;
