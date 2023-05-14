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
.) User-defined types
.) Table inheritance
.) Sophisticated locking mechanism
.) Foreign key referential integrity
.) Views, rules, subquery
.) Nested transactions (savepoints)
.) Multi-version concurrency control (MVCC)
.) Asynchronous replication
.) Native Microsoft Windows Server version
.) Tablespaces
.) Point-in-time recovery
```

# Postgres Unique Features 

#### The multi-version concurrency control (MVCC) feature was first implemented by PostgreSQL.
#### Custom functions developed in languages like C/C++, Python, Java, etc can be added to PostgreSQL.
#### As PostgreSQL is designed to be extensible, one can define their own data types, index types, functional languages, etc.
#### If one intends to remove any part of the system, one can always develop a custom plugin to enhance it to meet their specific requirements.



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
.) For checking Postgres Version :  SELECT version();
.) If I  wanna conform that I am connected after using password : \conninfo
.) To see the existing databases : \l or \l+
.) To create a new database with deafult setting : CREATE DATABASE database_name;
.) To create a new database with custom setting : CREATE DATABASE database_name
                                                  OWNER =  role_name
                                                  TEMPLATE = template
                                                  ENCODING = encoding
                                                  LC_COLLATE = collate
                                                  LC_CTYPE = ctype
                                                  TABLESPACE = tablespace_name
                                                  CONNECTION LIMIT = max_concurrent_connection;
.) Message for successful database creation : CREATE DATABASE
.) To Connect to a database : \c database_name
.) Alter a existing database : Alter database_name action;
                               .) To rename a database : ALTER DATABASE old_database_name RENAME To new_database_name;
                               .) To change owner of a database : ALTER DATABASE database_name OWNER TO new_owner;
                               .) To change tablespace of the database : ALTER DATABASE database_name SET TABLESPACE new_tablespace_name;
                               .)   
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

Companies that are using Postgresql Apple, Fujitsu, Red Hat, Cisco, Juniper Network, etc.
```
# Data types are supported by PostgreSQL: 
  ##### Boolean
  ##### Character Types [ such as char, varchar, and text]
  ##### Numeric Types [ such as integer and floating-point number]
  ##### Temporal Types [ such as date, time, timestamp, and interval]
  ##### UUID [ for storing UUID (Universally Unique Identifiers) ]
  ##### Array [ for storing array strings, numbers, etc.]
  ##### JSON [ stores JSON data]
  ##### hstore [ stores key-value pair]
  ##### Special Types [ such as network address and geometric data]

  ```yml

1) Boolean : The “bool” or”boolean” keyword is used to initialize a Boolean data type. 
1, yes, y, t, true values are converted to true
0, no, false, f values are converted to false
space to null

2) Character Types [ such as char, varchar, and text] : .) CHAR(n) ..... is used for data(string) with a fixed-length of characters with padded spaces.  In case the length of the string is smaller than the value of “n”, then the rest of the remaining spaces are automatically padded. Similarly for a string with a length greater than the value of “n”,  PostgreSQL throws an error.
                                                        .) VARCHAR(n) ..... is the variable-length character string.Similar to CHAR(n), it can store “n” length data. But unlike CHAR(n) no padding is done in case the data length is smaller than the value of “n”.
                                                        .) TEXT ..... is the variable-length character string. It can store data with unlimited length.

3) 

  ```


