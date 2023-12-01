# 微信公众号h5授权

## 背景

同事离职了，于是我接手了他的h5项目，需求是在目前嵌套在我们公众号的h5页面中，用户订单支付后，公众号推一个消息提醒，其实这是一个很常见的需求。

## 解决方案

目前官方文档是有这个能力的,无非就是会有亿点细节而已

### 1.相关文档

- [模板消息接口](https://developers.weixin.qq.com/doc/offiaccount/Message_Management/Template_Message_Interface.html)
- [网页授权](https://developers.weixin.qq.com/doc/offiaccount/OA_Web_Apps/Wechat_webpage_authorization.html)

其中模板消息接口是可以发送模板消息，但是需要用户的`openId`，这个`openId`是用户关注公众号生成的一个唯一凭证，所以我们需要先进行网页授权来获取用户的`openId`

模板发送接口我们后端已经二次封装好了，所以目前的难点就是获取用户的`openId`

### 2.网页授权

微信授权目前有两种授权方式`scope=snsapi_base`(静默授权，用户无感知，不会出现授权弹窗)和`scope=snsapi_userinfo`(弹出授权页面，用户有感知，会出现授权弹窗)，由于我这边只需要`openId`，不需要用户的其他信息，所以我选择了`scope=snsapi_base`

授权流程如下:

```txt
用户同意授权，获取code -> 通过code调用接口拿到用户`openId`
```
#### 2.1 用户同意授权，获取code

刚开始的解决方案是进入页面时，直接跳转到授权地址

```txt
https://open.weixin.qq.com/connect/oauth2/authorize?appid=APPID&redirect_uri=REDIRECT_URI&response_type=code&scope=SCOPE&state=STATE#wechat_redirect
```
但是这样会出现先进入默认地址，再跳转到回调地址，而我们这个回调地址其实就是默认地址，就会出现同一个页面闪屏两次，体验不好，于是我我们就想，既然是公众号，地址本来就是配置上去的，那为什么不直接配置的时候就配置授权地址呢，这样就可以解决跳转两次的问题。

::: warning 警告
注意：`redirect_uri`里面的回调地址需要编码一下，所以配置地址的时候需要配置编码之后的地址
:::

由于回调地址如果路由是hash模式，会出现一个地址混乱的问题，如我们配置的回调地址是
```txt
http://192.168.7.103:8090/#/herdGoodsList/12101
```
混乱之后会变成
```txt
http://192.168.7.103:8090/?code=001d1b0002i58R193L100P5oKL0d1b0s&state=#/herdGoodsList/12101
```
所以我们还需要对地址进行一次修改
```js
// 获取code
getWXCode () {
    // window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx79c95085a9eeb8c9&redirect_uri=http://192.168.7.103:8090/#/herdGoodsList/12101&response_type=code&scope=snsapi_base#wechat_redirect`)
    const url = encodeURI(window.location.href)
    if (url.indexOf('/?code') > -1) {
    const code = this.getUrlParam('code')
    this.getOpenId(code)
    }
},
// 截取当前页面中code值
getUrlParam (name) {
    let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
    let r = window.location.search.substr(1).match(reg)
    if (r != null) {
    return unescape(r[2])
    } else {
    return null
    }
},
// 获取openId
getOpenId (code) {
    $http.getOpenId({ code }, mpkey).then(res => {
    if (res.succeed) {
        window.localStorage.setItem('openId', res.data.openId)
        history.replaceState(
        '',
        '',
        `${window.location.origin}/#/herdGoodsList/12101`
        )
    }
    })
},
```
这里主要是用的`history.replaceState`方法

#### 2.2 通过code调用接口拿到用户`openId`

这步就很简单了，拿到code直接调接口就行

## 总结

微信h5公众号授权不难，但是会有一些坑，主要是地址混乱和回调闪屏的问题，这两点需要注意