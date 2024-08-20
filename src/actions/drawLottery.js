const { wait } = require('../utils/utils.js')
const { DRAW_LOTTERY_PAGE, DRAW_LOTTERY_API } = require('../const.js')

const SIGN_IN_SELECTOR = '.text-free.text'

async function drawLottery(browser, cookie, growth) {
  const page = await browser.newPage()

  await page.setCookie(...cookie)
  await page.setViewport({ width: 1280, height: 960 })
  await page.goto(DRAW_LOTTERY_PAGE, { waitUntil: 'networkidle0' })
  await wait(10)

  const unDraw = await page.$(SIGN_IN_SELECTOR)
  const onRequestFinished = async requset => {
    const url = requset.url()
    const method = requset.method()

    if (method === 'OPTIONS') return

    if (url.includes(DRAW_LOTTERY_API)) {
      const { data } = await requset.response().json()

      growth.lotteryName = data.lottery_name
      growth.freeDrawed = true
    }
  }

  if (unDraw) {
    page.on('requestfinished', onRequestFinished)
    page.click(SIGN_IN_SELECTOR)

    await wait(10)
  }

  page.close()
}

module.exports = drawLottery