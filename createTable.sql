CREATE DATABASE bankinfo;
CREATE TABLE bankinfo.person (
	account_num varchar(10),
	first_name varchar(20),
	last_name varchar(20),
	PRIMARY KEY (account_num)
);
CREATE TABLE bankinfo.trans (
	account_type varchar(10) CHECK (account_type IN ("SAVINGS","CHECKING","CREDIT")),
	account_num varchar(10),
	ammount float,
	description varchar(255),
	transaction_date date,
	PRIMARY KEY (account_num,account_type,ammount,description,transaction_date),
	FOREIGN KEY (account_num) REFERENCES person (account_num)
)