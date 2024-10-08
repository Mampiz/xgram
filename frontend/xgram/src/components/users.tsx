import {useEffect, useState} from "react";
import {PostData} from "../types/posttypes";
import {User} from "../types/usetypes";
import Xdasida from "./extra";
import Loading from "./loading";
import Post from "./post";
import Sidebar from "./sidebar";
import ProtectedRoute from "./protectedRoute";

interface HomePageProps {
	user: User | null;
}

const Homepage = ({user}: HomePageProps) => {
	const [posts, setPosts] = useState<PostData[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isLoading, setIsLoading] = useState(true);
	const [activeTab, setActiveTab] = useState("Swipe");

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
		<ProtectedRoute>
			<div className="flex h-screen w-screen">
				<div className="w-1/5 max-h-screen bg-[#8CCFC9]">
					<Sidebar user={user} />
				</div>
				<main className="flex-1 flex flex-col items-center justify-center bg-white min-h-screen w-2/5">
					<nav className="w-ful">
						<ul className="flex justify-center space-x-4 p-4 text-gray-400 font-bold text-lg">
							<li className={`cursor-pointer hover:text-black ${activeTab === "Swipe" ? "text-black " : ""}`} onClick={() => setActiveTab("Swipe")}>
								Swipe
							</li>
							<li className={`cursor-pointer hover:text-black ${activeTab === "Following" ? "text-black " : ""}`} onClick={() => setActiveTab("Following")}>
								Following
							</li>
						</ul>
					</nav>
					<div className="flex-1 flex items-center justify-center w-full p-4">
						<div className="App">{isLoading ? <Loading /> : posts.length > 0 ? <Post post={posts[currentIndex]} onNextPost={handleNextPost} userid={user ? user.id : null} /> : <div>No posts available</div>}</div>
					</div>
				</main>
				<div className="w-1/5 bg-white">
					<Xdasida />
				</div>
			</div>
		</ProtectedRoute>
		
	);
};

export default Homepage;
