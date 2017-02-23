const overView = require('./overView')
const sdManage = require('./sdManage')
const userManage = require('./userManage')
const login = require('./login')
const upload = require('./upload')

module.exports = (router, db) => {
  overView(router, db)
  sdManage(router, db)
  userManage(router, db)
  login(router, db)
  upload(router, db)
}
