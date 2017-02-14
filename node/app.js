'use strict'
const koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')
const koaCors = require('koa-cors')
const router = require('koa-router')()
const formidable = require('koa-formidable')
let qiniu = require('qiniu')

qiniu.conf.ACCESS_KEY = '3aKysrQ8pntZXzrwJ8QDf8H-z-djiu0wu4aIaGOm'
qiniu.conf.SECRET_KEY = '6mkQXcJp_uR7weAj-BPzUJ1IautsvOWP5w1U2Zi0'

function uptoken(key) {
  var putPolicy = new qiniu.rs.PutPolicy("panda:"+key);
  return putPolicy.token();
}

const app = koa()
app.use(koaCors())
app.use(bodyParser())
app.use(logger())
app.use(formidable())
// 指定服务器的静态资源地址，可以直接直接localhost:3100/filename访问静态资源
app.use(router.routes())
   .use(router.allowedMethods())

/*************************图片文件上传到本地的方法***********************************/
router.post('/upload.do', function *(next) {
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
    msg: 'success',
    url: response
  }
})
/*************************图片文件上传到本地的方法***********************************/

/*************************文件流上传到本地临时目录的方案***********************************/
// router.post('/test', function *(next) {
//   if ('POST' != this.method) return yield next
//   let parts = parse(this)
//   let part
//   let fileNames = []
//   // 文件流上传到本地服务器
//   while ((part = yield parts)) {
//     fileNames.push(part.filename)
//     let newPath = `${path.resolve(__dirname, '..')}/public/${part.filename}`
//     let stream = fs.createWriteStream(newPath)
//     part.pipe(stream)
//   }
//   const downloadUrl = yield qiniu.uploadFile(fileNames[0], `${path.resolve(__dirname, '..')}/public/${fileNames[0]}`)
//   const url = yield dbUpdate(downloadUrl, fileNames)
//   this.body = {
//     msg: 'success', url
//   }
// })

// function dbUpdate(downloadUrl, fileNames) {
//   return new Promise((resolve, reject) => {
//     db.query(`update user set image = "${downloadUrl}" where id = 1 `, (err, res, fields) => {
//       if (err) {
//         reject(err)
//       }
//       fs.unlink(`${path.resolve(__dirname, '..')}/public/${fileNames[0]}`, () => {
//         resolve(downloadUrl)
//       })
//     })
//   })
// }
/*************************文件流上传到本地临时目录的方案***********************************/

/*************************客户端直接提交到七牛方案，后台只提供token值***********************************/
router.post('/getToken', function *(next){
  this.body = {
    token: qiniu.token(this.request.body.name)
  }
})
// /*************************客户端直接提交到七牛方案，后台只提供token值***********************************/

app.on('error', (err) => {
  console.log('server error', err)
})

app.listen(3100)
