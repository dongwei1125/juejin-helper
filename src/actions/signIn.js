const { wait } = require('../utils/utils.js')
const { SIGN_IN_PAGE, SIGN_IN_API } = require('../const.js')

const SIGN_IN_SELECTOR = '.signin.btn'

async function signIn(browser, cookie, growth) {
  const page = await browser.newPage()

  await page.setCookie(...cookie)
  await page.setViewport({ width: 1280, height: 960 })
  await page.goto(SIGN_IN_PAGE, { waitUntil: 'networkidle0' })
  await wait(10)

  const unSign = await page.$(SIGN_IN_SELECTOR)
  const onRequestFinished = async requset => {
    const url = requset.url()
    const method = requset.method()

    if (method === 'OPTIONS') return

    if (url.includes(SIGN_IN_API)) {
      const { data } = await requset.response().json()

      growth.incrPoint = data.incr_point
      growth.signedIn = true
    }
  }

  if (unSign) {
    page.on('requestfinished', onRequestFinished)
    page.click(SIGN_IN_SELECTOR)

    await wait(10)
  }

  page.close()
}

module.exports = signIn