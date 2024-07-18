CREATE TABLE users (
    id SERIAL PRIMARY KEY,
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
    userRef INT REFERENCES users(id),
    location VARCHAR(255),
    description TEXT,
    userPicturePath VARCHAR(255),
    picturePath VARCHAR(255),
    likesCount INT DEFAULT 0,       
    commentsCount INT DEFAULT 0     
);

CREATE TABLE friends (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES users(id),
    friendId INT REFERENCES users(id)
);

CREATE TABLE likes (
    id SERIAL PRIMARY KEY,
    postId INT REFERENCES posts(id),
    userId INT REFERENCES users(id),
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    postId INT REFERENCES posts(id),
    userId INT REFERENCES users(id),
    commentText TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (username, firstName, lastName, email, password, picturePath, location, viewedProfile, impressions)
VALUES ('Mampiz', 'Josep', 'Mampel', 'sexo@example.com', 'password123', 'path/to/picture.jpg', 'Andorra', 0, 0);

INSERT INTO posts (userRef, location, description, userPicturePath, picturePath)
VALUES (1, 'Epsevg', 'Me corro o dios!', 'https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradiolos40/YINZZYSQQBPPTA7VSNNQ7W6OA4.jpg
', 'path/to/post/picture.jpg');


INSERT INTO posts (userRef, location, description, userPicturePath, picturePath)
VALUES (1, 'Yugoslavia', 'Soy messi!', 'https://cloudfront-eu-central-1.images.arcpublishing.com/prisaradiolos40/YINZZYSQQBPPTA7VSNNQ7W6OA4.jpg
', 'path/to/post/picture.jpg');
