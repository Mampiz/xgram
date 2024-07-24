// src/pages/LoginPage.tsx
import {EyeFilledIcon} from "@/components/icons/EyeFilledIcon";
import {EyeSlashFilledIcon} from "@/components/icons/EyeSlashFilledIcon";
import {Input} from "@nextui-org/react";
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
	const [isVisible, setIsVisible] = useState(false);
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

	const toggleVisibility = () => setIsVisible(!isVisible);

	return (
		<div className="min-w-screen min-h-screen bg-white flex items-center justify-center px-5 py-5">
			<div className="bg-white text-gray-500 rounded-3xl  w-full overflow-hidden" style={{maxWidth: "400px"}}>
				<div className="md:flex w-full">
					<div className="w-full py-10 px-5 md:px-10">
						<div className="text-center mb-10">
							<h1 className="font-bold text-3xl text-gray-900">Login</h1>
							<p>Enter your information to login</p>
						</div>
						<div>
							<div className="flex -mx-3">
								<div className="w-full px-3 mb-5">
									<div className="flex">
										<Input type="email" label="Email or User" defaultValue="example@email.com" description="We'll never share your email with anyone else." className="max-w-xs" value={username} onChange={e => setUsername(e.target.value)} required />
									</div>
								</div>
							</div>
							<div className="flex -mx-3">
								<div className="w-full px-3 mb-12">
									<Input
										label="Password"
										variant="flat"
										placeholder="Enter your password"
										endContent={
											<button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
												{isVisible ? <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" /> : <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />}
											</button>
										}
										type={isVisible ? "text" : "password"}
										className="max-w-xs"
										value={password}
										onChange={e => setPassword(e.target.value)}
										required
									/>
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
