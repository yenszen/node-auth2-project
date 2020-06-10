const express = require("express");
const db = require("./users-model");

const router = express.Router();

router.get("/", (req, res) => {
  db.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Database error" });
    });
});

module.exports = router;
