import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	pickedDate: false,
};

export const DatepickerSlice = createSlice({
	name: "datePicker",
	initialState,
	// The `reducers` field lets us define reducers and generate associated actions
	reducers: {
		setDate: (state, action) => {
			console.log(action.payload);
			state.pickedDate = action.payload;
		},
	},
});

export const { setDate } = DatepickerSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`

export const pickedDate = (state) => state.datePicker.pickedDate;

export default DatepickerSlice.reducer;
