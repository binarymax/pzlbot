USE pzlbot;

CREATE TABLE IF NOT EXISTS types (
	id INT NOT NULL,
	name VARCHAR(255) CHARACTER SET utf8 NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS difficulties (
	id INT NOT NULL,
	name VARCHAR(255) CHARACTER SET utf8 NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS puzzles (
	id INT NOT NULL AUTO_INCREMENT,
	type INT NOT NULL,
	difficulty INT NOT NULL,
	problem VARCHAR(1024) CHARACTER SET utf8 NOT NULL,
	solution VARCHAR(1024) CHARACTER SET utf8 NOT NULL,
	puzzledate TIMESTAMP NOT NULL,
	PRIMARY KEY (id),
 	CONSTRAINT fk_puzzle_types FOREIGN KEY (type) REFERENCES types(id),	
	CONSTRAINT fk_puzzle_difficulties FOREIGN KEY (difficulty) REFERENCES difficulties(id)
);

INSERT INTO types(id,name) VALUES(1,'chess');
INSERT INTO types(id,name) VALUES(2,'jumble');
INSERT INTO types(id,name) VALUES(3,'arithmetic');

INSERT INTO difficulties(id,name) VALUES(1,'easy');
INSERT INTO difficulties(id,name) VALUES(2,'medium');
INSERT INTO difficulties(id,name) VALUES(3,'hard');
INSERT INTO difficulties(id,name) VALUES(4,'bonus');