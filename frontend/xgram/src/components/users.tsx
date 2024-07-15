import {useEffect, useState} from "react";
import {PostData} from "../types/posttypes";
import {User} from "../types/usetypes";
import Post from "./post";
import Sidebar from "./sidebar";

interface ParentComponentProps {
	user: User | null;
}

const ParentComponent = ({user}: ParentComponentProps) => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	console.log(user);
	useEffect(() => {
		const fetchPostData = async () => {
			try {
				const response = await fetch("http://localhost:8080/post");
				const data: PostData[] = await response.json();
				setPosts(data);
			} catch (error) {
				console.error("Error fetching post data:", error);
			}
		};

		fetchPostData();
	}, []);

	const handleNextPost = () => {
		setCurrentIndex(prevIndex => (prevIndex + 1) % posts.length);
	};

	return (
		<div className="flex h-screen w-screen">
			<aside className="w-1/6 bg-white border-r">
				<Sidebar />
			</aside>
			<main className="flex-1 flex items-center justify-center bg-gray-100">
				<div className="App">{posts.length > 0 && <Post post={posts[currentIndex]} onNextPost={handleNextPost} userid={user ? user.id : null} />}</div>
			</main>
		</div>
	);
};

export default ParentComponent;
