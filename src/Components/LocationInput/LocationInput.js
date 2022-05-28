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
	"& label.Mui-focused": {
		color: "white",
	},
	"& .MuiInput-underline:after": {
		borderBottomColor: "#00adb5",
	},
	"& .MuiOutlinedInput-root": {
		color: "#00adb5",
		fontSize: "36px",
		textAlign: "center",

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
	const [locationName, setLocationName] = React.useState("");
	const dispatch = useDispatch();

	const handleInputChange = (e) => {
		setLocationName(e.target.value);
		console.log(e.target.value);
		//dispatch(setLocation(value));
		// dispatch(
		// 	getLocalWeatherData({
		// 		q: value,
		// 		options: {
		// 			num_of_days: 5,
		// 			includelocation: "yes",
		// 			showmap: "yes",
		// 			aqi: "yes",
		// 		},
		// 	}),
		// );
	};

	const debouncedChange = debounce(handleInputChange, 200);

	return (
		<div className="locationInput">
			<span>Right now in </span>
			<span>
				<LocationInputComponent
					id="standard-basic"
					value={locationName}
					onChange={debouncedChange}
					spellCheck={false}
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
