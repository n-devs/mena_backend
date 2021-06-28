var express = require('express');
var router = express.Router();
const ConnectService = require('../ConnectService')
const arj = require('api-response-json');

/* GET project listing. */
router.get('/project', function (req, res, next) {
  const query = req.query

  const keys = Object.keys(query)
  const values = Object.values(query)

  if (query.id) {

    ConnectService().then((service) => {
      let sql = `select * from project where id = '${query.id}'`

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

  } else {
    ConnectService().then((service) => {
      let sql = `select * from project where id = '${query.id}'`

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
});

// สร้าง project
router.post('/project', function (req, res, next) {
  const body = req.body

  // `project_id` VARCHAR(45) NULL,
  // `title` TEXT NULL,
  // `detail` TEXT NULL,
  // `type` TEXT NULL,
  // `abstract` TEXT NULL,
  // `year` INT NULL,
  // `url` TEXT NULL,

  if (!body.project_id) {
    arj.notFound(res, false, "ไม่มี project_id", {})
  } else if (!body.title) {
    arj.notFound(res, false, "ไม่มี title", {})
  } else if (!body.detail) {
    arj.notFound(res, false, "ไม่มี detail", {})
  } else if (!body.type) {
    arj.notFound(res, false, "ไม่มี type", {})
  } else if (!body.abstract) {
    arj.notFound(res, false, "ไม่มี abstract", {})
  } else if (!body.year) {
    arj.notFound(res, false, "ไม่มี year", {})
  } else if (!body.url) {
    arj.notFound(res, false, "ไม่มี file", {})
  } else {
    ConnectService().then((service) => {
      let createUser = `INSERT INTO user (project_id, title, detail, type, abstract,year,url)
    VALUES ('${body.project_id}', '${body.title}', '${body.detail}', '${body.type}', '${body.abstract}', '${body.year}','${body.url}');`
      service.mysql.query(createUser, function (error, results, fields) {
        if (error) {
          arj.internalServerError(res, false, "internal Server Error", error)
        } else {
          arj.created(res, true, 'create project ok!', results)
        }
      })
    }).catch(err => {
      arj.internalServerError(res, false, "internal Server Error", err)
    })

  }
});

// update project
router.put('/project', function (req, res, next) {
  const body = req.body
  const query = req.query;

  const keys = Object.keys(body)

  const where = []
  keys.map((value, index, array) => {
    where.push(`${value} = '${body[value]}'`)

    if (index === (array.length - 1)) {
      ConnectService().then((service) => {
        let sql_update = `update project set ${where} where id = '${query.id}'`

        service.query(sql_update, function (err, res, arr) {
          if (error) {
            arj.internalServerError(res, false, "internal Server Error", error)
          } else {
            arj.ok(res, true, 'update project ok!', res)
          }
        })
      })
    }
  })
})

module.exports = router;
