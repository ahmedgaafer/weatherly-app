import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	imperial: true,
};

export const systemSwitchSlice = createSlice({
	name: "systemSwitch",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		click: (state) => {
			// Redux Toolkit allows us to write "mutating" logic in reducers. It
			// doesn't actually mutate the state because it uses the Immer library,
			// which detects changes to a "draft state" and produces a brand new
			// immutable state based off those changes
			state.imperial = !state.imperial;
		},
	},
});

export const { click } = systemSwitchSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectImperial = (state) => state.systemSwitch.imperial;
export const selectMetric = (state) => !state.systemSwitch.imperial;

export default systemSwitchSlice.reducer;
