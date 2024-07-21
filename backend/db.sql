CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    username VARCHAR(255),
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    picturePath VARCHAR(255),
    location VARCHAR(255),
    viewedProfile INT,
    impressions INT,
	image_url VARCHAR(255)
);

CREATE TABLE posts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userRef UUID REFERENCES users(id),
    location VARCHAR(255),
    description TEXT,
    userPicturePath VARCHAR(255),
    picturePath VARCHAR(255),
    likesCount INT DEFAULT 0,       
    commentsCount INT DEFAULT 0     
);

CREATE TABLE friends (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    userId UUID REFERENCES users(id),
    friendId UUID REFERENCES users(id)
);

CREATE TABLE likes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    postId UUID REFERENCES posts(id),
    userId UUID REFERENCES users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    postId UUID REFERENCES posts(id),
    userId UUID REFERENCES users(id),
    commentText TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, firstName, lastName, email, password, picturePath, location, viewedProfile, impressions, image_url)
VALUES ('johndoe', 'John', 'Doe', 'john.doe@example.com', 'hashedpassword', '/path/to/picture', 'New York', 10, 100, '/path/to/image');
