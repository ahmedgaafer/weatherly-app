import React from "react";

import "../assets/css/App.css";
import { Header } from "../../Components/Header/Header";
import Landing from "../../Components/Landing/Landing";

function LandingPage() {
	return (
		<React.Fragment>
			<Header />
			<Landing />
		</React.Fragment>
	);
}

export default LandingPage;
