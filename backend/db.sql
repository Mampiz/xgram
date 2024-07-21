CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4 (),
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
    id SERIAL PRIMARY KEY,
    userRef UUID REFERENCES users(id),
    location VARCHAR(255),
    description TEXT,
    userPicturePath VARCHAR(255),
    picturePath VARCHAR(255),
    likesCount INT DEFAULT 0,       
    commentsCount INT DEFAULT 0     
);

CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    userId UUID REFERENCES users(id),
    friendId UUID REFERENCES users(id)
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    postId INT REFERENCES posts(id),
    userId UUID REFERENCES users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    postId INT REFERENCES posts(id),
    userId UUID REFERENCES users(id),
    commentText TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, firstName, lastName, email, password, picturePath, location, viewedProfile, impressions)
VALUES ('Mampiz', 'Josep', 'Mampel', 'sexo@example.com', 'password123', 'path/to/picture.jpg', 'Andorra', 0, 0);

