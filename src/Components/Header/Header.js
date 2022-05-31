import React, { useEffect, useState } from "react";
import { AiTwotoneCloud } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
	getIP,
	getLocalWeatherData,
	setCurrentPage,
	currentPage,
	selectQuery,
} from "../../app/appSlice";

import Switch from "../Switch/Switch";
export function Header() {
	const [date, setDate] = useState(new Date());
	const dispatch = useDispatch();
	const query = useSelector(selectQuery);
	const page = useSelector(currentPage);
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
		query &&
			dispatch(
				getLocalWeatherData({
					q: query,
					options: {
						num_of_days: 5,
						includelocation: "yes",
						showmap: "yes",
					},
				}),
			);
		document.querySelector(`#${page}-nav`).classList.add("active");
	}, [query, page, dispatch]);

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
