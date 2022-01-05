import React from "react";
import Routes from "./routes";
import { ConfigProvider } from "react-vant";
import "./App.less";

const themeVars = {
	"--rv-button-primary-background-color": "#39b9b9",
	"--rv-button-primary-border-color": "#39b9b9"
};
const App: React.FC = () => {
	return (
		<div className="app">
			<ConfigProvider themeVars={themeVars}>
				<Routes />
			</ConfigProvider>
		</div>
	);
};
export default App;
