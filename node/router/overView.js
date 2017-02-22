module.exports = (router, db) => {
  router.get('/over_view/view', function *() {
    const p1 = new Promise((resolve, reject) => {
      db.query('select count(id) as count, sum(self_price) as price from sd', (err, res) => {
        if (err) reject(err)
        resolve(res[0].count)
      })
    })
    const p2 = new Promise((resolve, reject) => {
      db.query('select count(id) as potential from sd where is_potential = 1', (err, res) => {
        if (err) reject(err)
        resolve(res[0].potential)
      })
    })
    const p3 = new Promise((resolve, reject) => {
      db.query('select count(id) as member from sd where is_member = 1', (err, res) => {
        if (err) reject(err)
        resolve(res[0].member)
      })
    })
    const p4 = new Promise((resolve, reject) => {
      db.query('select sum(self_price) as price from sd', (err, res) => {
        if (err) reject(err)
        resolve(res[0].price)
      })
    })
    this.body = yield new Promise((resolve, reject) => {
      Promise.all([p1, p2, p3, p4]).then(values => {
        const res = {
          count: values[0],
          potential: values[1],
          member: values[2],
          price: values[3]
        }
        resolve(res)
      }, err => {
        reject(err)
      })
    })
  })

  router.post('/over_view/info', function *() {
    const { startDate, endDate } = this.request.body
    this.body = yield new Promise((resolve, reject) => {
      db.query(`select t.create_time as create_time, t.newAdded as newAdded,
        IF(g.verified is null,0,g.verified) as verified, t.totalSelfPrice as totalSelfPrice,
        t.members as members from (select create_time, count(id) as newAdded, sum(self_price) as totalSelfPrice,
        sum(is_member) as members from  zhixiang.sd t group by  t.create_time) as t left join
        (select  count(id) as verified, create_time from  zhixiang.sd t where status !=0  group by t.create_time )
        as g  on t.create_time=g.create_time where t.create_time BETWEEN "${startDate}" AND "${endDate}"`,
      (err, res) => {
        if (err) reject(err)
        resolve(res)
      })
    })
  })
}
