var express = require('express');
var router = express.Router();
const arj = require('api-response-json');
const bcrypt = require('bcrypt');
const ConnectService = require('../ConnectService')

/* register api. */
router.post('/register', function (req, res, next) {
  const body = req.body;

  if (!body.fullName) {
    arj.notFound(res, false, "ไม่มี fullName", {})
  } else if (!body.phoneNumber) {
    arj.notFound(res, false, "ไม่มี phoneNumber", {})
  } else if (!body.email) {
    arj.notFound(res, false, "ไม่มี email", {})
  } else if (!body.profession) {
    arj.notFound(res, false, "ไม่มี profession", {})
  } else if (!body.username) {
    arj.notFound(res, false, "ไม่มี username", {})
  } else if (!body.password) {
    arj.notFound(res, false, "ไม่มี password", {})
  } else {
    ConnectService().then((service) => {
      let sqlCheckUser = `select * from user where username = '${body.username}'`
      service.mysql.query(sqlCheckUser, function (error, results, fields) {
        if (error) {
          arj.internalServerError(res, false, "internal Server Error", error)
        } else if (results.length !== 0) {
          arj.notFound(res, false, "มี username นี้อยู่", {})
        } else {
          bcrypt.hash(password, 10, function (err, hash) {
            // Store hash in your password DB.
            let createUser = `INSERT INTO user (fullName, phoneNumber, email, profession, username,password,privilege_type)
            VALUES ('${body.fullName}', '${body.phoneNumber}', '${body.email}', '${body.profession}', '${body.username}', '${hash}',1);`
            service.mysql.query(createUser, function (error, results, fields) {
              if (error) {
                arj.internalServerError(res, false, "internal Server Error", error)
              } else {
                arj.created(res, true, 'sign-up ok!', results)
              }
            })

          });
        }
        // connected!
      });

    }).catch(err => {
      arj.internalServerError(res, false, "internal Server Error", err)
    })

  }

  res.send('respond with a resource');
});

module.exports = router;
