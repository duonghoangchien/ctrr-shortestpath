import React, { useEffect } from "react";
import "./App.css";
import dijkstra from "dijkstrajs";
import ShortestPath from "./components/ShortestPath/ShortestPath";
import Welcome from "./components/Welcome/Welcome";
import AOS from "aos";
import "aos/dist/aos.css";
import ModalBox from "./components/ModalBox/ModalBox";

function App() {
	useEffect(() => {
		AOS.init();
	}, []);
	return (
		<div className="App">
			<ModalBox />
			<Welcome />
			<ShortestPath />
		</div>
	);
}

export default App;
