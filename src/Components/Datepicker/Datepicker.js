import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate, pickedDate } from "./Datepicker.slice";

//eslint-disable-next-line
Date.prototype.addDays = function (days) {
	var date = new Date(this.valueOf());
	date.setDate(date.getDate() + days);
	return date;
};

export function Datepicker({ debug }) {
	const selectedDate = useSelector(pickedDate);
	const [date, setInternalDate] = useState();
	const [maxDate, setMaxDate] = useState();

	const dispatch = useDispatch();

	useEffect(() => {
		let date = selectedDate;
		if (!selectedDate) {
			const d = new Date();

			const day = ("0" + d.getDate()).slice(-2);
			const month = ("0" + (d.getMonth() + 1)).slice(-2);
			date = `${d.getFullYear()}-${month}-${day}`;

			dispatch(setDate(date));
		}
		const maxD = new Date().addDays(14);
		setMaxDate(
			`${maxD.getFullYear()}-${("0" + (maxD.getMonth() + 1)).slice(-2)}-${(
				"0" + maxD.getDate()
			).slice(-2)}`,
		);

		setInternalDate(date);
	}, [dispatch, selectedDate]);

	const handleDateChange = (e) => {
		const dateValue = e.target.value;
		setInternalDate(dateValue);
		dispatch(setDate(dateValue));
	};

	return (
		<div>
			<input
				type="date"
				min="2018-07-01"
				max={maxDate}
				value={date}
				onChange={handleDateChange}
			/>
			{debug && <div style={{ color: "white" }}>{`${selectedDate}`}</div>}
		</div>
	);
}
