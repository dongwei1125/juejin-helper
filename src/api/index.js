const request = require('./request')

function getDailyCounts() {
  return request({
    method: 'get',
    url: '/growth_api/v1/get_counts',
  })
}

function checkIn() {
  return request({
    method: 'post',
    url: '/growth_api/v1/check_in',
  })
}

function getLotteryHistory() {
  return request({
    method: 'post',
    url: '/growth_api/v1/lottery_history/global_big',
  })
}

function dipLuckcy(data) {
  return request({
    data,
    method: 'post',
    url: '/growth_api/v1/lottery_lucky/dip_lucky',
  })
}

function getFreeCount() {
  return request({
    method: 'get',
    url: '/growth_api/v1/lottery_config/get',
  })
}

function drawLottery() {
  return request({
    method: 'post',
    url: '/growth_api/v1/lottery/draw',
  })
}

function getBug() {
  return request({
    method: 'post',
    url: '/user_api/v1/bugfix/not_collect',
  })
}

function bugFix(data) {
  return request({
    data,
    method: 'post',
    url: '/user_api/v1/bugfix/collect',
  })
}

module.exports = {
  getDailyCounts,
  checkIn,
  getLotteryHistory,
  dipLuckcy,
  getFreeCount,
  drawLottery,
  getBug,
  bugFix,
}