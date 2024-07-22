import {User} from "@/types/usetypes";

interface sidebaruser {
	user: User | null;
}

export default function Extrasidebar({user}: sidebaruser) {
	return (
		<>
			<div className="sidebar bg-gray-100">
				<div className="relative flex flex-col bg-clip-border rounded-xl bg-white text-gray-700 m-2 p-4 shadow-xl shadow-blue-gray-900/5">
					<nav className="flex flex-col gap-1 min-w-[240px] p-2 font-sans text-base font-normal text-gray-700">
						<div role="button" className="flex items-center w-full p-3 rounded-lg text-start leading-tight transition-all hover:bg-slate-200 hover:bg-opacity-80 focus:bg-blue-50 focus:bg-opacity-80 active:bg-gray-50 active:bg-opacity-80 hover:text-[#3B82F6] focus:text-[#3B82F6] active:text-[#3B82F6] outline-none">
							<div className="grid place-items-center mr-4">
								<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
									<path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
								</svg>
							</div>
							<a href="" className="flex-grow">
								EXTRA
							</a>
						</div>
					</nav>
				</div>
			</div>
		</>
	);
}



