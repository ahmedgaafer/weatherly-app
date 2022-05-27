import React, { useEffect, useState } from "react";
import { AiTwotoneCloud } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIP } from "../../app/appSlice";
import Switch from "../Switch/Switch";
export function Header() {
	const [date, setDate] = useState(new Date());
	const dispatch = useDispatch();
	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date());
		}, 1000);

		dispatch(getIP());
		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);

	return (
		<div className="nav">
			<div className="top">
				<NavLink to="/weatherly-app/">
					<span className="logo">
						<AiTwotoneCloud />
						<span>Weatherly</span>
					</span>
				</NavLink>
				<span className="date">
					<div>{date.toLocaleTimeString()}</div>
					<div>{date.toLocaleDateString()} </div>
				</span>
			</div>
			<div className="bot">
				<nav>
					<NavLink to="/weatherly-app/"> Home </NavLink>
					<NavLink to="/weatherly-app/dashboard"> dashboard </NavLink>
				</nav>
				<Switch />
			</div>
		</div>
	);
}
