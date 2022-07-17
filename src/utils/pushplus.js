const fetch = require('node-fetch')
const { PUSHPLUS_TOKEN } = require('../ENV.js')

const pushplus = async ({ title = '', content = '' } = {}) => {
  try {
    const responce = await fetch('http://www.pushplus.plus/send', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        token: PUSHPLUS_TOKEN,
        template: 'markdown',
        title,
        content,
      }),
    })

    return await responce.json()
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = pushplus