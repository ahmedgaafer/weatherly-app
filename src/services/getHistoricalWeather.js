import { stringify } from "./getLocalWeather";

export async function getHistoricalWeather(q, options) {
	const BASE_URL =
		process.env.NODE_ENV === "development"
			? "http://api.worldweatheronline.com/premium/v1/past-weather.ashx"
			: "https://api.worldweatheronline.com/premium/v1/past-weather.ashx";

	const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
	const params = {
		q, // location
		format: "json",
		key: API_KEY,
		...options,
	};

	return await fetch(`${BASE_URL}?${stringify(params)}`, {
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
	})
		.then((res) => res.json())
		.then((data) => {
			return { ...data.data, dashboard: options.dashboard };
		});
}
