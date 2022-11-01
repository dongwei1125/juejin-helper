const axios = require('axios')
const { FEISHU_WEBHOOK } = require('../ENV.js')
const SUCCESS_CODE = 0

const feishu = async ({ title = '', content = '' } = {}) => {
  try {
    await axios.post(FEISHU_WEBHOOK, template(title, content)).then(response => {
      if (response?.data?.StatusCode !== SUCCESS_CODE) {
        throw new Error(response?.data?.msg)
      }
    })
  } catch (error) {
    console.log(error.stack)
  }
}

const template = (title, content) => ({
  msg_type: 'interactive',
  card: {
    header: {
      title: {
        tag: 'plain_text',
        content: title,
      },
    },
    elements: [
      {
        tag: 'div',
        text: {
          content,
          tag: 'lark_md',
        },
      },
    ],
  },
})

module.exports = feishu