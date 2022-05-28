import React from "react";
import { useSelector } from "react-redux";
import { currentWeather, weatherStatus } from "../../app/appSlice";
import { selectImperial } from "../Switch/switchSlice";
import LocationInput from "../LocationInput/LocationInput";
import Forecast from "../ForeCast/Forecast";

function Landing() {
	const DAYS = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];
	const isWeatherLoading = useSelector(weatherStatus);
	const Weather = useSelector(currentWeather);
	const isImperial = useSelector(selectImperial);
	const today = DAYS[new Date().getDay()];
	const current = {
		...Weather?.current_condition?.[0],
		...Weather?.weather?.[0],
	};
	return (
		<div className="body landing">
			<LocationInput />
			{isWeatherLoading === "error" ? (
				<div>Error</div>
			) : (
				<>
					<Forecast
						today={today}
						Weather={current}
						main={true}
						isImperial={isImperial}
						isWeatherLoading={isWeatherLoading === "loading"}
					/>
					<div className="futureCast">
						{Weather?.weather?.map((weather, index) => {
							if (index === 0) return <div key={0}></div>;
							return (
								<Forecast
									today={DAYS[(new Date().getDay() + index) % DAYS.length]}
									Weather={weather}
									isImperial={isImperial}
									isWeatherLoading={isWeatherLoading === "loading"}
									key={`${weather.date}-${index}`}
								/>
							);
						})}
					</div>
				</>
			)}
		</div>
	);
}

export default Landing;
