const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const StreamChat = require('stream-chat');

function login() {}

function signup(req, res) {
  try {
    const { fullName, username, password, phoneNumber } = req.body;
    const userID = crypto.randomBytes(16).toString('hex');
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e });
  }
}

module.exports = {
  login,
  signup,
};
