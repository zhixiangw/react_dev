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

  router.get('/sd_manage/detail/:id', function *() {
    const { id } = this.params
    this.body = yield new Promise((resolve, reject) => {
      db.query(`select * from zhixiang.sd where id = "${id}"`,
      (err, res) => {
        if (err) reject(err)
        resolve(res[0])
      })
    })
  })

  router.post('/sd_manage/detail/save', function *() {
    console.log(1111)
    const { info: {
      age,
      image,
      is_member,
      is_potential,
      mobile,
      name,
      personal_sign,
      self_price,
      sex
    }, id } = this.request.body

    this.body = yield new Promise((resolve, reject) => {
      db.query(`update zhixiang.sd set name = "${name}", age = "${age}", image = "${image}", is_member = "${is_member}"
        is_potential = "${is_potential}", mobile = "${mobile}", personal_sign = "${personal_sign}",
        self_price = "${self_price}", sex = "${sex}" where id = "${id}"`,
      (err, res) => {
        if (err) reject(err)
        console.log(res)
        resolve({ success: 1 })
      })
    })
  })
}
