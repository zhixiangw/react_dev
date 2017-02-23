module.exports = (router, db) => {
  router.post('/api/v1/login', function *() {
    const { account, password } = this.request.body
    const response = yield new Promise((resolve, reject) => {
      db.query(`select * from zhixiang.user where account = "${account}" AND password = md5("${password}")`,
      (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
    if (response.length) {
      this.body = response[0]
    } else {
      this.body = {
        msg: '登录失败',
        status: 0
      }
    }
  })

  router.get('/api/v1/logout', function *() {
    this.body = { msg: '操作成功', status: 200 }
  })
}
