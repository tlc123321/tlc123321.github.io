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

#### 2.2 通过code调用接口拿到用户`openId`