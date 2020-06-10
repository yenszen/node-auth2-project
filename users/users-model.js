const db = require("../database/db-config");

function find() {
  return db("users").select("username", "department");
}

module.exports = {
  find
};
