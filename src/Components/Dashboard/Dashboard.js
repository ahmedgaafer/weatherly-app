import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocalWeatherData, selectQuery } from "../../app/appSlice";
import { pickedDate } from "../Datepicker/Datepicker.slice";
import { Datepicker } from "../Datepicker/Datepicker";
import HeatGraph from "../HeatGraph/HeatGraph";

function Dashboard() {
	const dispatch = useDispatch();
	const currentDate = useSelector(pickedDate);
	const query = useSelector(selectQuery);

	useEffect(() => {
		const now = new Date();
		now.setHours(0, 0, 0, 0);
		if (new Date(currentDate) >= now) {
			dispatch(
				getLocalWeatherData({
					q: query,
					options: {
						num_of_days: 1,
						date: currentDate,
						dashboard: true,
					},
				}),
			);
		} else {
		}
	}, [currentDate, query, dispatch]);
	return (
		<div className="body dashboard">
			<Datepicker />
			<HeatGraph />
		</div>
	);
}

export default Dashboard;
