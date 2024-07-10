import React, {useEffect, useState} from "react";

interface User {
	id: number;
	firstname: string;
	lastname: string;
	email: string;
	password: string;
	picturepath: string;
	location: string;
	occupation: string;
	viewedprofile: number;
	impressions: number;
}

export default function Component() {
	const [userData, setUserData] = useState<User[]>([]);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch("http://localhost:8080/users");
				const data: User[] = await response.json();
				setUserData(data);
			} catch (error) {
				console.error("Error fetching user data:", error);
			}
		};

		fetchUserData();
	}, []);

	if (userData.length === 0) {
		return <div>Loading...</div>;
	}

	const firstUser = userData[0];

	return (
		<div className="flex h-screen w-screen">
			<aside className="w-1/4 bg-white border-r">
				<div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-500 text-white">
					<SearchIcon className="w-6 h-6" />
				</div>
				<div className="p-4">
					<div className="flex items-center p-4 mb-4 bg-gray-100 rounded-lg">
						<SearchIcon className="w-8 h-8 text-blue-500" />
						<div className="ml-4">
							<h2 className="font-bold">Discover New Posts</h2>
							<p className="text-sm text-gray-600">Start swiping to find interesting things!</p>
						</div>
					</div>
					<h3 className="mb-2 font-bold text-blue-500">Messages</h3>
					<div className="space-y-4">
						{userData.map(user => (
							<div key={user.id} className="flex items-center">
								<div className="ml-4">
									<div className="flex items-center">
										<span className="font-bold">{user.firstname}</span>
										{user.impressions > 0 && <UserIcon className="w-4 h-4 ml-2 text-blue-500" />}
									</div>
									<p className="text-sm text-gray-600">{user.lastname}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</aside>
			<main className="flex-1 flex items-center justify-center bg-gray-100">
				<div className="w-96 bg-white rounded-lg shadow-lg">
					<div className="relative">
						<div className="flex justify-around">
							<h2 className="text-lg font-bold">{firstUser.firstname}</h2>
							<p>{firstUser.location}</p>
						</div>
						<img src={firstUser.picturepath || "/placeholder.svg"} alt={firstUser.occupation} className="w-full h-64 object-cover rounded-t-lg" />
						<ListIcon className="absolute top-2 left-2 w-6 h-6 text-white" />
					</div>
					<div className="p-4">
						<div className="flex items-center justify-between">
							<div>
								<p className="text-sm text-gray-600">{firstUser.occupation}</p>
								<p className="text-sm text-gray-600">{firstUser.viewedprofile} profile views</p>
							</div>
							<ShareIcon className="w-6 h-6 text-gray-600" />
						</div>
						<p className="mt-4 text-sm text-gray-600">Impressions: {firstUser.impressions}</p>
						<div className="flex items-center justify-around mt-4">
							<XIcon className="w-12 h-12 text-red-500" />
							<StarIcon className="w-12 h-12 text-blue-500" />
							<HeartIcon className="w-12 h-12 text-green-500" />
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

type IconProps = React.SVGProps<SVGSVGElement>;

function HeartIcon(props: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
		</svg>
	);
}

function ListIcon(props: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<line x1="8" x2="21" y1="6" y2="6" />
			<line x1="8" x2="21" y1="12" y2="12" />
			<line x1="8" x2="21" y1="18" y2="18" />
			<line x1="3" x2="3.01" y1="6" y2="6" />
			<line x1="3" x2="3.01" y1="12" y2="12" />
			<line x1="3" x2="3.01" y1="18" y2="18" />
		</svg>
	);
}

function SearchIcon(props: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</svg>
	);
}

function ShareIcon(props: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
			<polyline points="16 6 12 2 8 6" />
			<line x1="12" x2="12" y1="2" y2="15" />
		</svg>
	);
}

function StarIcon(props: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
		</svg>
	);
}

function UserIcon(props: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</svg>
	);
}

function XIcon(props: IconProps) {
	return (
		<svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</svg>
	);
}
