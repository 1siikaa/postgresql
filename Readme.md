# PostgreSQL Features
```yml
.) Object-relational database management system.
.) Modern 
.) Open-source
.) Robust 
.) High performance
.) Complex SQL queries
.) SQL Sub-selects
.) Foreign keys
.) Trigger
.) Views
.) Transactions
.) Multiversion concurrency control (MVCC)
.) Streaming Replication 
.) Hot Standby
.) Data types
.) Functions
.) Operators
.) Aggregate functions
.) Index methods
```


## PostgreSQL 
```yml
(FATHER OF POSTGRES : Michael Stonebraker.)
Postgres or Postgresql is a sql type of relational database. And PostgreSQL uses sql language to allow us to work with database for
data manipulation and for other crud operations. ( It has more than 15 years of active development )
```

## SQL 
```yml
SQL is a  Stuructured Query Language is a programming language which contains different sql commands such as SELECT , FROM , INSERT ,
UPDATE , DELETE , LIKE , COUNT, GROUP BY , ORDER BY , WHERE, INNER JOIN , OUTER JOIN , etc. Sql allows us to manage data in a relational database. It is a case insensitive language. 
SELECT column_name FROM table_name;
eg: SELECT firstName FROM person;
```

## Relational Database 
```yml
It is simply a relation between one or more tables. So this is how data might be structured .
```


# PostgreSQL Shell Commands (psql)
```yml
.) If I  wanna conform that I am connected after using password : \conninfo
.) To see the existing databases : \l
.) To create a new database : CREATE DATABASE database_name;
.) Message for successful database creation : CREATE DATABASE
.) To Connect to a database : \c database_name
.) To clear the screen : \! cls (windows only)
.) To create a table : CREATE TABLE table_name(
    ID SERIAL PRIMARY KEY, (serial autoincrements the id)
    name  VARCHAR(255),
    email VARCHAR(255),
    age INT,
    dob DATE
);
.) Message for successful table creation : CREATE TABLE
.) To display all existing table : \dt
Postgress will automatically sets the id if we are adding a new row to the table.
.) TO insert a new entry : INSERT INTO table_name (name, email, age, dob) 
                        VALUES('John', 'john@example.com', 48, '2000-09-04'), ('Joe', 'joe@example.com', 28, '2001-09-04')

.) Message for successful insertion : INSERT 0 2
.) Then we can start querying the database.
.) To view only table columns : \d+ table_name
.) To view a specific table : \d table_name
.) To modify an existing table : ALTER TABLE table_name
                                .) Add a new column: ALTER TABLE table_name 
                                                     ADD COLUMN newcolumn VARCHAR(255);
                                .) Rename a column : ALTER TABLE table_name 
                                                     RENAME COLUMN newcolumn TO oldcolumn;
                                .) Change the datatype of a column: ALTER TABLE table_name 
                                                                    ALTER COLUMN newcolumn TYPE VARCHAR(100);
                                .) Add a constraint: ALTER TABLE table_name
                                                     ADD CONSTRAINT myconstraint CHECK (mycolumn >0);
.) To delete an existing table: DROP TABLE table_name;   
.) TO delete a table only if it exists : DROP TABLE IF EXISTS table_name; 
.) To delete multiple tables : DROP TABLE table1, table2, table3;

 
```

# PostgreSQL Model 

## Table creation 1
CREATE TABLE datatypes( ID SERIAL PRIMARY KEY,
practice(# number BIGINT,
practice(# name VARCHAR(255),
practice(# middlename CHAR(255),
practice(# message TEXT,
practice(# status BOOLEAN,
practice(# str TEXT[]);

## Table creation 2 including enum values
 CREATE TYPE week AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');
CREATE TYPE
practice=# CREATE TABLE OTHERdatatypes( ID SERIAL PRIMARY KEY,
practice(# week week);


## Table creation 3 including foreign key

### CUSTOMER TABLE
CREATE TABLE Customers( customer_id INT PRIMARY KEY,
practice(# name VARCHAR(50),
practice(# email VARCHAR(50));
CREATE TABLE

### ORDER TABLE
practice=# CREATE TABLE Orders(
practice(# order_id INT PRIMARY KEY,
practice(# customer_id INT,
practice(# order_date DATE,
practice(# FOREIGN KEY (customer_id) REFERENCES Customers(customer_id));
CREATE TABLE









# Important 
```YML
Using psql, you can generate a complete list of commands by using the \help or \h command. For the syntax of a specific command, use the following command −--->  \help <command_name>
```



