export interface PostData {
	id: number;
	userref: number;
	location: string;
	description: string;
	userpicturepath: string;
	picturepath?: string;
	likescount: number;
	commentscount: number;
	username: string;
}


export interface LikeData {
	id: number;
	postId: number;
	userId: number;
	createdAt: Date;
  }
  