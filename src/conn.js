import mysql from 'mysql2/promise'

const pool = mysql.createPool({
    host: 'localhost',
    port:  33069,
    user: 'kelson',
    database: 'blog_db',
    password: 'ninauser'
})

export default pool