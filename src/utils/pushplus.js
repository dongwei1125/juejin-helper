const axios = require('axios')
const { PUSHPLUS_TOKEN } = require('../ENV.js')
const SUCCESS_CODE = 200

const pushplus = async ({ title = '', content = '' } = {}) => {
  try {
    await axios
      .post('http://www.pushplus.plus/send', {
        token: PUSHPLUS_TOKEN,
        template: 'markdown',
        title,
        content,
      })
      .then(response => {
        if (response?.data?.code !== SUCCESS_CODE) {
          throw new Error(response?.data?.msg)
        }
      })
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = pushplus