const bcrypt = require('bcrypt');

const User = require('../models/users');
const Token = require('../models/tokens');


async function register (req, res ) {
  const data = req.body;
  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS));
  data.password = await bcrypt.hash(data.password, salt);
  const result = await User.create(data);
  res.json(result);
}

async function login (req, res ) {
  const data = req.body;
  const user = await User.getOneByUsername(data.username);
  const autheniticated = await bcrypt.compare(data.password, user.password);
  if (!autheniticated) {
    throw new Error('Invalid credentials');
  } else {
    const token = await Token.create(user.user_id);
    res.status(200).json({
      success: true,
      autheniticated: true,
      token: token.token,
    });
  }

}

async function showAllUsers(req, res) {
  const users = await User.getAll();
  res.json(users);
}

module.exports = {
  register, login, showAllUsers
}
