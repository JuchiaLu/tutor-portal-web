# tutor-portal-web

在线家教预约平台的前台门户前端应用，使用 [vue-admin-template](https://panjiachen.gitee.io/vue-admin-template) 作为开发脚手架。

样式模板修改至互联网一款名叫 [Thinkphp红色大气新版家教网多城市版](https://www.yuanmajia.cn/programcode/thinkphpjiajiaowang.html) 的 PHP 程序，用 Vue 和 Element UI 重写。

[点击查看全部预览](https://github.com/JuchiaLu/tutor-server/blob/master/PREVIEW.md)

![preview39](http://47.107.243.187:9530/tutor-server/preview/preview39.png)

![preview39](http://47.107.243.187:9530/tutor-server/preview/preview40.png)

![preview39](http://47.107.243.187:9530/tutor-server/preview/preview41.png)

![preview39](http://47.107.243.187:9530/tutor-server/preview/preview42.png)

## 构建

```bash
# 克隆项目
git clone https://github.com/juchialu/tutor-portal-web.git

# 进入项目目录
cd tutor-portal-web

# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:1234](http://localhost:1234)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```
