require('dotenv/config')
const mySql = require('mysql')

const pool = mySql.createPool({
  connectionLimit: 100,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  host: process.env.API_HOST,
  database: process.env.DB_DB,
  port: 3306,
})

const getData = async () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM tbl_ucenici`, async (err, res) => {
      if (err) return reject(err)
      return resolve(res)
    })
  })
}

const readData = async () => {
  const data = await getData()
  console.log(data)
}

readData()
