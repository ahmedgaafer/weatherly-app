import switchReducer, {
	click,
	selectImperial,
	selectMetric,
} from "./switchSlice";

describe("switch reducer", () => {
	it("should handle initial state", () => {
		expect(switchReducer(undefined, { type: "unknown" })).toEqual({
			imperial: false,
		});
	});

	it("should handle click", () => {
		const actual = switchReducer({ imperial: false }, click());
		expect(actual.imperial).toEqual(true);
	});

	it("should handle selectImperial & selectMetric", () => {
		const state = {
			systemSwitch: {
				imperial: false,
			},
		};
		expect(selectImperial(state)).toEqual(false);
		expect(selectMetric(state)).toEqual(true);
	});
});
