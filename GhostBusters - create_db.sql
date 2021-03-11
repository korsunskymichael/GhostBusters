DROP SCHEMA IF EXISTS GhostBusters;
CREATE SCHEMA GhostBusters;
USE GhostBusters;

 -- ================== Lecturers ================== 
drop table if exists todo;
CREATE TABLE todo (
	todo_id int primary key AUTO_INCREMENT,
    assignee varchar(50) default null,
    description varchar(500) default null,
    finish_date datetime default null,
    complete tinyint not null default '0'
);
-- insert values
insert into todo (assignee, description, finish_date)
values ("Peter Venkman",'fight Gozer The Gozerian','2020-05-04'),
		('Ray Stantz','buy a pizza', '2020-03-24'),
		("Egon Spengler",'fix the car', '2020-04-04'),
		( 'Winston Zeddemore', 'study Sumerian culture', '2020-05-02');
        
select todo_id, assignee, description, date(finish_date) as finish_date, if(complete=0, "False", "True") as complete from todo;    
INSERT INTO todo (assignee, description, finish_date) VALUES ('Dana Barrett', 'fgfgfggf', '20-03-2021');
DELETE FROM todo WHERE assignee="Dana Barrett";
