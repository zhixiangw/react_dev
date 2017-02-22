const overView = require('./overView')
const sdManage = require('./sdManage')

module.exports = (router, db) => {
  overView(router, db)
  sdManage(router, db)
}
