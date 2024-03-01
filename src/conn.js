import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'mysql',
    port:  3306,
    user: 'kelson',
    database: 'blog_db',
    password: 'ninauser'
})

export default pool