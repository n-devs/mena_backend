
const mysql = require('mysql')

async function ConnectService() {
    return await new Promise((resolve, reject) => {

        const db = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '6e2e70736b',
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