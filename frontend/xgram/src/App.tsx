import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import "./App.css";
import UsersShow from "./components/users";
import RegisterPage from "./pages/RegisterPage";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<UsersShow />} />
				<Route path="/register" element={<RegisterPage />} />
			</Routes>
		</Router>
	);
}

export default App;
