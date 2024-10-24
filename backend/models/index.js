const sequelize = require("./db");
const {Sequelize} = require("sequelize");
const SUser = require("./User.models");
const SRole = require("./Role.model");
const Store = require("./store.models");

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.SUser = SUser;
db.SRole = SRole;
db.Store = Store;

// Association

// Association
// User & Role Associations
db.SUser.belongsToMany(db.SRole, { through: "User_SRoles" });
db.SRole.belongsToMany(db.SUser, { through: "User_SRoles" });

// User & Store Associations
db.SUser.hasMany(db.Store, { foreignKey: "adminId" });
db.Store.belongsTo(db.SUser, { foreignKey: "adminId" });


// initializeDatabase();
module.exports = db