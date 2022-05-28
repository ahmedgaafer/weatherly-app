import React from "react";

import { useSelector } from "react-redux";
import { selectImperial } from "../../Components/Switch/switchSlice";
import { userIP } from "../../app/appSlice";
import LocationInput from "../LocationInput/LocationInput";

function Landing() {
	return (
		<div className="body landing">
			<LocationInput />
		</div>
	);
}

export default Landing;
