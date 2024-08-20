const { wait } = require('../utils/utils.js')
const { INFO_API, SIGN_IN_PAGE, COUNTS_URL, POINTS_URL } = require('../const.js')

async function getGroth(browser, cookie, growth) {
  const page = await browser.newPage()

  await page.setCookie(...cookie)
  await page.setViewport({ width: 1280, height: 960 })

  const onRequestFinished = async requset => {
    const url = requset.url()
    const method = requset.method()

    if (method === 'OPTIONS') return

    if (url.includes(INFO_API)) {
      const { data } = await requset.response().json()

      growth.userName = data.user_basic?.user_name
    }

    if (url.includes(COUNTS_URL)) {
      const { data } = await requset.response().json()

      growth.contCount = data.cont_count
      growth.sumCount = data.sum_count
    }

    if (url.includes(POINTS_URL)) {
      const { data } = await requset.response().json()

      growth.sumPoint = data
    }
  }

  page.on('requestfinished', onRequestFinished)

  await page.goto(SIGN_IN_PAGE, { waitUntil: 'networkidle0' })
  await wait(10)

  page.close()
}

module.exports = getGroth