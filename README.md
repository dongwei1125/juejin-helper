<p align="center">
  <img src="./docs/logo.svg" />
</p>

<h1 align="center">稀土掘金助手</h1>

<p align="center">
  <a href="https://github.com/remy/nodemon">
    <img src="https://img.shields.io/badge/nodemon-2.0.16-blue.svg" alt="nodemon" />
  </a>
  <a href="https://github.com/node-fetch/node-fetch">
    <img src="https://img.shields.io/badge/node--fetch-2.6.7-brightgreen.svg" alt="node-fetch" />
  </a>
  <a href="https://github.com/nodemailer/nodemailer">
    <img src="https://img.shields.io/badge/nodemailer-6.7.6-important.svg" alt="nodemailer" />
  </a>
</p>

## 简介

&emsp;&emsp;依赖 [GitHub Actions](https://docs.github.com/cn/actions/learn-github-actions/understanding-github-actions) 的稀土掘金助手，用于自动化每日签到、沾喜气、免费抽奖、`BugFix`等。

> 为保证脚本更好的运行，`Fork`仓库后请根据 [指南](https://juejin.cn/post/7108615649777156104#heading-13) 手动启用一次

## 使用

### 环境机密 Secrets

| `Name` | `Value` | `Required` |
| --- | --- | --- |
| `COOKIE` | 稀土掘金用户`cookie` | 是 |
| `EMAIL` | 邮箱地址 | 否 |
| `AUTHORIZATION_CODE` | 邮箱`POP3/SMTP`服务授权码 | 否 |
| `DINGDING_WEBHOOK` | 钉钉机器人`Webhook` | 否 |
| `PUSHPLUS_TOKEN` | 微信公众号`pushplus` `token` | 否 |

### 效果预览

<br/>
<p align="left">
  <img src="./docs/email.png" /></br></br>
  <img src="./docs/dingding.png" /></br></br>
  <img src="./docs/pushplus.png" />
</p>

## 第三方插件

* [nodemon](https://github.com/remy/nodemon)
* [node-fetch](https://github.com/node-fetch/node-fetch)
* [nodemailer](https://github.com/nodemailer/nodemailer)