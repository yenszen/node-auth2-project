const router = require("express").Router();

const Users = require("./users-model");
const restricted = require("../auth/restricted-middleware");
const checkDept = require("../auth/check-dept-middleware");

router.get("/", restricted, checkDept(1), (req, res) => {
  Users.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "Database error" });
    });
});

module.exports = router;
