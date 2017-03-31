# react_env

> 一个react + react-router + redux + ant-design + webpack + es6的后台（SingleDog）管理系统

> 后台使用nodejs + koa，数据库使用mysql

> 代码规范参照eslint具体规范

## Build Setup

``` bash
# 安装相关依赖包
npm install

# 项目中引入了庞大的antd库，以及react全家桶的一些资源，开发过程中热更新打包速度受到影响，于是使用
# 类动态链接库的方式，将一些不会变动的依赖包单独出一个文件，当做一个lib库，从而大大提高打包速度
webpack --config dll.config.js

# 后台服务使用node编写，启动node服务
npm run node

# 服务运行于 localhost：8080
npm run dev

# 生产环境打包命令
npm run prod
```
## 具体说明
```bash
# 项目所以文件存放于app文件夹内
> componets存放公用组件，包括菜单、容器、图片预览、以及layout布局文件夹
> projects则是存放项目的模块组件，文件目录结构跟普通react项目一直，多出一个middlewares文件，此处是作为中间件
> 出现的，编写了一个所有请求都要通过的中间件，以及请求结果错误提示的显示方案
> router.js顾名思义，存放的是react路由跳转逻辑

# build目录为dev环境下，产生的一些打包文件
> 其中放一个动态链接lib文件，此文件有webpack --config config.dll.js 命令产生

# dist目录为prod环境下，产生的文件，
> 运行npm run prod时产生的文件

# node目录为node后台逻辑的文件夹
> app.js为node入口文件，启动node服务的文件
> router里面做了区分，每个模块都有自己的路由文件，方便维护，也便于查阅

# temp目录存放的是静态html模板文件
> 分为dev和线上prod的模板，唯一的不同就是dev环境下，为了开发速度加入了dll库，线上也可以做这种处理，以优化速度
> 目前此项目没有这么做，只供对比

```
## 额外说明
```bash
此项目的主题内容比较滑稽，只是为了敲代码过程有个欢乐的主题，别无他意，还是希望各位程序员大佬早日找到对象，哈哈
```
