const puppeteer = require('puppeteer')
const pushMessage = require('./utils/pushMessage.js')
const { parseCookie } = require('./utils/utils.js')
const { COOKIE } = require('../env.config.js')
const { BROWSER_COOKIE_DOMAIN } = require('./const.js')

const signIn = require('./actions/signIn.js')
const drawLottery = require('./actions/drawLottery.js')
const getGroth = require('./actions/getGroth.js')

const growth = {
  userName: '', // 用户名
  signedIn: false, // 是否签到
  incrPoint: 0, // 签到获得矿石数
  sumPoint: 0, // 总矿石数
  contCount: 0, // 连续签到天数
  sumCount: 0, // 累计签到天数
  freeDrawed: false, // 是否免费抽奖
  lotteryName: '', // 奖品名称
}

const message = () => {
  return `
Hello ${growth.userName}
${growth.signedIn ? `签到 +${growth.incrPoint} 矿石` : '今日已签到'}
当前矿石数 ${growth.sumPoint}
连续签到天数 ${growth.contCount}
累计签到天数 ${growth.sumCount}
${growth.freeDrawed ? `恭喜抽中 ${growth.lotteryName}` : '今日已免费抽奖'}
`.trim()
}

const main = async () => {
  const browser = await puppeteer.launch({ headless: true })
  const cookie = parseCookie(COOKIE, { domain: BROWSER_COOKIE_DOMAIN })

  await signIn(browser, cookie, growth)
  await drawLottery(browser, cookie, growth)
  await getGroth(browser, cookie, growth)
  await browser.close()

  pushMessage({
    type: 'info',
    message: message(),
  })
}

main().catch(error => {
  pushMessage({
    type: 'error',
    message: error.stack,
  })
})