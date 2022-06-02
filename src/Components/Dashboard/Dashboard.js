import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	getHistoricalData,
	getLocalWeatherData,
	selectQuery,
	weatherStatus,
	dashboardWeather,
} from "../../app/appSlice";
import { selectImperial } from "../Switch/switchSlice";
import { pickedDate } from "../Datepicker/Datepicker.slice";
import { Datepicker } from "../Datepicker/Datepicker";
import HeatGraph from "../HeatGraph/HeatGraph";
import MetaInfoComponent from "../MetaInfoComponent/MetaInfo.component";
import LinearProgress from "@mui/material/LinearProgress";

function Dashboard() {
	const dispatch = useDispatch();
	const currentDate = useSelector(pickedDate);
	const isImperial = useSelector(selectImperial);
	const query = useSelector(selectQuery);
	const WeatherStatus = useSelector(weatherStatus);
	const dashboardWeatherData = useSelector(dashboardWeather);
	const midDayWeather = dashboardWeatherData?.weather?.[0]?.hourly?.[12];

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

	const metaInfoComponents = [
		{
			title: "Humidity",
			timeOut: 550,
			info: midDayWeather?.humidity,
			sign: "%",
			isPercentage: true,
		},
		{
			title: "Chance of rain",
			timeOut: 550,
			info: midDayWeather?.chanceofrain,
			sign: "%",
			isPercentage: true,
		},
		{
			title: "Chance of sunshine",
			timeOut: 550,
			info: midDayWeather?.chanceofsunshine,
			sign: "%",
			isPercentage: true,
		},
		{
			title: "Chance of remdry",
			timeOut: 550,
			info: midDayWeather?.chanceofremdry,
			sign: "%",
			isPercentage: true,
		},
		{
			title: "AVG Temperature",
			info: dashboardWeatherData?.weather?.[0]?.[
				isImperial ? "avgtempF" : "avgtempC"
			],
			sign: isImperial ? "°F" : "°C",
		},
		{
			title: "Wind Speed",
			info: midDayWeather?.[isImperial ? "windspeedMiles" : "windspeedKmph"],
			sign: isImperial ? "mph" : "km/h",
		},
		{
			title: "UV Index",
			info: midDayWeather?.uvIndex,
			sign: "",
		},
	];
	return (
		<div className="body dashboard">
			<Datepicker />

			{WeatherStatus === "loading" ? (
				<LinearProgress color="inherit" />
			) : (
				<>
					<HeatGraph />

					<h3>Advanced Information</h3>
					<div className="meta-info-container">
						{metaInfoComponents.map((metaInfoComponent, i) => (
							<MetaInfoComponent
								{...metaInfoComponent}
								key={`${metaInfoComponent.title}-${i}`}
							/>
						))}
					</div>
				</>
			)}
		</div>
	);
}

export default Dashboard;
