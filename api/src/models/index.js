const dotenv = require('dotenv');
const Sequelize = require("sequelize");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DATABASE_URL,
 
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.user_pick_cttp = require("../models/cttp_pick.model.js")(sequelize, Sequelize);
db.user_rabbitcards = require("../models/user_rabbitcard.model.js")(sequelize, Sequelize);
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];
module.exports = db;