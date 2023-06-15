module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('Marks', 'classId',{
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
      model: "Classes",
      key: "id",
  }})
  },

  down : async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('Marks', 'classId')

}
}
