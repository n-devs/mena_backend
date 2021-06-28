var express = require('express');
var router = express.Router();
const ConnectService = require('../ConnectService')
const arj = require('api-response-json');

/* GET search listing. */
router.get('/search', function (req, res, next) {
  const query = req.query

  const keys = Object.keys(query)

  if (query.all) {
    const searchAll = []
    keys.map((value, index, array) => {
      searchAll.push(`${value} like '%${query.all}%'`)

      if (index === (array.length - 1)) {
        ConnectService().then((service) => {
          let sql = `select * from project where ${searchAll.replace(",", " or ")}`

          service.mysql.query(sql, function (error, results, fields) {
            if (error) {
              arj.internalServerError(res, false, "internal Server Error", error)
            } else {
              arj.ok(res, true, 'search ok!', { data: results })
            }
          })
        }).catch(error => {
          arj.internalServerError(res, false, 'internal Server Error', error)
        })

      }
    })

  } else {
    const where = []
    keys.map((value, index, array) => {
      where.push(`${value} = '${query[`${value}`]}'`)

      if (index === (array.length - 1)) {
        ConnectService().then((service) => {
          let sql = `select * from project where ${where.replace(",", " or ")}`

          service.mysql.query(sql, function (error, results, fields) {
            if (error) {
              arj.internalServerError(res, false, "internal Server Error", error)
            } else {
              arj.ok(res, true, 'search ok!', { data: results })
            }
          })
        }).catch(error => {
          arj.internalServerError(res, false, 'internal Server Error', error)
        })



      }
    })
  }


  res.send('respond with a resource');
});

module.exports = router;
