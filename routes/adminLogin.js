var express = require('express');
var router = express.Router();
const arj = require('api-response-json');
const bcrypt = require('bcrypt');
const ConnectService = require('../ConnectService')

/* login api. */
router.post('/admin/login', function (req, res, next) {
  const body = req.body;
  if (!body.username) {
    arj.badRequest(res, false, "ไม่มี username", {})
  } else if (!body.password) {
    arj.badRequest(res, false, "ไม่มี password", {})
  } else {
    ConnectService().then((service) => {
      let sqlCheckUser = `select * from user where username = '${body.username}' and privilege_type = 0`
      service.mysql.query(sqlCheckUser, function (error, results, fields) {
        if (error) {
          arj.internalServerError(res, false, "internal Server Error", error)
        } else if (results.length !== 0) {
          bcrypt.compare(body.password, results[0].password).then(function (passwordChecked) {
            if (passwordChecked) {
              arj.ok(res, true, "sign-in ok", { data: results })
            } else {
              arj.badRequest(res, false, "password ไม่ถูกต้อง", {})
            }
          });
        } else {
          arj.badRequest(res, false, "ไม่มี username นี้", {})
        }
        // connected!
      });

    }).catch(err => {
      arj.internalServerError(res, false, "internal Server Error", err)
    })

  }
});

module.exports = router;
