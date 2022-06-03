import DatepickerReducer, { pickedDate, setDate } from "./Datepicker.slice";

describe("Datepicker reducer", () => {
	const initialState = {
		pickedDate: false,
	};

	it("should handle initial state", () => {
		expect(DatepickerReducer(undefined, { type: "unknown" })).toEqual({
			pickedDate: false,
		});
	});

	it("should handle setDate", () => {
		const actual = DatepickerReducer(initialState, setDate(true));
		expect(actual.pickedDate).toEqual(true);
	});

	it("should select from reducer", () => {
		const state = {
			datePicker: {
				pickedDate: "test",
			},
		};

		expect(pickedDate(state)).toEqual("test");
	});
});
