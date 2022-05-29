import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDate, pickedDate } from "./Datepicker.slice";

export function Datepicker({ debug }) {
	const selectedDate = useSelector(pickedDate);
	const [date, setInternalDate] = useState();

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
				value={date}
				onChange={handleDateChange}
			/>
			{debug && <div style={{ color: "white" }}>{`${selectedDate}`}</div>}
		</div>
	);
}
