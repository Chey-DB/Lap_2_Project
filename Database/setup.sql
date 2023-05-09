DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS tokens;
DROP TABLE IF EXISTS user_accounts;

CREATE TABLE skills (
    skill_id INT GENERATED ALWAYS AS IDENTITY,
    title VARCHAR (100) NOT NULL,
    description VARCHAR (500) NOT NULL,
    location VARCHAR (100) NOT NULL,
    PRIMARY KEY (skill_id)
    FOREIGN KEY (user_id) REFERENCES user_accounts("user_id")
);

CREATE TABLE user_accounts (
    user_id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(30) UNIQUE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password CHAR(60) NOT NULL,
    PRIMARY KEY (user_id)
);

CREATE TABLE tokens (
    token_id INT GENERATED ALWAYS AS IDENTITY,
    user_id INT NOT NULL,
    token CHAR(36) UNIQUE NOT NULL,
    PRIMARY KEY (token_id),
    FOREIGN KEY (user_id) REFERENCES user_accounts("user_id")
);

-- INSERT INTO Skill VALUES (1,'Carpentry','Carpentry is a skilled trade and a craft in which the primary work performed is the cutting, shaping and installation of building materials during the construction of buildings, ships, timber bridges, concrete formwork,','Construction', 'Florin Close, Coventry, West Midlands, CV4');
