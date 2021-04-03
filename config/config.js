require('dotenv').config()

const {
    DB_HOSTNAME,
    DB_PORT,
    DB_NAME,
    DB_USERNAME,
    DB_PASSWORD,
} = process.env
module.exports = {
    "development": {
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOSTNAME,
        "port": DB_PORT,
        "dialect": "mysql"
    },
    "test": {
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOSTNAME,
        "port": DB_PORT,
        "dialect": "mysql"
    },
    "production": {
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOSTNAME,
        "port": DB_PORT,
        "dialect": "mysql"
    }
}
