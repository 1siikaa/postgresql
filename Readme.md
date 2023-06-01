# Sequelize-cli

npm install --save-dev sequelize-cli
npx sequelize-cli init
*  --attributes name:string,email:string,age:integer,dob:date
* npx sequelize-cli db:migrate
npx sequelinpx sequelize-cli model:generate --name Userze-cli db:migrate:undo
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-filename.js
* npx sequelize-cli db:migrate:undo: --name XXXXXXXXXXXXXX-create-filename.js
npx sequelize-cli db:migrate:status    // for checking up down status //
ALTER SEQUENCE "Students_id_seq" RESTART WITH 1;
TRUNCATE TABLE your_table_name;
TRUNCATE TABLE Classes CASCADE;
TRUNCATE TABLE "Students", "Classes";
Access Key : AKIAVB6DAJPO65YQGGWU
Secret Access Key : nvnedMR8zryqEzAi8pmxhORqulXqOcJcQVkx7A6R







'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Students', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: Sequelize.STRING,
  email : Sequelize.STRING,
  age: Sequelize.INTEGER,
  dob: Sequelize.DATE,

  isDeleted:{
  type:Sequelize.BOOLEAN
  }
      
}, {
    paranoid:true,
    timestamps: true,
});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Students');
  }
};



// class
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Classes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      
}, {
    paranoid:true,
    timestamps: true,
});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Classes');
  }
};




'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Students', 'classId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: "Classes",
        key: "id",
    }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Students', 'classId', {
      type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Classes",
          key: "id",
      }
    });
  },
};