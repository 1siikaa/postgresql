# Sequelize-cli

npm install --save-dev sequelize-cli
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes name:string,email:string,age:integer,dob:date
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate:undo