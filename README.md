#react_env
1、npm install

2、webpack --config dll.config.js (因为项目中引入了庞大的antd库，已经react全家桶，正常打包的速度受到了很大影响，于是使用类动态链接库的方式，

将几个依赖包单独打一份文件，当作一个lib库，从而大大提高打包速度)

3、npm run dev

4、打开浏览器，键入localhost:8080

5、新增权限控制的字段，用户登录的时候，分三种不同的权限，拥有不同的页面展示。

reducer文件夹中的login.js，自定义登录角色 admin = 管理员， salesman = 业务员， verify = 审核员

计划将此版本的后台管理，进行改版，变成单身狗管理后台，后台使用nodejs，数据库使用mysql，前端使用react全家桶

纯属练习后台的项目，娱乐为主
