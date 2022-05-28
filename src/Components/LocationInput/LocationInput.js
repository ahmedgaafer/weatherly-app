import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import {
	currentLocation,
	setLocation,
	getLocalWeatherData,
} from "../../app/appSlice";
import { debounce } from "lodash";

const LocationInputComponent = styled(TextField)({
	"& .MuiInput-underline:after": {
		borderBottomColor: "#00adb5",
	},
	"& .MuiOutlinedInput-root": {
		color: "#00adb5",
		fontSize: "36px",
		textAlign: "center",
		placeholderTextColor: "red",
		"& fieldset": {
			borderBottomColor: "#00adb5",
		},
		"&:hover fieldset": {
			borderBottomColor: "#08cdd7",
		},
		"&.Mui-focused fieldset": {
			border: "none",
			borderBottom: "1px solid #08cdd7",
		},
		"&.Mui-focused": {
			color: "#08cdd7",
		},
		"&:hover": {
			color: "#08cdd7",
		},
	},
});

function LocationInput() {
	const locationName = useSelector(currentLocation);

	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		const { value } = e.target;
		if (value.length > 0) {
			dispatch(setLocation(value));
			dispatch(
				getLocalWeatherData({
					q: value,
					options: {
						num_of_days: 5,
						includelocation: "yes",
						showmap: "yes",
						aqi: "yes",
					},
				}),
			);
		}
	};

	const debouncedChange = useMemo(() => debounce(handleInputChange, 500), []);

	return (
		<div className="locationInput">
			<span>Right now in </span>
			<span>
				<LocationInputComponent
					id="standard-basic"
					onChange={debouncedChange}
					spellCheck={false}
					placeholder={locationName}
					inputProps={{
						style: {
							textAlign: "center",
						},
					}}
				/>
			</span>
		</div>
	);
}

export default LocationInput;
