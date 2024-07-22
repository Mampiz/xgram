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
VALUES ('mampi', 'mampi', 'mampi', 'mampi@example.com', 'mampi', '/path/to/picture', 'Yugoslavia', 10, 100, '/path/to/image');

INSERT INTO users (username, firstName, lastName, email, password, picturePath, location, viewedProfile, impressions, image_url)
VALUES ('erich', 'erich', 'erich', 'erich@example.com', 'erich', '/path/to/picture', 'Sexo', 10, 100, '/path/to/image');

DO $$ 
DECLARE
    user_id UUID;
BEGIN
    SELECT id INTO user_id FROM users WHERE username = 'erich';

    INSERT INTO posts (userRef, location, description, userPicturePath, picturePath, likesCount, commentsCount)
    VALUES (
        user_id,
        'Gibraltar, España',
        '¿Te jode que sea un fuckboy? Pues no es mi problema *tiro mi cigarro y lo piso para apagarlo aunque nunca lo encendí*. Estoy jodido, lo sé, tengo mierda en la cabeza y me gusta engañar a las chicas, enamorarlas, coger con ellas y luego bloquearlas de mis contactos, es lo que yo hago *miro a otro lado con poco interés* No podrás cambiarme aunque quieras, nena *me paro frente tuyo y me muerdo el labio*, así que....no te enamores de mí, porque te follaré y luego me iré, porque soy un fuckboy *empiezo a caminar lejos de ti*, por cierto... fumo y drogo, también ando en skate, no soy tu príncipe azul *salgo caminando como todo un fuckboy',
        '/path/to/user/picture',
        '/path/to/post/picture',
        0,
        0
    );

	INSERT INTO posts (userRef, location, description, userPicturePath, picturePath, likesCount, commentsCount)
    VALUES (
        user_id,
        'Andorra',
        '¿Sexo? Querrás decir nexo, el objetivo primario en cada mapa. Para ganar una partida, un equipo debe destruir el Nexo del equipo enemigo.En cada modo, el Nexo es lo que da a los invocadores el control sobre sus campeones.',
        '/path/to/user/picture',
        '/path/to/post/picture',
        0,
        0
    );
END $$;
