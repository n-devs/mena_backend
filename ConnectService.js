
const mysql = require('mysql')

async function ConnectService() {
    return await new Promise((resolve, reject) => {

        const db = mysql.createConnection({
            host: 'example.org',
            user: 'bob',
            password: 'secret',
            database: 'manage_project'
        });

        db.connect(function (err) {
            if (err) {
                reject({
                    success: false,
                    statusCode: 500,
                    message: "error connecting mysql database user_db",
                    error: err.stack,
                })
            }
        });


        resolve({
            mysql: db,
        })

    })
}

module.exports = ConnectService