-- Run the following command to open PostgreSQL: psql -U <username>
-- Then enter the password for the user

-- To run this script inside psql, enter following at command line: \i <file-location>
-- ex. \i C:/Users/User/Desktop/dbscript.sql

-- NOTE: If user is not 'postgres', then change the OWNER below to the correct user
CREATE DATABASE apidemo OWNER = postgres;

\c apidemo;

CREATE TABLE student (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	email VARCHAR(100) UNIQUE
);

CREATE OR REPLACE FUNCTION getStudents()
RETURNS TABLE(j json) AS
$$
BEGIN
	RETURN QUERY
		SELECT to_json(student) 
		FROM student
		ORDER BY id ASC;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getStudentById(s_id INTEGER)
RETURNS TABLE(j json) AS
$$
BEGIN
	RETURN QUERY
		SELECT to_json(student)
		FROM student
		WHERE id = s_id;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getStudentByFirstName(s_fname VARCHAR)
RETURNS TABLE(j json) AS
$$
BEGIN
	RETURN QUERY
		SELECT to_json(student) 
		FROM student
		WHERE first_name = s_fname
		ORDER BY id ASC;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getStudentByLastName(s_lname VARCHAR)
RETURNS TABLE(j json) AS
$$
BEGIN
	RETURN QUERY
		SELECT to_json(student) 
		FROM student
		WHERE last_name = s_lname
		ORDER BY id ASC;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getStudentByFullName(s_fname VARCHAR, s_lname VARCHAR)
RETURNS TABLE(j json) AS
$$
BEGIN
	RETURN QUERY
		SELECT to_json(student) 
		FROM student
		WHERE first_name = s_fname
		AND last_name = s_lname
		ORDER BY id ASC;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION getStudentByEmail(s_email VARCHAR)
RETURNS TABLE(j json) AS
$$
BEGIN
	RETURN QUERY
		SELECT to_json(student) 
		FROM student
		WHERE email = s_email
		ORDER BY id ASC;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION addStudent(s_fname VARCHAR, s_lname VARCHAR, s_email VARCHAR)
RETURNS json AS
$$
DECLARE return_value student%ROWTYPE;
BEGIN
	INSERT INTO student (first_name, last_name, email)
	VALUES (s_fname, s_lname, s_email)
	ON CONFLICT (email)
	DO NOTHING
	RETURNING * INTO return_value;

	RETURN to_json(return_value);
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION updateStudent(s_id INTEGER, s_fname VARCHAR, s_lname VARCHAR, s_email VARCHAR)
RETURNS json AS
$$
DECLARE return_value student%ROWTYPE;
BEGIN
	INSERT INTO student (id, first_name, last_name, email)
	VALUES (s_id, s_fname, s_lname, s_email)
	ON CONFLICT (id)
	DO 
	UPDATE 
	SET id = s_id,
		first_name = s_fname,
		last_name = s_lname,
		email = s_email
	RETURNING * INTO return_value;

	RETURN to_json(return_value);
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION updateStudentName(s_newFirst VARCHAR, s_newLast VARCHAR, s_email VARCHAR)
RETURNS json AS
$$
DECLARE return_value student%ROWTYPE;
BEGIN
	UPDATE student
	SET first_name = s_newFirst,
		last_name = s_newLast
	WHERE email = s_email
	RETURNING * INTO return_value;
	
	RETURN to_json(return_value);
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION updateStudentEmail(s_oldEmail VARCHAR, s_newEmail VARCHAR)
RETURNS json AS
$$
DECLARE return_value student%ROWTYPE;
BEGIN
	UPDATE student
	SET email = s_newEmail
	WHERE email = s_oldEmail
	RETURNING * INTO return_value;
	
	RETURN to_json(return_value);
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION removeStudentById(s_id INTEGER)
RETURNS json AS
$$
DECLARE return_value student%ROWTYPE;
BEGIN 
	DELETE FROM student
	WHERE id = s_id
	RETURNING * INTO return_value;
	
	RETURN to_json(return_value);
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION removeStudentByEmail(s_email VARCHAR)
RETURNS json AS
$$
DECLARE return_value student%ROWTYPE;
BEGIN 
	DELETE FROM student
	WHERE email = s_email
	RETURNING * INTO return_value;
	
	RETURN to_json(return_value);
END;
$$
LANGUAGE 'plpgsql';

SELECT addStudent('John', 'Doe', 'johndoe@gmail.com');
SELECT addStudent('Mary', 'Sue', 'marysue@gmail.com');
SELECT addStudent('John', 'Smith', 'jsmith@gmail.com');