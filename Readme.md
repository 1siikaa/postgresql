# Sequelize-cli

npm install --save-dev sequelize-cli
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes name:string,email:string,age:integer,dob:date
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-filename.js
npx sequelize-cli db:migrate:undo: --name XXXXXXXXXXXXXX-create-filename.js
npx sequelize-cli db:migrate:status    // for checking up down status //


