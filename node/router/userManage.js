module.exports = (router, db) => {
  router.get('/user_manage/list/:type', function *() {
    const { type } = this.params
    this.body = yield new Promise((resolve, reject) => {
      db.query(`select * from zhixiang.user where type = "${type}"`,
      (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  })

  router.post('/user_manage/edit_password', function *() {
    const { id, password } = this.request.body
    this.body = yield new Promise((resolve, reject) => {
      db.query(`update zhixiang.user set password = "${password || '123456'}" where id = "${id}"`,
      (err, res) => {
        if (err) reject(err)
        resolve({ success: 1 })
      })
    })
  })

  router.post('/user_manage/create', function *() {
    const {
      account,
      name,
      mobile,
      type
    } = this.request.body
    this.body = yield new Promise((resolve, reject) => {
      db.query(`insert into zhixiang.user (account, name, mobile, type) values("${account}", "${name}", "${mobile}", "${type}")`,
      (err, res) => {
        if (err) reject(err)
        resolve({ success: 1 })
      })
    })
  })
}
