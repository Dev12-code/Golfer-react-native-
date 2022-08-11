const db = require("../config/database");

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

exports.listUsersinRabbitCard = async (req, res) => {
  const Tourney = parseInt(req.params.tourney);
  const response = await db.query(`SELECT * FROM users a INNER JOIN 
                                  user_rabbitcards b ON a.id = b.user_id 
                                  WHERE b.t_id = $1`, [Tourney]);
  res.status(200).send(response.rows);
};

exports.updateDeviceToken = async (req, res) => {
  const token_device = req.body.device_token;
  console.log(token_device);
  console.log(req.userId);
  const device_token = await db.query(`UPDATE users SET device_token = $1 where id = $2`, [token_device, req.userId]);
  if(device_token)
  {
    res.status(200).send("Device token updated");
  }
  else
  {
    res.status(200).send("Try Again");

  }
}