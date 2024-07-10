import {useEffect, useState} from "react";

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

const UsersShow = () => {
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

	return (
		<div>
			{userData.map(user => (
				<div key={user.id}>
					<p>Email: {user.email}</p>
					<p>Location: {user.location}</p>
					<p>Occupation: {user.occupation}</p>
					<p>Viewed Profile: {user.viewedprofile}</p>
					<p>Impressions: {user.impressions}</p>
				</div>
			))}
		</div>
	);
};

export default UsersShow;
