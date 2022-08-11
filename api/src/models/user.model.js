module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("users", {
      email: {
        type: Sequelize.STRING
      },
      password: {
        type: Sequelize.STRING
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      reset_password_token: {
        type: Sequelize.STRING
      },
      device_token : {
        type: Sequelize.STRING,
      },
      sign_flag : {
        type: Sequelize.BOOLEAN,
      },
    });
  
    return User;
  };