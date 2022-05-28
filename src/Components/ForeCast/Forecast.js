import React from "react";
import LinearProgress from "@mui/material/LinearProgress";
import { SiWindicss } from "react-icons/si";
import { WiHumidity, WiRainWind } from "react-icons/wi";
function Forecast({ main, isWeatherLoading, Weather, isImperial, today }) {
	const degreeKey = isImperial ? "F" : "C";
	const speedKey = isImperial ? "Miles" : "Kmph";
	const currentDegree = Weather[`temp_${degreeKey}`];
	const minDegree = Weather[`mintemp${degreeKey}`];
	const maxDegree = Weather[`maxtemp${degreeKey}`];

	const weatherCase = main
		? Weather?.weatherDesc?.[0]?.value
		: Weather?.hourly?.[4]?.weatherDesc?.[0]?.value;
	const weatherIcon = main
		? Weather?.weatherIconUrl?.[0]?.value
		: Weather?.hourly?.[4]?.weatherIconUrl?.[0]?.value;

	const windSpeed = Weather?.hourly?.[4]?.[`windspeed${speedKey}`];

	const humidity = Weather?.hourly?.[4]?.humidity;
	const chanceofrain = Weather?.hourly?.[4]?.chanceofrain;

	return (
		<div className={`forecast `}>
			{isWeatherLoading ? (
				<LinearProgress color="inherit" />
			) : (
				<div className={`${main ? "big" : "small"}`}>
					<div className="imgContainer">
						<img src={weatherIcon} alt={weatherCase} />
						<div className="weatherCase">{weatherCase}</div>
					</div>
					<div className="middleContainer">
						{main && (
							<div className="temp">
								<span>{currentDegree}</span>
								<sup>{degreeKey}</sup>
							</div>
						)}
						<div className="minmax">
							<span>{minDegree}</span>/<span>{maxDegree}</span>
							<sup>{degreeKey}</sup>
						</div>
						<div className="day">{today.toUpperCase().slice(0, 3)}</div>
					</div>
					{main && (
						<div className="metaInfoContainer">
							<div>
								<SiWindicss />
								<span>{windSpeed} </span>
								<sup>{speedKey} </sup>
							</div>
							<div>
								<WiHumidity />
								<span>{humidity} %</span>
							</div>
							<div>
								<WiRainWind />
								<span>{chanceofrain} %</span>
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}

export default Forecast;
