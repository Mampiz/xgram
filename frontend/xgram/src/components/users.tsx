import {useEffect, useState} from "react";
import {PostData} from "../types/posttypes";
import Post from "./post";
import Sidebar from "./sidebar";

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
	const [posts, setPosts] = useState<PostData[]>([]);

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

	useEffect(() => {
		const fetchPostData = async () => {
			try {
				const response = await fetch("http://localhost:8080/post");
				const data: PostData[] = await response.json();
				console.log(data);
				setPosts(data);
			} catch (error) {
				console.error("Error fetching post data:", error);
			}
		};

		fetchPostData();
	}, []);

	if (userData.length === 0) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex h-screen w-screen">
			<aside className="w-1/6 bg-white border-r">
				<Sidebar />
			</aside>

			<main className="flex-1 flex items-center justify-center bg-gray-100">
				<div className="App">
					{posts.map(post => (
						<Post key={post.id} post={post} />
					))}
				</div>
			</main>
		</div>
	);
}
