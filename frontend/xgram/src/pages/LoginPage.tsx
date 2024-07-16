// src/pages/LoginPage.tsx
import {mdiEmailOutline, mdiLockOutline} from "@mdi/js";
import Icon from "@mdi/react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import "tailwindcss/tailwind.css";
import {User} from "../types/usetypes";

interface LoginPageProps {
	onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({onLogin}) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const navigate = useNavigate();

	const handleLogin = async () => {
		const formDataJson = {
			username,
			password
		};

		try {
			const response = await fetch("http://localhost:8080/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(formDataJson)
			});
			if (response.ok) {
				const data = await response.json();
				localStorage.setItem("user", JSON.stringify(data.user));
				toast.success("Login successful");
				console.log(data.user);
				navigate("/");
				onLogin(data.user);
			} else {
				const errorData = await response.json();
				toast.error(`Login failed: ${errorData.error}`);
			}
		} catch (error) {
			console.error("Error logging in:", error);
			toast.error("Error logging in");
		}
	};

	return (
		<div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
			<div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{maxWidth: "1000px"}}>
				<div className="md:flex w-full">
					<div className="w-full py-10 px-5 md:px-10">
						<div className="text-center mb-10">
							<h1 className="font-bold text-3xl text-gray-900">Login</h1>
							<p>Enter your information to login</p>
						</div>
						<div>
							<div className="flex -mx-3">
								<div className="w-full px-3 mb-5">
									<label htmlFor="email" className="text-xs font-semibold px-1">
										Email
									</label>
									<div className="flex">
										<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
											<Icon path={mdiEmailOutline} size={1} color="gray" />
										</div>
										<input id="email" type="email" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="example@example.com" value={username} onChange={e => setUsername(e.target.value)} required />
									</div>
								</div>
							</div>
							<div className="flex -mx-3">
								<div className="w-full px-3 mb-12">
									<label htmlFor="password" className="text-xs font-semibold px-1">
										Password
									</label>
									<div className="flex">
										<div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
											<Icon path={mdiLockOutline} size={1} color="gray" />
										</div>
										<input id="password" type="password" className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500" placeholder="************" value={password} onChange={e => setPassword(e.target.value)} required />
									</div>
								</div>
							</div>
							<div className="flex -mx-3">
								<div className="w-full px-3 mb-5">
									<button className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold" onClick={handleLogin}>
										LOGIN NOW
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
