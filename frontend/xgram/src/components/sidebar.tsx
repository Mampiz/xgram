import {User, UserFriend} from "@/types/usetypes";
import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import ExpandableCardDemo from "./blocks/expandable-card-demo-standard";

interface sidebaruser {
	user: User | null;
}

export default function Sidebar({user}: sidebaruser) {
	const [isPopupOpen, setIsPopupOpen] = useState(false);
	const [friends, setFriends] = useState<UserFriend[]>([]);

	const togglePopup = () => {
		setIsPopupOpen(!isPopupOpen);
	};

	useEffect(() => {
		const fetchFriendData = async () => {
			if (user?.id) {
				try {
					const response = await fetch(`http://localhost:8080/friend/${user.id}`, {
						method: "GET", // Asegúrate de que el método HTTP sea correcto
						headers: {
							"Content-Type": "application/json"
						},
						mode: "cors"
					});
					if (response.ok) {
						const data: UserFriend[] = await response.json();
						console.log(data);
						setFriends(data || []);
					} else {
						console.error("Error fetching friends:", response.statusText);
						toast.error("Error cargando los amigos");
						setFriends([]);
					}
				} catch (error) {
					console.error("Error fetching friends data:", error);
					toast.error("Error cargando los amigos");
					setFriends([]);
				}
			}
		};
		fetchFriendData();
	}, [user?.id]);

	return (
		<>
			<div className="sidebar bg-gray-100 mt-4 m-2">
				<div className="relative flex flex-col bg-clip-border rounded-lg bg-white text-gray-700 m-2 p-4 shadow-lg ">
					<div className="px-4">
						<h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">XGRAM</h5>
					</div>
					<nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
						<div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all outline-none">
							<div className="grid place-items-center mr-4">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
									<path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
								</svg>
							</div>
							<a href="" className="flex-grow font-medium hover:text-black">
								Home
							</a>
						</div>

						<div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all outline-none">
							{" "}
							<div className="grid place-items-center mr-4">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
									<path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0M3.124 7.5A8.969 8.969 0 0 1 5.292 3m13.416 0a8.969 8.969 0 0 1 2.168 4.5" />
								</svg>
							</div>
							<a href="" className="flex-grow font-normal">
								Notifications
							</a>
						</div>

						<div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all outline-none">
							{" "}
							<div className="grid place-items-center mr-4">
								<img src={user?.picturepath} className="object-cover bg-white rounded-full size-7 border" />
							</div>
							<a href="" className="flex-grow font-normal">
								{user?.username}
							</a>
						</div>

						<div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all outline-none">
							<button
								onClick={togglePopup}
								className="h-[28px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
						disabled:pointer-events-none disabled:opacity-50 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full font-medium
						 text-white bg-[#429e9e] w-full">
								Post
							</button>
						</div>
					</nav>
				</div>
				<div className="bg-white rounded-lg mt-4 m-2 shadow-lg">
					<ExpandableCardDemo friends={friends} />
				</div>
			</div>

			{isPopupOpen && (
				<div className="fixed inset-0 flex justify-center items-center bg-gray-200 bg-opacity-75">
					<div className="rounded-xl bg-white w-full md:w-2/3 lg:w-1/3">
						<div className="px-5 py-3 flex items-center justify-between text-blue-400 border-b">
							<div onClick={togglePopup} className=" flex flex-row  hover:bg-blue-100 px-4 py-3 rounded-full font-bold cursor-pointer">
								<p>Stop graming</p>
							</div>

							<i className="fas fa-times text-black text-xl cursor-pointer" onClick={togglePopup}></i>
						</div>
						<div className="flex p-4 flex-col">
							<div className="flex flex-row ml-3 mb-2">
								<img className="rounded-full w-14" src={user?.picturepath} />
								<p className="ml-[-20px] font-medium">{user?.username}</p>
							</div>
							<div className="ml-3 flex flex-col w-full">
								<textarea placeholder="What's happening?" className="w-full text-xl bg-white resize-none outline-none h-32"></textarea>
							</div>
						</div>
						<div className="flex items-center text-blue-400 justify-between py-6 px-4 border-t">
							<div className="flex text-2xl pl-12">
								<div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
									<i className="fas fa-image"></i>
								</div>
								<div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
									<i className="fas fa-poll-h"></i>
								</div>
								<div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
									<i className="fas fa-smile"></i>
								</div>
								<div className="flex items-center justify-center p-3 hover:bg-blue-100 rounded-full cursor-pointer">
									<i className="fas fa-calendar-alt"></i>
								</div>
							</div>
							<div>
								<p onClick={togglePopup} className="inline px-4 py-3 rounded-full font-bold text-white bg-blue-500 cursor-pointer">
									Xgram it
								</p>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
