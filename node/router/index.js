const overView = require('./overView')
const sdManage = require('./sdManage')
const upload = require('./upload')

module.exports = (router, db) => {
  overView(router, db)
  sdManage(router, db)
  upload(router, db)
}
