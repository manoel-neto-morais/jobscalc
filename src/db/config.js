const sqlite3 = require('sqlite3')

//importanto apenas a funcionalidade opne do sqlite
const { open } =  require('sqlite')


//abertura do banco de dados
module.exports = () => open({
        filename: './database.sqlite',
        driver: sqlite3.Database
    })


