CREATE TABLE User (
    id SERIAL PRIMARY KEY,
    firstName VARCHAR(255),
    lastName VARCHAR(255),
    email VARCHAR(255),
    password VARCHAR(255),
    picturePath VARCHAR(255),
    location VARCHAR(255),
    occupation VARCHAR(255),
    viewedProfile INT,
    impressions INT
);

CREATE TABLE Post (
    id SERIAL PRIMARY KEY,
    userRef INT REFERENCES User(id),
    location VARCHAR(255),
    description TEXT,
    userPicturePath VARCHAR(255),
    picturePath VARCHAR(255)
);

CREATE TABLE Friend (
    id SERIAL PRIMARY KEY,
    userId INT REFERENCES User(id),
    friendId INT REFERENCES User(id)
);

CREATE TABLE "Like" (
    id SERIAL PRIMARY KEY,
    postId INT REFERENCES Post(id),
    userId INT REFERENCES User(id)
);

CREATE TABLE Comment (
    id SERIAL PRIMARY KEY,
    postId INT REFERENCES Post(id),
    userId INT REFERENCES User(id),
    commentText TEXT,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
