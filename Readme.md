# PostgreSQL Features
.) Object-relational database management system.
.) Modern 
.) Open-source
.) Robust 
.) High performance


## PostgreSQL 
```yml
Postgres or Postgresql is a sql type of relational database. And PostgreSQL uses sql language to allow us to work with database for
data manipulation and for other crud operations. ( In 30+ Active Development )
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
.) To display table : \dt
Postgress will automatically sets the id if we are adding a new row to the table.
.) TO insert a new entry : INSERT INTO table_name (name, email, age, dob) 
                        VALUES('John', 'john@example.com', 48, '2000-09-04'), ('Joe', 'joe@example.com', 28, '2001-09-04')

.) Message for successful insertion : INSERT 0 2
.) Then we can start querying the database.
```






# PostgreSQL Model 






# Important 





