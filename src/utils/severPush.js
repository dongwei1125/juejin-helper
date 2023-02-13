const axios = require('axios')
const SUCCESS_CODE = 200

const pushplus = async ({ title = '', content = '' } = {}) => {
  try {
    await axios
      .post('https://sctapi.ftqq.com/SCT171405TOF67UqDftoBLwwCoid2k9e1k', data={
        text:title,
        desc:content,
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
