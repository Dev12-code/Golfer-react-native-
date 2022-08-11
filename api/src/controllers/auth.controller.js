const db = require("../models");
const dbs = require("../config/database");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
var crypto = require("crypto");

var nodemailer = require('nodemailer');

const sendEmail = (code, password, receiveremail) => {
  
  var transporter = nodemailer.createTransport({
    service: 'gmail',  // service: 'gmail',
    port: 465,
    secure: true,
    auth: {
      user: process.env.GMAIL,                  //'rabbitcard0317@gmail.com',
      pass: process.env.PASSWORD                //'Rabbitcard0317!'
    }
  });

  transporter.verify((err, success) => {
    if (err) console.error(err);
    console.log('Your config is correct');
  });
  var mailOptions = {
    from: 'Do Not Reply <rabbitcards@freeformagency.com>',
    to: receiveremail,
    subject: 'Verification Code',
    html: '<p>Temporary password: '+ password +'</p>'
  };
  
  console.log("aaaaa",mailOptions, process.env.GMAIL)
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log("Email error", error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

exports.signup = (req, res) => {
  // Save User to Database
  User.create({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    device_token: req.body.device_token
  })
    .then(user => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles
            }
          }
        }).then(roles => {
          user.setRoles(roles).then(() => {
            res.send({ success: true, id: user.id, message: "User was registered successfully!" });
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ success: true, id: user.id, message: "User was registered successfully!" });
        });
      }
    })
    .catch(err => {
      res.status(500).send({ success: false, message: err.message });
      console.log(err)
    });
};

exports.me = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ success: false, message: "User Not found." });
      }

      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 1296000 // 24 hours // 15days
      });
      
      var authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          roles: authorities,
          accessToken: token
        });
      });
    })
    .catch(err => {
      res.status(500).send({ success: false, 
                             message: err.message });
    });
}

exports.verifyEmail = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ success: false, message: "User Not found." });
      }

      const token = Math.floor(100000 + Math.random() * 900000);
      const password = crypto.randomBytes(3).toString('hex');
      user.update({reset_password_token: token, password: bcrypt.hashSync(password, 8)}, {
          where: {id: user.id}
      });
       //Sending Email
      sendEmail(token,password, req.body.email);
      res.status(200).send({ success: true });
    })
    .catch(err => {
      res.status(500).send({ success: false, 
                             message: err.message });
    });
}

exports.verifyCode = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
      reset_password_token: req.body.code
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ success: false, message: "User Not found." });
      }

      return res.status(200).send({ success: true });      
    })
    .catch(err => {
      res.status(500).send({ success: false, 
                             message: err.message });
    });
}

exports.forgotPassword = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ success: false, message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.code,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Code!"
        });
      }
      
      user.update({password: bcrypt.hashSync(req.body.password, 8)}, {
          where: {id: user.id}
      });

      res.status(200).send({ success: true });      
    })
    .catch(err => {
      res.status(500).send({ success: false, 
                             message: err.message });
    });
}

exports.resetPassword = (req, res) => {
  User.findOne({
    where: {
      id: req.userId
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({ success: false, message: "Token is invalid!" });
      }

      var passwordIsValid = bcrypt.compareSync(
        req.body.old_password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Old Password!"
        });
      }

      user.update({password: bcrypt.hashSync(req.body.new_password, 8)}, {
        where: {id: user.id}
      });
      res.status(200).send({ success: true });      
    })
    .catch(err => {
      res.status(500).send({ success: false, 
                             message: err.message });
    });
}

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(async user => {
      if (!user) {
        return res.status(404).send({ success: false, message: "User Not found." });
      }
      console.log(JSON.stringify(user));
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!"
        });
      }
      // console.log(JSON.stringify(config.secret));
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 1296000 // 24 hours // 15das
      });
      let device_token_update = await dbs.query(`UPDATE users SET device_token = '${req.body.device_token}' WHERE id = ${user.id}`);
      await dbs.query(`UPDATE users SET sign_flag = '${true}' WHERE id = ${user.id}`);
      var authorities = [];
      var sign_flag = user.sign_flag;
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          roles: authorities,
          accessToken: token,
          signin_flag: sign_flag,
          device_token: req.body.device_token,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ success: false, 
                             message: err });
    });
};