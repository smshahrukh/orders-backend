
const UserSchema = (sequelize, Sequelize) => {
    const { DataTypes } = Sequelize
    const { STRING, BOOLEAN } = DataTypes
  
  const User = sequelize.define('user', { 
    username: {
        type: STRING,
        allowNull: false
      },
    password: {
        type: STRING
    },
    isAdmin: {
        type: BOOLEAN
    }
  })

  return { User }

}

module.exports = UserSchema;