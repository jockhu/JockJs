JOCKJS - An Smart JavaScript Library
=======================================


 简介
--------------------------------------

安居客前端Js框架，特点是迷你，使用非常灵活，颗粒化模块管理，动态按需载入，在线压缩，自动依赖关系处理，动态合并零碎的模块请求。
JockJs框架，不仅仅具有类似jQuery对DOM、事件、ajax等常用操作的工具方法，它更是一套完整的解决方案，配合JockCss框架、JockJs组件库、错误日志及性能监控等，组合成非常健全和完善的前端解决方案，丰富的组件提供了强大的业务支持，更加灵活和高效的完成业务需求。


 运行环境
--------------------------------------

Linux last edition

NodeJs v0.8.10


 安装使用
--------------------------------------

[下载](http://nodejs.org/)官方最新稳定版 [NodeJs](http://nodejs.org/) ， 编译安装


安装 uglify-js modules , 进入 NodeJs 安装目录，执行以下命令

```bash
$ npm install uglify-js
```

克隆项目文件

```bash
$ git clone git://github.com/jockhu/jockjs.git
```

进入项目 jockjs 目录，执行以下命令，启动服务 (以下是简单测试用法）

```bash
$ cd jockjs
$ node service.js 8000 false true
```

完成安装，访问 [http://127.0.0.1:8000/base/20120927001.js](http://127.0.0.1:8000/base/20120927001.js) 测试是否完成

(127.0.0.1)可以替换成你指定的域名


 服务启动配置项
--------------------------------------

 - 监听端口号：    port       可选：默认监听8000端口
 - 是否启动调试：  debug      可选
 - 是否启用压缩：  compress   可选
 - 指定版本号：    version    可选：指定某一特定版本

```bash
node service.js [[[[port]  debug]  compress]  version]
示例
node service.js 8000 true true
```

运行以下命令查看帮助

```bash
node service.js --help
```

 如何使用
--------------------------------------

```js
<script type="text/javascript" src="http://127.0.0.1:8000/base/20120927001.js"></script>
```

```html
<div id="T"></div>

<script type="text/javascript">

(function(){

    var T = J.g('T');
    T.html('DOM 操作完成');
    T.setStyle({border:'1px solid red', width:'200px'});
    J.on(T, 'click', function(){
        T.html('DOM 事件操作完成');
    });

}.require(['dom.dom','event.on']));

</script>
```

 问题反馈
--------------------------------------
邮件：<[jockhu@anjukeinc.com](mailto:jockhu@anjukeinc.com)>
