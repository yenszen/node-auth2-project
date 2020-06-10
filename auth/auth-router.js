const bcrypt = require("bcryptjs");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets");

const Users = require("../users/users-model");
const { isValid } = require("../users/users-service");

router.post("/register", (req, res) => {
  const credentials = req.body;

  if (isValid(credentials)) {
    const rounds = process.env.BCRYPT_ROUNDS || 8;
    const hash = bcrypt.hashSync(credentials.password, rounds);
    credentials.password = hash;

    Users.add(credentials)
      .then(user => {
        res.status(201).json(user);
      })
      .catch(err => {
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password, and the password should be alphanumeric"
    });
  }
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (isValid(req.body)) {
    Users.findBy({ username })
      .then(([user]) => {
        // WHY USE ARRAY HERE?!
        if (user && bcrypt.compareSync(password, user.password)) {
          const token = generateToken(user);
          res.status(200).json({ message: "Welcome to our API", token });
        } else {
          res.status(401).json({ message: "Invalid credentials" });
        }
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({ message: err.message });
      });
  } else {
    res.status(400).json({
      message:
        "please provide username and password, and the password should be alphanumeric"
    });
  }
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    department: user.department
  };

  const options = {
    expiresIn: "1h"
  };

  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
