module.exports = (router, db) => {
  router.get('api/v1/user_manage/list/:type', function *() {
    const { type } = this.params
    this.body = yield new Promise((resolve, reject) => {
      db.query(`select * from zhixiang.user where type = "${type}"`,
      (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  })

  router.post('api/v1/user_manage/edit_password', function *() {
    const { id, password } = this.request.body
    this.body = yield new Promise((resolve, reject) => {
      db.query(`update zhixiang.user set password = md5("${password || '123456'}") where id = "${id}"`,
      (err, res) => {
        if (err) reject(err)
        resolve({ msg: '操作成功', status: 200 })
      })
    })
  })

  router.post('api/v1/user_manage/create', function *() {
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
        resolve({ msg: '操作成功', status: 200 })
      })
    })
  })
}
