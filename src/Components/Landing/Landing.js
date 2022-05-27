import React from "react";

import { useSelector } from "react-redux";
import { selectImperial } from "../../Components/Switch/switchSlice";
import { userIP } from "../../app/appSlice";

function Landing() {
	const imperial = useSelector(selectImperial);
	const IP = useSelector(userIP);
	return (
		<div className="body landing">{`${imperial}     LANDING Component ${IP}`}</div>
	);
}

export default Landing;
