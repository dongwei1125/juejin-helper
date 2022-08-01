const fetch = require('../juejin/node-fetch.js')
const { DINGDING_WEBHOOK } = require('../ENV.js')

const dingding = async ({ title = '', content = '' } = {}) => {
  try {
    const responce = await fetch(DINGDING_WEBHOOK, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        msgtype: 'markdown',
        markdown: {
          title,
          text: content,
        },
      }),
    })

    return await responce.json()
  } catch (error) {
    console.log(error.stack)
  }
}

module.exports = dingding