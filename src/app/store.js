import { configureStore } from "@reduxjs/toolkit";
import systemSwitchReducer from "../Components/Switch/switchSlice";
import appSlice from "./appSlice";
import DatepickerSlice from "../Components/Datepicker/Datepicker.slice";

export const store = configureStore({
	reducer: {
		systemSwitch: systemSwitchReducer,
		app: appSlice,
		datePicker: DatepickerSlice,
	},
});
