# 小程序web-view页面分享问题

## 背景

有许多页面原本是写在h5上面的，由于小程序要做相同的功能，于是为了节省开发时间，直接使用web-view的方式嵌入到小程序中。

## 问题点

- 由于h5页面是没有做登录校验的，所以小程序是否登录都可以进入此页面，原先小程序的逻辑是把token挂在url上，在路由守卫上查看是否有token，有的话根据token调接口直接就登录了，但是由于token的时效性，只能使用一次，所以当用户刷新进入这个页面时，token还是老token，再次传入token获取用户信息就会报错，而这种场景分享再次打开的时候时必现的，所以需要解决

## 解决token会过期的问题

token只能调用一次，那么有没有什么唯一值，可以放在哪里都是相同的身份呢，那就是cookie里面的登录信息，我这边是`Authorization`,把这个信息直接放在web-view的url上，这样就可以了，参考代码如下
```js
  onLoad: function (options) {
    // 在web-view页面获取token，可以保证进入这个页面的token是本人的且最新的
    const token = wx.getStorageSync("token")
    // 有token就传token进入，无就传入isLogin=0来标识没有token，逻辑h5那边处理
    this.setData({
      showLoading: true
    });
    // 排除 link 和 title 等不是参数的字段
    let query = Object.keys(options)
    .filter(item => !['link', 'title', 'path'].includes(item))
    .reduce((pre, cur) => pre + `&${cur}=${options[cur]}`, '')
    let link = ''
    if(options.path){
      link = `${decryptDes(options.path)}${query}`
      console.log(decryptDes(options.path))
    } else {
      link = `${options.link}${query.substring(1) && '?'}${query.substring(1)}`
    }
    // mapUrl 需要用decodeURIComponent编码一下，不然分享之后的页面再次进入会因为乱码导致页面无法显示
    if(token) {
      this.setData({
        mapUrl: decodeURIComponent(link + `&token=${token}`),
        title: options.title || '',
        share_url: link
      })
    }else {
      this.setData({
        mapUrl: link.indexOf('isLogin') > -1 ? decodeURIComponent(link) : decodeURIComponent(link + `&isLogin=0`),
        title: options.title || '',
        share_url: link
      })
    }
    console.log(111,this.data.mapUrl)

    wx.setNavigationBarTitle({
      title: options.title || ''
    })
  },
    /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const link = this.data.share_url.split('?')[0]
    const query = this.data.share_url.split('?')[1]
    return {
      path: `/package/common-webview/index?link=${link}&${query}`
    }
  },
```
h5那边的路由守卫代码
```js
      if (to.query.hasOwnProperty('origin') && to.query.origin === 'mp') {
        let tempQuery = to.query
        let domain = ''
        let currentEnv = process.env.NODE_ENV
        if (currentEnv === 'development') { // 当前是否是本地环境
          domain = ''
        } else {
          // 根据当前url拿域名。
          let fullDomain = document.domain
          if (fullDomain.indexOf('192') === 0) { // 针对测试环境的处理，现在测试环境没有域名了，直接用的ip访问，所以需要特殊处理，测试环境ip：192.168.11.198
            domain = ''
          } else {
            domain = fullDomain.substr(fullDomain.indexOf('.'))
          }
        }
        if (to.query.hasOwnProperty('token')) {
          // 有token登录了的
          const { token } = to.query
          utils.cookie.setCookie('Authorization', ('bearer ' + token), utils.time.adddays(7), '/', domain) // 设置cookie
          let token1 = utils.cookie.getCookie('Authorization')
          const res = await $login.fetchLoginInfo()
          loginData = { ...res.data.userInfo, ...{ token: token1, account: res.data.userInfo.account || res.data.accountInfo.account } }
          // 记得删除url的信息不然会无限循环
          delete tempQuery.token
          delete tempQuery.origin
        } else if (to.query.hasOwnProperty('isLogin') && to.query.isLogin === '0') {
          // 无token登录，设置Authorization为 '',设置清除在微信小程序无效，原因不明
          utils.cookie.setCookie('Authorization', '', utils.time.adddays(7), '/', domain) // 清除cookie
          delete tempQuery.isLogin
          delete tempQuery.origin
          let resultList = Object.keys(tempQuery).reduce((result, key) => {
            result.push(key + '=' + tempQuery[key])
            return result
          }, [])
          next({ path: to.path + (resultList.length ? ('?' + resultList.join('&')) : ''), replace: true })
          return
        }
        store.commit('framework/changeUserInfo', loginData)
        store.commit('framework/changeMPOrigin', true)
        let resultList = Object.keys(tempQuery).reduce((result, key) => {
          result.push(key + '=' + tempQuery[key])
          return result
        }, [])
      }    
```

## 大功告成！

微信小程序的调试非常麻烦，后来发现了本地开发的时候h5的地址可以直接引用本地地址，这样就不是每次发版看测试地址了，可以加一点效率。。。
