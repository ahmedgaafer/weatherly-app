import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currentLocation } from "../../app/appSlice";
function LocationInput() {
	const dispatch = useDispatch();
	const inputRef = useRef();
	const locationName = useSelector(currentLocation);

	useEffect(() => {
		if (locationName) {
			inputRef.current.textContent = locationName;
		}
	}, [locationName]);

	return (
		<div className="locationInput">
			<span>Right now in </span>
			<span
				contentEditable="true"
				suppressContentEditableWarning={true}
				spellCheck="false"
				ref={inputRef}
			></span>
		</div>
	);
}

export default LocationInput;
