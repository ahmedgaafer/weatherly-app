import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserIP } from "../services/getUserIp";
import { getLocalWeather } from "../services/getLocalWeather";
import { getHistoricalWeather } from "../services/getHistoricalWeather";
const initialState = {
	userIP: false,
	ipStatus: "idle",
	currentLocation: false,
	currentWeather: false,
	weatherStatus: "idle",
	currentPage: "home",
	dashboardWeather: false,
};

export const getIP = createAsyncThunk("app/getUserIP", async () => {
	return await getUserIP();
});

export const getLocalWeatherData = createAsyncThunk(
	"app/getLocalWeatherData",
	async (settings) => {
		const { q, options } = settings;
		return await getLocalWeather(q, options);
	},
);

export const getHistoricalData = createAsyncThunk(
	"app/getHistoricalData",
	async (settings) => {
		const { q, options } = settings;
		return await getHistoricalWeather(q, options);
	},
);

export const appSlice = createSlice({
	name: "app",
	initialState,

	reducers: {
		setIp: (state, action) => {
			state.userIP = action.payload;
		},
		setLocation: (state, action) => {
			state.currentLocation = action.payload;
		},
		setCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			// Get IP
			.addCase(getIP.pending, (state) => {
				state.ipStatus = "loading";
			})
			.addCase(getIP.fulfilled, (state, action) => {
				state.ipStatus = "idle";

				state.userIP = action.payload;
			})
			// Get Weather Local
			.addCase(getLocalWeatherData.pending, (state) => {
				state.weatherStatus = "loading";
			})
			.addCase(getLocalWeatherData.fulfilled, (state, action) => {
				state.weatherStatus = "idle";
				if (!action.payload.dashboard) {
					if (action?.payload?.nearest_area?.[0]) {
						const LOCATION = action.payload.nearest_area[0];
						state.currentLocation = `${LOCATION.region[0].value},${LOCATION.country[0].value}`;
						state.currentWeather = action.payload;
					} else {
						state.currentLocation = false;
						state.currentWeather = false;
						state.weatherStatus = "error";
					}
				} else {
					state.dashboardWeather = action.payload;
				}
			})
			//Get Weather Historical
			.addCase(getHistoricalData.pending, (state) => {
				state.weatherStatus = "loading";
			})
			.addCase(getHistoricalData.fulfilled, (state, action) => {
				state.weatherStatus = "idle";
				if (action?.payload?.nearest_area?.[0]) {
					state.dashboardWeather = action.payload;
				}
			});
	},
});

export const { setIp, setLocation, setCurrentPage } = appSlice.actions;

export const userIP = (state) => state.app.userIP;
export const currentLocation = (state) => state.app.currentLocation;
export const selectQuery = (state) =>
	state.app.currentLocation || state.app.userIP;
export const currentWeather = (state) => state.app.currentWeather;
export const dashboardWeather = (state) => state.app.dashboardWeather;
export const weatherStatus = (state) => state.app.weatherStatus;
export const currentPage = (state) => state.app.currentPage;

export default appSlice.reducer;
