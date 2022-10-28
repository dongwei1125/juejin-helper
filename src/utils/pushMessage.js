const dingding = require('./dingding.js')
const email = require('./email.js')
const pushplus = require('./pushplus.js')
const feishu = require('./feishu.js')
const { DINGDING_WEBHOOK, EMAIL, AUTHORIZATION_CODE, PUSHPLUS_TOKEN, FEISHU_WEBHOOK } = require('../ENV.js')

const pushMessage = ({ type, message }) => {
  console.log(message)

  DINGDING_WEBHOOK && dingding(formatToMarkdown({ type, message }))
  EMAIL && AUTHORIZATION_CODE && email(formatToHTML({ type, message }))
  PUSHPLUS_TOKEN && pushplus(formatToMarkdown({ type, message }))
  FEISHU_WEBHOOK && feishu(formatToMarkdown({ type, message }))
}

const formatToMarkdown = ({ type, message }) => {
  if (type === 'info') {
    // 加号或数字加粗
    message = message.replace(/\+?\d+/g, ' **$&** ')
  }

  // 引用换行
  message = message.replace(/\n/g, ' \n\n > ').replace(/ +/g, ' ')

  return {
    title: `签到${type === 'info' ? '成功 🎉' : '失败 💣'}`,
    content: message,
  }
}

const formatToHTML = ({ type, message }) => {
  if (type === 'info') {
    // 加号或数字加粗
    message = message.replace(/\+?\d+/g, ' <b>$&</b> ')
  }

  return {
    title: `签到${type === 'info' ? '成功 🎉' : '失败 💣'}`,
    content: `<pre>${message}</pre>`,
  }
}

module.exports = pushMessage