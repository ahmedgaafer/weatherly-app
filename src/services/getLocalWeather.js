function stringify(obj) {
	const str = [];
	for (const p in obj)
		if (obj.hasOwnProperty(p)) {
			str.push(`${encodeURIComponent(p)}=${encodeURIComponent(obj[p])}`);
		}
	return str.join("&");
}

export async function getLocalWeather(q, options) {
	const BASE_URL =
		process.env.NODE_ENV === "development"
			? "http://api.worldweatheronline.com/premium/v1/weather.ashx"
			: "https://api.worldweatheronline.com/premium/v1/weather.ashx";

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
