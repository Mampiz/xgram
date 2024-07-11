export interface PostData {
	id: number;
	userRef: number;
	location: string;
	description: string;
	userpicturepath: string;
	picturepath?: string;
	likesCount: number;
	commentsCount: number;
	username: string;
}
