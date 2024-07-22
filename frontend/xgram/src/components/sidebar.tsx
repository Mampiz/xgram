import {User} from "@/types/usetypes";

interface sidebaruser {
	user: User | null;
}

export default function Sidebar({user}: sidebaruser) {
	return (
		<>
			<div className="sidebar bg-gray-100">
				<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 m-2 p-4 shadow-lg shadow-blue-gray-900/5 ">
					<div className="px-4">
						<h5 className="block antialiased tracking-normal font-sans text-xl font-semibold leading-snug text-gray-900">XGRAM</h5>
					</div>
					<nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
						<div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-slate-200 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-[#3B82F6] focus:text-[#3B82F6] active:text-[#3B82F6] outline-none">
							<div className="grid place-items-center mr-4">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
									<path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
								</svg>
							</div>
							<a href="" className="flex-grow font-medium">
								Home
							</a>
						</div>
						
						<div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-slate-200 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-[#3B82F6] focus:text-[#3B82F6] active:text-[#3B82F6] outline-none">
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
						<div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-slate-200 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-[#3B82F6] focus:text-[#3B82F6] active:text-[#3B82F6] outline-none">
							{" "}
							<div className="grid place-items-center mr-4">
								<img src={user?.picturepath} className="object-cover bg-yellow-500 rounded-full size-7" alt="user" />
							</div>
							<a href="" className="flex-grow font-normal">
								{user?.username}
							</a>
						</div>
					</nav>
				</div>
				<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 m-2 p-4 shadow-lg shadow-blue-gray-900/5 h-[650px]">
					<nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
						<div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-al outline-none">
							{" "}
							<div className="grid place-items-center mr-4">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
									<path strokeLinecap="round" strokeLinejoin="round" d="M2.25 13.5h3.86a2.25 2.25 0 0 1 2.012 1.244l.256.512a2.25 2.25 0 0 0 2.013 1.244h3.218a2.25 2.25 0 0 0 2.013-1.244l.256-.512a2.25 2.25 0 0 1 2.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 0 0-2.15-1.588H6.911a2.25 2.25 0 0 0-2.15 1.588L2.35 13.177a2.25 2.25 0 0 0-.1.661Z" />
								</svg>
							</div>
							<a href="" className="flex-grow font-normal">
								Messages
							</a>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}
