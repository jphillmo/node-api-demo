CREATE OR REPLACE FUNCTION get_student_by_id(s_id integer)
RETURNS table(j json) AS
$$
BEGIN
	RETURN QUERY
		SELECT to_json(student)
		FROM student
		WHERE id = s_id;
END;
$$
LANGUAGE 'plpgsql';

CREATE OR REPLACE FUNCTION remove_student_by_email(s_email text)
RETURNS json AS
$$
DECLARE return_value student%rowtype;
BEGIN 
	DELETE FROM student
	WHERE email = s_email
	RETURNING * INTO return_value;
	
	RETURN to_json(return_value);
END;
$$
LANGUAGE 'plpgsql';