export interface User {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	location: string;
	picturepath: string;
	password: string;
	impressions: number;
	viewedprofile: number;
}

export interface UserFriend {
	id: string;
	username: string;
	firstname: string;
	lastname: string;
	email: string;
	location: string;
	picturepath: string;
	impressions: number;
	viewedprofile: number;
	image_url: string;
}
