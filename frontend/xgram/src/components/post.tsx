import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {LikeData, PostData} from "../types/posttypes";

interface PostProps {
	post: PostData;
	onNextPost: () => void;
	userid: number | null;
}

const Post: React.FC<PostProps> = ({post, onNextPost, userid}) => {
	const [likes, setLikes] = useState<LikeData[]>([]);
	useEffect(() => {
		const fetchLikeData = async () => {
			try {
				const response = await fetch(`http://localhost:8080/posts/${post.id}/likes`, {
					mode: "cors"
				});
				if (response.ok) {
					const data: LikeData[] = await response.json();
					setLikes(data || []);
				} else {
					console.error("Error fetching likes data:", response.statusText);
					toast.error("Error cargando los posts");
					setLikes([]);
				}
			} catch (error) {
				console.error("Error fetching likes data:", error);
				setLikes([]);
			}
		};

		fetchLikeData();
	}, [post.id]);

	const handleCreateLike = async () => {
		try {
			const response = await fetch("http://localhost:8080/likes", {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify({postId: post.id, userId: userid})
			});
			if (response.ok) {
				const newLike: LikeData = await response.json();
				setLikes(prevLikes => [...prevLikes, newLike]);
				toast.success("Like dado correctamente");
			} else {
				console.log("like ya dado");
			}
		} catch (error) {
			console.error("Error creando el like:", error);
			toast.error("Error creando el like");
		}
	};

	return (
		<main className="">
			<div className="border lg:min-w-[700px] lg:max-w-[700px] bg-white mt-6 rounded-2xl p-4">
				<div className="flex items-center justify-between">
					<div className="gap-3.5 flex items-center">
						<img src={post.userpicturepath} className="object-cover bg-yellow-500 rounded-full w-10 h-10" alt="user" />
						<div className="flex flex-col">
							<b className="mb-2 capitalize">{post.username}</b>
							<time dateTime="06-08-21" className="text-gray-400 text-xs">
								{post.location}
							</time>
						</div>
					</div>
					<div className="bg-gray-100 rounded-full h-3.5 flex items-center justify-center">
						<button
							className="h-[28px] ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
						disabled:pointer-events-none disabled:opacity-50 bg-primary hover:bg-primary/90 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full text-sm font-medium
						 text-white bg-gradient-to-l from-blue-500 to-purple-600 shadow-lg hover:from-purple-500 hover:to-blue-600 mt-[-20px]">
							Follow
						</button>
					</div>
				</div>
				<div className="whitespace-pre-wrap mt-7">{post.description}</div>

				<div className="h-16 border-b flex items-center justify-around">
					<div className="flex items-center gap-3">
						<svg width="20px" height="19px" viewBox="0 0 20 19" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
							<g id="?-Social-Media" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								<g id="Square_Timeline" transform="translate(-312.000000, -746.000000)">
									<g id="Post-1" transform="translate(280.000000, 227.000000)">
										<g id="Post-Action" transform="translate(0.000000, 495.000000)">
											<g transform="translate(30.000000, 21.000000)" id="Comment">
												<g>
													<g id="ic_comment-Component/icon/ic_comment">
														<g id="Comments">
															<polygon id="Path" points="0 0 24 0 24 25 0 25"></polygon>
															<g id="iconspace_Chat-3_25px" transform="translate(2.000000, 3.000000)" fill="#92929D">
																<path d="M10.5139395,15.2840977 L6.06545155,18.6848361 C5.05870104,19.4544672 3.61004168,18.735539 3.60795568,17.4701239 L3.60413773,15.1540669 C1.53288019,14.6559967 0,12.7858138 0,10.5640427 L0,4.72005508 C0,2.11409332 2.10603901,0 4.70588235,0 L15.2941176,0 C17.893961,0 20,2.11409332 20,4.72005508 L20,10.5640427 C20,13.1700044 17.893961,15.2840977 15.2941176,15.2840977 L10.5139395,15.2840977 Z M5.60638935,16.5183044 L9.56815664,13.4896497 C9.74255213,13.3563295 9.955971,13.2840977 10.1754888,13.2840977 L15.2941176,13.2840977 C16.7876789,13.2840977 18,12.0671403 18,10.5640427 L18,4.72005508 C18,3.21695746 16.7876789,2 15.2941176,2 L4.70588235,2 C3.21232108,2 2,3.21695746 2,4.72005508 L2,10.5640427 C2,12.0388485 3.1690612,13.2429664 4.6301335,13.28306 C5.17089106,13.297899 5.60180952,13.7400748 5.60270128,14.2810352 L5.60638935,16.5183044 Z" id="Path"></path>
															</g>
														</g>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</g>
						</svg>
						<div className="text-sm">{post.commentscount} Comments</div>
					</div>
					<div className="flex items-center gap-3">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" viewBox="0 0 20 20" fill="currentColor">
							<path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
						</svg>
						<div className="text-sm">{likes.length} Likes</div>
					</div>
					<div className="flex items-center gap-3">
						<svg width="17px" height="22px" viewBox="0 0 17 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
							<g id="?-Social-Media" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
								<g id="Square_Timeline" transform="translate(-787.000000, -745.000000)">
									<g id="Post-1" transform="translate(280.000000, 227.000000)">
										<g id="Post-Action" transform="translate(0.000000, 495.000000)">
											<g transform="translate(30.000000, 21.000000)" id="Saved">
												<g transform="translate(473.000000, 1.000000)">
													<g id="ic_Saved-Component/icon/ic_Saved">
														<g id="Saved">
															<circle id="Oval" cx="12" cy="12" r="12"></circle>
															<g id="Group-13-Copy" transform="translate(5.000000, 2.000000)" fill="#92929D">
																<path d="M2.85714286,-0.952380952 L12.1428571,-0.952380952 C14.246799,-0.952380952 15.952381,0.753200953 15.952381,2.85714286 L15.952381,18.2119141 C15.952381,19.263885 15.09959,20.116746 14.047619,20.116746 C13.6150601,20.116746 13.1953831,19.9694461 12.8576286,19.6992071 L7.5,15.4125421 L2.14237143,19.6992071 C1.32096217,20.3564207 0.122301512,20.2233138 -0.534912082,19.4019046 C-0.805151112,19.0641501 -0.952380952,18.644473 -0.952380952,18.2119141 L-0.952380952,2.85714286 C-0.952380952,0.753200953 0.753200953,-0.952380952 2.85714286,-0.952380952 Z M2.85714286,0.952380952 C1.80517191,0.952380952 0.952380952,1.80517191 0.952380952,2.85714286 L0.952380952,18.2119141 L6.31000952,13.9252491 C7.00569973,13.3686239 7.99430027,13.3686239 8.68999048,13.9252491 L14.047619,18.2119141 L14.047619,2.85714286 C14.047619,1.80517191 13.1948281,0.952380952 12.1428571,0.952380952 L2.85714286,0.952380952 Z" />
															</g>
														</g>
													</g>
												</g>
											</g>
										</g>
									</g>
								</g>
							</g>
						</svg>
						<div className="text-sm">Saved</div>
					</div>
				</div>
				<div className="flex items-center justify-between mt-4">
					<img src={post.userpicturepath} className="bg-yellow-500 rounded-full w-10 h-10 object-cover border" alt="user" />
					<div className="flex items-center justify-between bg-gray-50 h-11 w-11/12 border rounded-2xl overflow-hidden px-4">
						<input type="text" className="h-full w-full bg-gray-50 outline-none" placeholder="Write your comment..." name="comment" />
					</div>
				</div>

				<div className="flex items-center justify-around mt-4">
					<div className="w-8 h-8" onClick={onNextPost}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-red-500">
							<path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
						</svg>
					</div>
					<button
						className="w-8 h-8"
						onClick={() => {
							onNextPost();
							handleCreateLike();
						}}>
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 hover:text-green-500">
							<path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
						</svg>
					</button>
				</div>
			</div>
		</main>
	);
};

export default Post;
