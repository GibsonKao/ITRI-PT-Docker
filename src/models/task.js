module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    target: DataTypes.STRING,
    scanner: DataTypes.STRING(64),
    status: DataTypes.STRING(12),
    argv: DataTypes.STRING,
    rawdata: DataTypes.TEXT
  }, {})
  Task.associate = function (models) {
    // associations can be defined here
  }
  Task.sync().then(() => {
    // Table created
  })
  return Task
}
