import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getHistoricalData,
	getLocalWeatherData,
	selectQuery,
	weatherStatus,
	dashboardWeather,
} from "../../app/appSlice";
import { pickedDate } from "../Datepicker/Datepicker.slice";
import { Datepicker } from "../Datepicker/Datepicker";
import HeatGraph from "../HeatGraph/HeatGraph";
import MetaInfoComponent from "../MetaInfoComponent/MetaInfo.component";

function Dashboard() {
	const dispatch = useDispatch();
	const currentDate = useSelector(pickedDate);
	const query = useSelector(selectQuery);
	const WeatherStatus = useSelector(weatherStatus);
	const dashboardWeatherData = useSelector(dashboardWeather);
	const midDayWeather = dashboardWeatherData?.weather[0]?.hourly[12];

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
						tp: 1,
					},
				}),
			);
		} else {
			dispatch(
				getHistoricalData({
					q: query,
					options: {
						date: currentDate,
						dashboard: true,
					},
				}),
			);
		}
	}, [currentDate, query, dispatch]);
	return (
		<div className="body dashboard">
			<Datepicker />

			{WeatherStatus === "loading" ? (
				<div>Loading</div>
			) : (
				<>
					<HeatGraph />

					<h3>Advanced Information</h3>
					<div className="meta-info-container">
						<MetaInfoComponent
							title="Humidity"
							timeOut={550}
							info={midDayWeather?.humidity}
							sign={"%"}
						/>
						<MetaInfoComponent
							title="Chance of rain"
							timeOut={550}
							info={midDayWeather?.chanceofrain}
							sign={"%"}
						/>
						<MetaInfoComponent
							title="Chance of sunshine"
							timeOut={550}
							info={midDayWeather?.chanceofsunshine}
							sign={"%"}
						/>
						<MetaInfoComponent
							title="Chance of remdry"
							timeOut={550}
							info={midDayWeather?.chanceofremdry}
							sign={"%"}
						/>
					</div>
				</>
			)}
		</div>
	);
}

export default Dashboard;
