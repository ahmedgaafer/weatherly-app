import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";

import Switch from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { click, selectImperial } from "./switchSlice";
import { useSelector, useDispatch } from "react-redux";
const AntSwitch = styled(Switch)(({ theme }) => ({
	width: 28,
	height: 16,
	padding: 0,
	display: "flex",

	"&:active": {
		"& .MuiSwitch-thumb": {
			width: 15,
		},
		"& .MuiSwitch-switchBase.Mui-checked": {
			transform: "translateX(9px)",
		},
	},
	"& .MuiSwitch-switchBase": {
		padding: 2,

		"&.Mui-checked": {
			transform: "translateX(12px)",
			color: "#fff",
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor: "#00adb5",
			},
		},
	},
	"& .MuiSwitch-thumb": {
		boxShadow: "0 2px 4px 0 rgb(0 35 11 / 20%)",
		width: 12,
		height: 12,
		borderRadius: 6,
		transition: theme.transitions.create(["width"], {
			duration: 200,
		}),
	},
	"& .MuiSwitch-track": {
		borderRadius: 16 / 2,
		opacity: 1,
		backgroundColor: "#00adb5",
		boxSizing: "border-box",
	},
}));

export default function SystemSwitch() {
	const [state, setState] = useState(false);
	const imperial = useSelector(selectImperial);
	const dispatch = useDispatch();

	useEffect(() => {
		setState(imperial);
	}, [imperial]);
	const handleChange = (event) => {
		setState(event.target.checked);
		console.log(event.target.checked);
		dispatch(click(event.target.checked));
	};

	return (
		<Stack
			direction="row"
			spacing={1}
			alignItems="center"
			className="weatherSystem"
		>
			<Typography>Metric</Typography>
			<AntSwitch
				value={state}
				inputProps={{ "aria-label": "ant design" }}
				onClick={handleChange}
			/>
			<Typography>Imperial</Typography>
		</Stack>
	);
}
