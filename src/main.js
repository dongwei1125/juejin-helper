const api = require('./api/index')
const msg = require('./msg')
const { log, getCurrent } = require('./utils')
const { REQUEST_RFULFILLED, REQUEST_REJECTED } = require('./const')

// 小贴士
const dailyTips = async () => {
  try {
    const { data = {} } = await api.getDailyCounts()
    const { cont_count: count = 0, sum_count: sum = 0 } = data

    console.log(msg.dailyTips.success(count, sum))
  } catch (err) {
    log(msg.dailyTips.fail(err))
  }
}

// 签到
const checkIn = async () => {
  try {
    const { data = {} } = await api.checkIn()
    const { incr_point: incr = 0, sum_point: sum = 0 } = data

    log(msg.checkIn.success(incr, sum))
  } catch (err) {
    log(msg.checkIn.fail(err))
  }
}

// 沾一沾
const dipLuckcy = async () => {
  try {
    const { data = {} } = await api.getLotteryHistory()
    const lotteries = data.lotteries || []

    log(msg.dipLuckcy.info)

    if (lotteries.length) {
      const [firstLottery] = lotteries
      const { data = {} } = await api.dipLuckcy({ lottery_history_id: firstLottery.history_id })
      const { dip_value: dip = 0, total_value: total = 0 } = data

      log(msg.dipLuckcy.success(dip, total))
    }
  } catch (err) {
    log(msg.dipLuckcy.fail(err))
  }
}

// 免费抽奖
const drawLottery = async () => {
  try {
    const { data = {} } = await api.getFreeCount()
    const { free_count: n = 0 } = data

    log(msg.drawLottery.info(n))

    if (n) {
      const { data = {} } = await api.drawLottery()
      const { lottery_name: lottery = '' } = data

      log(msg.drawLottery.success(lottery))
    }
  } catch (err) {
    log(msg.drawLottery.fail(err))
  }
}

// BugFix
const bugFix = async () => {
  try {
    const { data = [] } = await api.getBug()

    log(msg.bugFix.info(data.length))

    if (data.length) {
      const requests = data.map(item => api.bugFix(item))
      const result = await Promise.allSettled(requests)
      const fulfilled = result.filter(item => item.status === REQUEST_RFULFILLED)
      const rejected = result.filter(item => item.status === REQUEST_REJECTED)

      log(msg.bugFix.success(fulfilled.length, rejected.length))
    }
  } catch (err) {
    log(msg.bugFix.fail(err))
  }
}

const main = async () => {
  const { localTime, serverTimezone } = getCurrent()
  log(msg.systemTips(localTime, serverTimezone))

  await dailyTips()
  await checkIn()
  await dipLuckcy()
  await drawLottery()
  await bugFix()
}

main()