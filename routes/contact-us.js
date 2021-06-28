var express = require('express');
var router = express.Router();
const arj = require('api-response-json');
const ConnectService = require('../ConnectService')

/* contact-us api. */
router.post('/contact-us', function (req, res, next) {
  const body = req.body;

  if (!body.fullName) {
    arj.notFound(res, false, "ไม่มี fullName", {})
  } else if (!body.phoneNumber) {
    arj.notFound(res, false, "ไม่มี phoneNumber", {})
  } else if (!body.email) {
    arj.notFound(res, false, "ไม่มี email", {})
  } else if (!body.profession) {
    arj.notFound(res, false, "ไม่มี profession", {})
  } else if (!body.message) {
    arj.notFound(res, false, "ไม่มี message", {})
  } else {
    ConnectService().then((service) => {
      let creatContactUs = `INSERT INTO user (fullName, phoneNumber, email, profession, message)
      VALUES ('${body.fullName}', '${body.phoneNumber}', '${body.email}', '${body.profession}', '${body.message}');`
      service.mysql.query(creatContactUs, function (error, results, fields) {
        if (error) {
          arj.internalServerError(res, false, "internal Server Error", error)
        } else {
          arj.created(res, true, "ส่ง ข้อมูลติดต่อแล้ว", results)
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
