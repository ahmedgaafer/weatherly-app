import React from "react";
// import { useSelector } from "react-redux";
// import { selectImperial } from "../../Components/Switch/switchSlice";
// import { userIP } from "../../app/appSlice";
import { Datepicker } from "../Datepicker/Datepicker";

function Dashboard() {
	// const imperial = useSelector(selectImperial);
	// const IP = useSelector(userIP);
	// TODO: DASHBOARD Compoenent

	return (
		<div className="body dashboard">
			<Datepicker />
		</div>
	);
}

export default Dashboard;
