import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import "./index.css";
import AppPage from "./Pages/AppPage/AppPage";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<AppPage />
		</Provider>
	</React.StrictMode>,
);