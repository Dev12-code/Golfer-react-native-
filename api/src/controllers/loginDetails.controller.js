const db = require("../config/database");
const sq = require("../models");
const User = sq.user;

exports.userDetails = async (req, res) => {
    const response = await db.query('SELECT id, email, device_token FROM users ORDER BY id');
    res.status(200).send(response.rows);
}
