import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import systemSwitchReducer from "../Components/Switch/switchSlice";
import appSlice from "../app/appSlice";

export const store = configureStore({
	reducer: {
		counter: counterReducer,
		systemSwitch: systemSwitchReducer,
		app: appSlice,
	},
});
