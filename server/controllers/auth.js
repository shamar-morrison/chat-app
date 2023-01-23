const { connect } = require('getstream');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const StreamChat = require('stream-chat');

const apiKey = process.env.STREAM_API_KEY;
const apiSecret = process.env.STREAM_API_SECRET;
const appID = process.env.STREAM_APP_ID;

/**
 * Login a user
 * @param {*} req - request object
 * @param {*} res - response object
 */
async function login(req, res) {
  try {
    const { username, password } = req.body;
    const serverClient = connect(apiKey, apiSecret, appID);
    const client = StreamChat.getInstance(apiKey, apiSecret);

    const { users } = await client.queryUsers({ name: username });
    if (!users.length) return res.status(400).json({ message: 'User not found' });

    const isLoginSuccessful = await bcrypt.compare(password, users[0].hashedPassword);
    const token = serverClient.createUserToken(users[0].id);

    if (!isLoginSuccessful) {
      res.status(500).json({ message: 'Incorrect password' });
    } else {
      res.status(200).json({ token, fullName: users[0].fullName, username, userID: users[0].id });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e });
  }
}

/**
 * Create a new user
 * @param {*} req - request object
 * @param {*} res - response object
 */
async function signup(req, res) {
  try {
    const { fullName, username, password, phoneNumber } = req.body;
    const userID = crypto.randomBytes(16).toString('hex');
    const serverClient = connect(apiKey, apiSecret, appID);

    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createUserToken(userID);

    res.status(200).json({ token, fullName, username, userID, hashedPassword, phoneNumber });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e });
  }
}

module.exports = {
  login,
  signup,
};
