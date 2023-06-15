# Sequelize-cli

npm install --save-dev sequelize-cli
npx sequelize-cli init
*  --attributes name:string,email:string,age:integer,dob:date
* npx sequelize-cli db:migrate
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


// get one or more topper of a class
// get topper of class vise
// apply rank function to get the class toppers
// removes * field
// read about query performance and writing query in a good manner
// read more about sql query and event loop
// max and having statements


