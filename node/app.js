'use strict'
const koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const koaCors = require('koa-cors')
const router = require('koa-router')()

const mysql = require('mysql')
// 创建数据库链接
const db = mysql.createConnection({
  host: '121.40.47.176',
  user: 'zhixiang_admin',
  password: 'zhixiang2017',
  database: 'zhixiang'
})
db.connect()


const app = koa()
app.use(koaCors())
app.use(bodyParser())
app.use(logger())
app.use(router.routes())
   .use(router.allowedMethods())

require('./router')(router, db)

app.on('error', (err) => {
  console.log('server error', err)
})

app.listen(3100)
