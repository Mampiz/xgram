// src/App.tsx
import {useEffect, useState} from "react";
import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Homepage from "./components/users";
import LoginPage from "./pages/LoginPage";
import LandingPage from "./pages/LandingPage";
import RegisterPage from "./pages/RegisterPage";
import {User} from "./types/usetypes";

function App() {
	const [user, setUser] = useState<User | null>(null);

	const handleLogin = (user: User) => {
		setUser(user);
		localStorage.setItem("user", JSON.stringify(user));
	};

	useEffect(() => {
		const storedUser = localStorage.getItem("user");
		if (storedUser) {
			setUser(JSON.parse(storedUser));
		}
	}, []);

	return (
		<Router>
			<Routes>
				<Route path="/home" element={<Homepage user={user} />} />
				<Route path="/" element={<LandingPage/>} />
				<Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />
				<Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
			</Routes>
			<ToastContainer />
		</Router>
	);
}

export default App;
