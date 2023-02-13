const axios = require('axios')
const { SEVER_TOKEN } = require('../ENV.js')
const SUCCESS_CODE = 200

const pushplus = async ({ title = '', content = '' } = {}) => {
  try {
    await axios
      .post('https://sctapi.ftqq.com/'+SEVER_TOKEN+'.send', data={
        text:title,
        desp:content,
      })
      .then(response => {
        if (response?.data.errcode !== 0) {
          throw new Error(response?.data?.msg)
        }
      })
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = pushplus
