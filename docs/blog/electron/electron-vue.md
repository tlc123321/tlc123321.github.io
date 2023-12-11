# electron与vue结合

## 项目方案

目前市面上使用electron结合vue有两种方案，1是主体是vue，只是在依赖里面安装了electron，但是这样vue和electron就耦合在一起了，2是electron和vue独立开来，只是把vue的包放进electron里面，我这边选择的第二种

## electron-of-vue

### 1.文档地址

[中文文档](https://www.electronjs.org/zh/docs/latest/)

### 2.项目构建

我们这里需要下载两个项目，一个是vue项目，一个是electron项目，但是最外层也需要一个`package.json`,这个最外层的文件主要是用来统一管理命令和eslint相关的。

创建package.json

```bash
npm init -y
```

新建`electron-app`和`vue-app`文件夹，分别用来存放electron和vue项目,此时目录结构应该为

```bash
├── electron-app
├── vue-app
└── package.json
```

初始化vue-app的vue项目（省略，官网很详细）

初始化electron-app的electron项目

```bash
cd ./electron-app
npm init -y
```

安装electron依赖

```bash
yarn add electron --dev
```

增加一条命令

```json
"scripts": {
    "start": "electron."
  },
```

在`electron-app`目录下编写`main.js`

贴一下我的

```js
const { app, BrowserWindow} = require('electron');
const path = require('path');
const NODE_ENV = process.env.NODE_ENV;

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1200,
    height: 960,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  if(NODE_ENV === 'development') {
    win.loadURL('http://localhost:5173/');
    win.webContents.openDevTools();
  } else {
    win.loadFile(path.join(__dirname, './vue_dist/index.html'));
  }
};
app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  app.on('window-all-closed', () => {
    if (process.platform!== 'darwin') app.quit();
  });  
});
```

::: tip
> 1.NODE_ENV是环境变量，用来区分开发环境和打包生产环境，开发环境可以直接加载本地url，打包的话旧需要加载打包入口文件，为了统一环境变量，需要在`根目录`下的`package.json`下新增`cross-env`依赖，这个依赖可以统一设置环境变量，后续会告诉用法

> 2.preload.js是electron提供的，用来做一些electron和浏览器的交互，比如获取系统信息，获取文件路径等，可以根据需要进行修改
:::

下载好相关依赖后，此时只需要分别运行两个项目就可以看到出现的窗口了。
但是要分别进入两个项目，还要开两个终端来运行，很麻烦，所以可以通过`concurrently`和`wait-on`这两个插件来解决，`concurrently`作用是可以并行多条命令，传统的`&`只能依次执行，`wait-on`主要是用来监听端口是否打开，如果打开了就继续执行后面的命令，如果没有打开就一直等待，类似于`async/await`。

根目录`package.json`相关代码

```json
  "scripts": {
    "install:all": "yarn && cd vue-app && yarn && cd ../electron-app && yarn",
    "dev": "cross-env NODE_ENV=development concurrently \"yarn dev:vue-app\" \"yarn dev:electron-app\"",
    "dev:electron-app": "wait-on http://localhost:5173 && cd electron-app && yarn start",
    "dev:vue-app": "cd vue-app && yarn dev",
    "lint": "eslint. --ext.vue,.js,.jsx,.cjs,.mjs --fix --ignore-path.gitignore"
  },
  "devDependencies": {
    "concurrently": "^8.2.2",
    "eslint": "^8.55.0",
    "eslint-plugin-vue": "latest",
    "wait-on": "^7.2.0"
  },
  "dependencies": {
    "cross-env": "^7.0.3"
  }
```

写好之后直接在根目录执行`npm run dev`就可以打开窗口了

### 3.项目打包

最后就是打包相关，网上主要有两种方案`electron-builder`和`electron-forge`，但是`electron-forge`安装的话是没有安装向导的，用户体验差，所以我选择了`electron-builder`

进入`electron-app`目录，安装`electron-builder`

```bash
yarn add electron-builder --dev
```

编写相关配置，`electron-builder`是需要在`package.json`中配置的，我这里贴一下我的配置

```json
  "build": {
    "appId": "com.my-website.my-app",
    "productName": "tlc_app",
    "copyright": "Copyright © 2021 kuari",
    "mac": {
      "category": "public.app-category.utilities"
    },
    "nsis": {
      "oneClick": false,
      "allowToChangeInstallationDirectory": true
    },
    "directories": {
      "buildResources": "assets",
      "output": "dist_electron"
    }
  }
```

主要是一些app名，打包文件之类的，具体的可以去官网查看

然后在`package.json`中增加一条命令

```json
"build": "electron-builder",
```

然后回到根目录，在根目录的`package.json`中增加一条命令

```json
"scripts": {
    "build": "cross-env NODE_ENV=production yarn build:vue-app && yarn build:electron-app",
    "build:electron-app": "cd electron-app && yarn build",
    "build:vue-app": "cd vue-app && yarn build",
}
```

然后在根目录执行`npm run build`，打包完成之后，会在`electron-app`目录下生成`dist_electron`文件夹，里面就是打包好的文件了，点击里面的`.exe`文件，就可以安装了

### 4. 可能出现的问题

> 1.electron整个过程看起来比较简单，但是由于下载和打包的网络问题，会很复杂，首先是安装electron，会经常失败，所以需要切换镜像来安装，推荐使用`yarn`，这个过程需要有耐心

> 2.打包，由于使用`electron-builder`打包的时候会去下载相关依赖，网络不行很可能下载报错而导致打包不成功，如果失败了，可以自行下载相关包，看报错信息哪里报错，点击那个链接会弹到下载页，下载就行，下载解压后放在如下文件夹下

![图片](./images/image1.png)

### 5.项目模板地址

[electron-of-vue](https://github.com/tlc123321/electron-of-vue)

