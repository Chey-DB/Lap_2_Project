const bcrypt = require('bcrypt');

const User = require('../models/users');
const Token = require('../models/tokens');

async function register (req, res) {
  try {
      const data = req.body
      const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT_ROUNDS))
      data['password'] = await bcrypt.hash(data["password"], salt)
      const result = await User.create(data)
      res.status(201).json({
          success: true,
          result: result
      })

  } catch (err) {
      res.status(400).json({
          success: false,
          error: err
      })
  }
};

async function login (req, res) {
      const data = req.body
  try {
      const user = await User.getOneByUsername(data["username"])
      console.log(data["password"])
      // console.log(user["password"])
      const authenticated = await bcrypt.compare(data["password"], user["password"])
      if (!authenticated){
          throw new Error("Incorrect credentials")
      } else {
          const token = await Token.create(user["id"])
          console.log(token)
          res.status(200).json({
              success: true,
              authenticated: true,
              token: token.token
          })
      }
  } catch (err) {
      res.status(403).json({
          success: false,
          error: err
      })
      // console.log(err)
  }
}

async function viewProfile (req, res) {
  try {
      const user = await User.getById(req.params.id)
      res.status(200).json({
          success: true,
          result: user
      })

  } catch (err) {
      res.status(400).json({
          success: false,
          error: err
      })
  }
}

async function logout (req, res) {
  try {
      const token = req.headers["authorization"]
      const result = await Token.delete(token)
      res.status(200).json({
          success: true,
          result: result
      })

  } catch (err) {
      res.status(400).json({
          success: false,
          error: err
      })
  }
}

async function showAllUsers(req, res) {
    try {
        const users = await User.getAll();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = {
  register, login, viewProfile, logout, showAllUsers
}
