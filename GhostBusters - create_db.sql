DROP SCHEMA IF EXISTS ghostbusters;
CREATE SCHEMA ghostbusters;
USE GhostBusters;

 -- ================== todo ================== 
DROP TABLE if exists todo;
CREATE TABLE todo (
	todo_id int primary key AUTO_INCREMENT,
    assignee varchar(50) default null,
		FOREIGN KEY (assignee) REFERENCES assignees(assignee_name) on delete restrict on update cascade,
    description varchar(500) default null,
    finish_date varchar(10) default null,
    complete tinyint not null default '0'
);
-- insert values
INSERT INTO todo (assignee, description, finish_date)
VALUES ('Peter Venkman','Fight Gozer The Gozerian','2020-05-04'),
		('Raymond Stantz','Buy a pizza', '2020-03-24'),
		('Egon Spengler','Fix the car', '2020-04-04'),
		( 'Winston Zeddemore', 'Study Sumerian culture', '2020-05-02');

 -- ================== assignees ================== 
DROP TABLE if exists assigness;
CREATE TABLE assignees (
	assignee_name varchar(50) primary key
);
-- insert values
INSERT INTO assignees (assignee_name)
VALUES ('Peter Venkman'),
		('Raymond Stantz'),
        ('Egon Spengler'),
        ('Dana Barrett'),
        ('Louis Tully'),
		('Janine Melnitz'),
        ('Walter Peck'),
		( 'Winston Zeddemore');


        

