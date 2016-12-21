#react_env
1、npm install
2、webpack --config dll.config.js (因为项目中引入了庞大的antd库，以及react全家桶，正常打包的速度受到了很大影响，于是使用类动态链接库的方式，将几个依赖包单独打一份文件，当作一个lib库，从而大大提高打包速度)
2、npm run dev
3、打开浏览器，键入localhost:8080

