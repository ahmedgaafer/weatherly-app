import React, { useEffect, useState } from "react";
import { AiTwotoneCloud } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
	getIP,
	getLocalWeatherData,
	userIP,
	setCurrentPage,
	currentPage,
} from "../../app/appSlice";

import Switch from "../Switch/Switch";
export function Header() {
	const [date, setDate] = useState(new Date());
	const dispatch = useDispatch();
	const IP = useSelector(userIP);
	const page = useSelector(currentPage);
	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date());
		}, 1000);

		dispatch(getIP());
		document.querySelector(`#${page}-nav`).classList.add("active");

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

	const handleNavClick = (e) => {
		const data = e.target.getAttribute("data");
		if (data) {
			const nav = document.querySelector("nav");
			for (const child of nav.children) {
				if (child.getAttribute("data") === data) {
					child.classList.add("active");
				} else {
					child.classList.remove("active");
				}
			}
			dispatch(setCurrentPage(data));
		}
	};

	return (
		<div className="nav">
			<div className="top">
				<div>
					<span className="logo">
						<AiTwotoneCloud />
						<span>Weatherly</span>
					</span>
				</div>
				<span className="date">
					<div>{date.toLocaleTimeString()}</div>
					<div>{date.toLocaleDateString()} </div>
				</span>
			</div>
			<div className="bot">
				<nav>
					<span
						className="a"
						id="home-nav"
						data="home"
						onClick={handleNavClick}
					>
						{" "}
						Home{" "}
					</span>
					<span
						className="a"
						id="dashboard-nav"
						data="dashboard"
						onClick={handleNavClick}
					>
						{" "}
						dashboard{" "}
					</span>
				</nav>
				<Switch />
			</div>
		</div>
	);
}
