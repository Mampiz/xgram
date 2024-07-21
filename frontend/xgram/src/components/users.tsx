import {useEffect, useState} from "react";
import {PostData} from "../types/posttypes";
import {User} from "../types/usetypes";
import Loading from "./loading";
import Post from "./post";
import Sidebar from "./sidebar";

interface HomePageProps {
	user: User | null;
}

const Homepage = ({user}: HomePageProps) => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);

	console.log(user);

	useEffect(() => {
		const fetchPostData = async () => {
			try {
				setIsLoading(true);
				const response = await fetch("http://localhost:8080/post");
				if (response.ok) {
					const data: PostData[] = await response.json();
					setPosts(data);
				} else {
					console.log("Failed to fetch posts");
				}
			} catch (error) {
				console.error("Error fetching post data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchPostData();
	}, []);

	const handleNextPost = () => {
		setCurrentIndex(prevIndex => (posts.length > 0 ? (prevIndex + 1) % posts.length : 0));
	};

	return (
		<div className="flex h-screen w-screen">
			<aside className="w-1/6 bg-gray-100 border-r">
				<Sidebar user={user} />
			</aside>
			<main className="flex-1 flex items-center justify-center bg-gray-100">
				<div className="App">{isLoading ? <Loading /> : posts.length > 0 ? <Post post={posts[currentIndex]} onNextPost={handleNextPost} userid={user ? user.id : null} /> : <div>No posts available</div>}</div>
			</main>
		</div>
	);
};

export default Homepage;
