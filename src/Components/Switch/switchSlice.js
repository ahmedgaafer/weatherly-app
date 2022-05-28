import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	imperial: false,
};

export const systemSwitchSlice = createSlice({
	name: "systemSwitch",
	initialState,
	reducers: {
		click: (state) => {
			state.imperial = !state.imperial;
		},
	},
});

export const { click } = systemSwitchSlice.actions;

export const selectImperial = (state) => state.systemSwitch.imperial;
export const selectMetric = (state) => !state.systemSwitch.imperial;

export default systemSwitchSlice.reducer;
