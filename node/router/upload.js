'use strict';
let qiniu = require('qiniu')
qiniu.conf.ACCESS_KEY = '3aKysrQ8pntZXzrwJ8QDf8H-z-djiu0wu4aIaGOm'
qiniu.conf.SECRET_KEY = '6mkQXcJp_uR7weAj-BPzUJ1IautsvOWP5w1U2Zi0'

const uptoken = (key) => {
  const putPolicy = new qiniu.rs.PutPolicy(`panda:${key}`)
  return putPolicy.token()
}

module.exports = (router) => {
  router.post('/file/upload.do', function *() {
    const key = this.request.files.file.name
    const filePath = this.request.files.file.path
    const token = uptoken(key)
    const extra = new qiniu.io.PutExtra()
    const response = yield new Promise((resolve, reject) => {
      qiniu.io.putFile(token, key, filePath, extra, (err, ret) => {
        if (!err) {
          // 上传成功， 处理返回值
          // 获取下载的url链接
          let url = `http://oky7n7ggp.bkt.clouddn.com/${ret.key}`
          resolve(url)
        } else {
          // 上传失败， 处理返回代码
          reject(err)
        }
      })
    })
    this.body = {
      uid: -1,
      url: response,
      status: 200,
      msg: '操作成功'
    }
  })
}
