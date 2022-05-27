import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getUserIP } from "../services/getUserIp";
const initialState = {
	userIP: false,
	ipStatus: "idle",
};

export const getIP = createAsyncThunk("app/getUserIP", async () => {
	return await getUserIP();
});

export const appSlice = createSlice({
	name: "app",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setIp: (state, action) => {
			state.userIP = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getIP.pending, (state) => {
				state.ipStatus = "loading";
			})
			.addCase(getIP.fulfilled, (state, action) => {
				state.ipStatus = "idle";
				console.log(action);
				state.userIP = action.payload;
			});
	},
});

export const { setIp } = appSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const userIP = (state) => state.app.userIP;

export default appSlice.reducer;