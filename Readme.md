# Sequelize-cli

npm install --save-dev sequelize-cli
npx sequelize-cli init
*  --attributes name:string,email:string,age:integer,dob:date
* npx sequelize-cli db:migrate // up 
* npx sequelize-cli db:migrate:undo // down

npx sequelize-cli model:generate --name Userze-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-filename.js
* npx sequelize-cli db:migrate:undo: --name XXXXXXXXXXXXXX-create-filename.js
npx sequelize-cli db:migrate:status    // for checking up down status //
ALTER SEQUENCE "Students_id_seq" RESTART WITH 1;
TRUNCATE TABLE your_table_name;
TRUNCATE TABLE Classes CASCADE; // preferred
TRUNCATE TABLE "Students", "Classes"
CASCADE : In PostgreSQL, the term "CASCADE" refers to a referential action that can be specified when defining foreign key constraints between database tables.
When a foreign key constraint is created with the CASCADE option, it means that if a row in the referenced table is deleted or updated, the corresponding rows in the referencing table will also be deleted or updated automatically.
The CASCADE option ensures that the integrity of the data is maintained by propagating the changes made to the referenced table to the referencing tables. This helps to maintain consistency and avoid orphaned records in the database.
// Set this to true if you don't have a model definition for your query. raw: true, // Raw data as JavaScript objects or arrays as it is stored in the database // default: false
// Set this to true if if you want to fetch only one record from the database. plain: true, // default value : false
// set type :  you can pass in a query type to tell sequelize how to format the results. (avoid metadata)

// belongs to : represents a one-to-one or many-to-one relationship, where a record belongs to a single record in another table. 
// hasMany : represents a one-to-many relationship, where a record can have multiple related records in another table.


// read about query performance and writing query in a good manner
// read more about sql query and event loop
// max and having statements
// git branching and ssh keys
// read more about git and github
//event loop  promise , external call, event loop stages,  setInterval, clearInterval, macrotask queue and microtask queue , promise-chaining, async await, callback function, callback hell



## GIT AND GITHUB --------------------------------------------------------------------------------------------

 GIT BASH VERSION CONTROL SYSTEM (Distributed Version Control System)  
 WHAT IS GIT ---- Git has been designed with performance, security and flexibility in mind.
 Committing new changes, branching, merging and comparing past versions are all optimized for performance.

 GIT CLONE / GIT INIT ----------- However, git clone is dependent on git init. git clone is used to create a copy of an existing repository. Internally, git clone first calls git init to create a new repository. It then copies the data from the existing repository, and checks out a new set of working files. 

 git init <directory>
 git init --bare <directory>
 ssh <user>@<host> cd path/above/repo git init --bare my-project.git
 git init <directory> --template=<template_directory
 git clone <repo> <directory>
 git clone --branch <tag> <repo>
 Git URL protocols
-SSH
Secure Shell (SSH) is a ubiquitous authenticated network protocol that is commonly configured by default on most servers. Because SSH is an authenticated protocol, you'll need to establish credentials with the hosting server before connecting. ssh://[user@]host.xz[:port]/path/to/repo.git/

Use git checkout to move around and review the commit history
git revert is the best tool for undoing shared public changes
git reset is best used for undoing local private changes


delimiter or dollar-quoting syntax $$ : a character that marks the beginning or end of a unit of data $$ --------------------   For example, $$test$$, $example$, or $delimiter$ are all valid dollar-quoting delimiters.

:: - This is the type cast operator in PostgreSQL. It allows you to explicitly convert a value to a specific data type. For example, 123::text converts the integer value 123 to the text type.

:= - This is the assignment operator in PostgreSQL. It is used to assign a value to a variable or a column in an UPDATE statement. For example, my_variable := 10 assigns the value 10 to the variable my_variable.











