import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserIP } from "../services/getUserIp";
import { getLocalWeather } from "../services/getLocalWeather";
const initialState = {
	userIP: false,
	ipStatus: "idle",
	currentLocation: false,
	currentWeather: false,
	weatherStatus: "idle",
};

export const getIP = createAsyncThunk("app/getUserIP", async () => {
	return await getUserIP();
});

export const getLocalWeatherData = createAsyncThunk(
	"app/getLocalWeatherData",
	async (settings) => {
		console.log(settings);
		const { q, options } = settings;
		return await getLocalWeather(q, options);
	},
);

export const appSlice = createSlice({
	name: "app",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setIp: (state, action) => {
			state.userIP = action.payload;
		},
		setLocation: (state, action) => {
			state.currentLocation = action.payload;
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
			// Get Weather
			.addCase(getLocalWeatherData.pending, (state) => {
				state.weatherStatus = "loading";
			})
			.addCase(getLocalWeatherData.fulfilled, (state, action) => {
				state.weatherStatus = "idle";
				const LOCATION = action.payload.nearest_area[0];
				state.currentLocation = `${LOCATION.region[0].value},${LOCATION.country[0].value}`;
				state.currentWeather = action.payload;
			});
	},
});

export const { setIp, setLocation } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const userIP = (state) => state.app.userIP;
export const currentLocation = (state) => state.app.currentLocation;
export const currentWeather = (state) => state.app.currentWeather;
export default appSlice.reducer;
