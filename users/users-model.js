const db = require("../database/db-config");

function find() {
  return db("users as u")
    .join("departments as d", "u.department", "d.id")
    .select("u.username", "d.name");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  try {
    // db("users").insert() returns an array with an id
    // therefore we assign the value thru array destructuring
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (err) {
    throw err;
  }
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

module.exports = {
  find,
  findBy,
  add,
  findById
};
