import {useState} from "react";
import "./App.css";
import reactLogo from "./assets/react.svg";
import UsersShow from "./components/users";
import viteLogo from "/vite.svg";

function App() {
	useState;

	return (
		<>
			<div>
				<a href="https://vitejs.dev" className="flex justify-center" target="_blank">
					<img src={viteLogo} className="logo" alt="Vite logo" />
				</a>
				<a href="https://react.dev" className="flex justify-center" target="_blank">
					<img src={reactLogo} className="logo react" alt="React logo" />
				</a>
			</div>
			<h1 className=" text-green-500 text-xl mb-14">
				El inicio de algo grande <strong>XGRAM</strong>{" "}
			</h1>
			<UsersShow />
		</>
	);
}

export default App;
