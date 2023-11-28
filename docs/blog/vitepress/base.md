# vitepress基本配置

## 文档地址

[vitepress中文文档](https://process1024.github.io/vitepress/)

[vitepress官方文档](https://vitepress.dev/)

## 项目创建

### 1.初始化项目

先新建一个目录，进入该目录,初始化项目

```sh
yarn init
```
### 2.安装vitepress vue

```sh
yarn add -D vitepress vue
```

### 3.启动本地环境

```json
{
  ...
  "scripts": {
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "docs:serve": "vitepress serve docs"
  },
  ...
}
```

### 4.目录结构

```sh
.
├── docs
│   ├──.vitepress
│   │   ├── config.js // 配置文件
│   └── public // 公共图片
│   └── index.md // 首页配置
└── package.json
```

### 5.启动服务

```sh
yarn docs:dev
```

## 项目配置

主要说下遇到的坑

1. `index.md`里面`image`配置，`image`是用来设置首页右边的那张大图，如果你想引用本地图片，需将图片放在public文件夹里面,直接引入就行了
``` yml
image:
  src: /preview.jpg
  alt: 后藤独
```

2. 默认的配置之后地址可能是这样的
```txt
http://localhost:5173/vitepress/blog/tool/watt.html
```
如果觉得.html后缀太丑，可以通过在`config.js`里面配置
```js
cleanUrls: true, // 生成干净的url
```
配置之后地址是这样的
```txt
http://localhost:5173/vitepress/blog/tool/watt
```

3. 侧边栏菜单如果需要使用svg的icon，可以这样使用
```js
    socialLinks: [
      {
        icon: 'github',
        link: 'https://github.com/tlc123321'
      },
      {
        icon: {
          svg: '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd"><svg t="1701067346104" class="icon" viewBox="0 0 1316 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4098" xmlns:xlink="http://www.w3.org/1999/xlink" width="257.03125" height="200"><path d="M643.181714 247.698286l154.916572-123.172572L643.181714 0.256 643.072 0l-154.660571 124.269714 154.660571 123.245715 0.109714 0.182857z m0 388.461714h0.109715l399.579428-315.245714-108.361143-87.04-291.218285 229.888h-0.146286l-0.109714 0.146285L351.817143 234.093714l-108.251429 87.04 399.433143 315.136 0.146286-0.146285z m-0.146285 215.552l0.146285-0.146286 534.893715-422.034285 108.397714 87.04-243.309714 192L643.145143 1024 10.422857 525.056 0 516.754286l108.251429-86.893715L643.035429 851.748571z" fill="#1E80FF" p-id="4099"></path></svg>'
        },
        link: 'https://juejin.cn/user/2615075777810108'
      },
    ], // 右上角带有图标的链接
```
其中svg的地址可以去iconfont图标库里面去找<br/>
[iconfont矢量图标库](https://www.iconfont.cn/)

其他的参照官方文档配置还是很简单的。