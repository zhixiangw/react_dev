const overView = require('./overView')
const sdManage = require('./sdManage')
const userManage = require('./userManage')
const upload = require('./upload')

module.exports = (router, db) => {
  overView(router, db)
  sdManage(router, db)
  userManage(router, db)
  upload(router, db)
}
