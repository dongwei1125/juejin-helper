const axios = require('axios')
const { SEVER_TOKEN } = require('../ENV.js')
const SUCCESS_CODE = 200

const pushplus = async ({ title = '', content = '' } = {}) => {
  const url = 'https://sctapi.ftqq.com/'+ SEVER_TOKEN +'.send';
  try {
    await axios
      .post(url, data={
        text:title,
        desp:content,
      })
      .then(response => {
        if (response?.data.code !== SUCCESS_CODE) {
          throw new Error(response?.data?.msg)
        }
      })
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = pushplus
