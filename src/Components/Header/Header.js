import React, { useEffect, useState } from "react";
import { AiTwotoneCloud } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getIP, getLocalWeatherData, userIP } from "../../app/appSlice";
import Switch from "../Switch/Switch";
export function Header() {
	const [date, setDate] = useState(new Date());
	const dispatch = useDispatch();
	const IP = useSelector(userIP);
	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date());
		}, 1000);

		dispatch(getIP());

		return () => {
			clearInterval(interval);
		};
	}, [dispatch]);

	useEffect(() => {
		IP &&
			dispatch(
				getLocalWeatherData({
					q: IP,
					options: {
						num_of_days: 5,
						includelocation: "yes",
						showmap: "yes",
					},
				}),
			);
	}, [IP, dispatch]);

	return (
		<div className="nav">
			<div className="top">
				<NavLink to="/">
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
					<NavLink to="/"> Home </NavLink>
					<NavLink to="/dashboard"> dashboard </NavLink>
				</nav>
				<Switch />
			</div>
		</div>
	);
}
