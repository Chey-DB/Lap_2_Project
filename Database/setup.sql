DROP TABLE IF EXISTS workshops;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS user_accounts;

CREATE TABLE user_accounts (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    image_data BYTEA,
    PRIMARY KEY (user_id)
);

CREATE TABLE workshops (
    workshop_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    description VARCHAR (500) NOT NULL,
    location VARCHAR (100) NOT NULL,
    date DATE NOT NULL,
    time TIME NOT NULL,
    image_data BYTEA,
    username VARCHAR(30) NOT NULL,
    PRIMARY KEY (workshop_id),
    FOREIGN KEY (username) REFERENCES user_accounts("username") ON DELETE CASCADE
);


CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_accounts("user_id")
);
