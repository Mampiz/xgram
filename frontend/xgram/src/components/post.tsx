import React, {useEffect, useState} from "react";
import {toast} from "react-toastify";
import {LikeData, PostData} from "../types/posttypes";

interface PostProps {
	post: PostData;
	onNextPost: () => void;
	userid: string | null;
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
			<div className="border lg:min-w-[700px] lg:max-w-[700px] bg-white rounded-2xl p-4">
				<div className="flex items-center justify-between">
					<div className="gap-3.5 flex items-center">
						<img src={post.userpicturepath} className="object-cover bg-white rounded-full w-10 h-10 border" alt="user" />
						<div className="flex flex-col">
							<b className="capitalize">{post.username}</b>
							<time dateTime="06-08-21" className="text-gray-400 text-xs">
								{post.location}
							</time>
						</div>
					</div>
					<div className="bg-gray-100 rounded-full h-3.5 flex items-center justify-center">
						<button
							className="h-[28px] ring-offset-background transition-colors focus-visible:outline-none bg-[#ffb066] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 
						disabled:pointer-events-none disabled:opacity-50 inline-flex items-center justify-center px-6 py-2 border-0 rounded-full text-sm font-medium
						 text-white mt-[-20px] hover:bg-[#ffcb7d]">
							Follow
						</button>
					</div>
				</div>
				<div className="whitespace-pre-wrap mt-7 break-words">{post.description}</div>

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
					<img src={post.userpicturepath} className="bg-white rounded-full w-10 h-10 object-cover border" alt="user" />
					<div className="flex items-center justify-between bg-gray-50 h-11 w-11/12 border rounded-2xl overflow-hidden px-4">
						<input type="text" className="h-full w-full bg-gray-50 outline-none" placeholder="Write your comment..." name="comment" />
					</div>
				</div>

				<div className="flex items-center justify-around mt-4">
					<button className="w-8 h-8" onClick={onNextPost}>
						<span className="flex h-min w-min space-x-1 items-center rounded-full text-gray-600 hover:text-black py-1 px-2 text-xs font-medium">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
								<path d="M15.73 5.5h1.035A7.465 7.465 0 0 1 18 9.625a7.465 7.465 0 0 1-1.235 4.125h-.148c-.806 0-1.534.446-2.031 1.08a9.04 9.04 0 0 1-2.861 2.4c-.723.384-1.35.956-1.653 1.715a4.499 4.499 0 0 0-.322 1.672v.633A.75.75 0 0 1 9 22a2.25 2.25 0 0 1-2.25-2.25c0-1.152.26-2.243.723-3.218.266-.558-.107-1.282-.725-1.282H3.622c-1.026 0-1.945-.694-2.054-1.715A12.137 12.137 0 0 1 1.5 12.25c0-2.848.992-5.464 2.649-7.521C4.537 4.247 5.136 4 5.754 4H9.77a4.5 4.5 0 0 1 1.423.23l3.114 1.04a4.5 4.5 0 0 0 1.423.23ZM21.669 14.023c.536-1.362.831-2.845.831-4.398 0-1.22-.182-2.398-.52-3.507-.26-.85-1.084-1.368-1.973-1.368H19.1c-.445 0-.72.498-.523.898.591 1.2.924 2.55.924 3.977a8.958 8.958 0 0 1-1.302 4.666c-.245.403.028.959.5.959h1.053c.832 0 1.612-.453 1.918-1.227Z" />
							</svg>
						</span>
					</button>
					<div
						onClick={() => {
							onNextPost();
							handleCreateLike();
						}}
						className="flex items-center px-6">
						<button className="cursor-pointer">
							<span
								className="flex h-min w-min space-x-1 items-center rounded-full text-[#429e9e] hover:bg-[#c5e8de] py-1 px-2 text-xs font-medium">
								<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 fill-current hover:text-[#429e9e]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
								</svg>
								<p className="font-semibold text-xs">{likes.length}</p>
							</span>
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

export default Post;
