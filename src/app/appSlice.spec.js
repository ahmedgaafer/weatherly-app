import appReducer, {
	setLocation,
	setCurrentPage,
	setIp,
	getLocalWeatherData,
} from "./appSlice";

import thunk from "redux-thunk";
import configureMockStore from "redux-mock-store";

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

describe("app reducer", () => {
	it("should handle initial state", () => {
		expect(appReducer(undefined, { type: "unknown" })).toEqual({
			userIP: false,
			ipStatus: "idle",
			currentLocation: false,
			currentWeather: false,
			weatherStatus: "idle",
			currentPage: "home",
			dashboardWeather: false,
		});
	});

	it("should handle setIP", () => {
		const actual = appReducer(undefined, setIp("192.168.1.1"));
		expect(actual.userIP).toEqual("192.168.1.1");
	});

	it("should handle setLocation", () => {
		const actual = appReducer(undefined, setLocation("test"));
		expect(actual.currentLocation).toEqual("test");
	});

	it("should handle setCurrentPage", () => {
		const actual = appReducer(undefined, setCurrentPage("test"));
		expect(actual.currentPage).toEqual("test");
	});

	it("should handle async getLocalWeatherData", async () => {
		const store = mockStore({
			userIP: false,
			ipStatus: "idle",
			currentLocation: false,
			currentWeather: false,
			weatherStatus: "idle",
			currentPage: "home",
			dashboardWeather: false,
		});

		const payload = {
			q: "cairo",
			options: {
				test: "test",
			},
		};

		const expectedActions = [
			{ type: "app/getLocalWeatherData/pending", payload },
			{
				type: "app/getLocalWeatherData/fulfilled",
				payload: [{ type: "City", query: "Cairo, Egypt" }],
			},
		];

		await store.dispatch(getLocalWeatherData(payload));

		const actions = store.getActions();
		expect(actions[0].type).toBe(expectedActions[0].type);
		expect(actions[1].type).toEqual(expectedActions[1].type);
	});
});
