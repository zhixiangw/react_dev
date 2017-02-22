module.exports = (router, db) => {
  router.post('/sd_manage/list', function *() {
    const { status, name, isPotential } = this.request.body
    this.body = yield new Promise((resolve, reject) => {
      db.query(`select * from zhixiang.sd where status = "${status}"${name ? `AND name like "%${name}%"` : ''}${isPotential ? `AND is_potential = "${isPotential}"` : ''}`,
      (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  })

  router.post('/sd_manage/verify', function *() {
    const { id } = this.request.body
    this.body = yield new Promise((resolve, reject) => {
      db.query(`update zhixiang.sd set status = 1 where id = "${id}"`,
      (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  })
}
