module.exports = {
  dailyTips: {
    success: (count, sum) => `[小贴士]：连续签到${count}天，累计签到${sum}天，${count === sum ? '加油哦' : '注意补签哦'}`,
    fail: (err = {}) => `[小贴士]：失败，原因：${err.err_msg || '未知'}`,
  },
  checkIn: {
    success: (incr = 0, sum = 0) => `[签到]：成功，今日矿石${incr}，总数${sum}`,
    fail: (err = {}) => `[签到]：失败，原因：${err.err_msg || '未知'}`,
  },
  dipLuckcy: {
    info: '[沾一沾]：加载围观大奖列表成功',
    success: (dip = 0, total = 0) => `[沾一沾]：今日幸运值${dip}点，进度${total}/6000`,
    fail: (err = {}) => `[沾一沾]：失败，原因：${err.err_msg || '未知'}`,
  },
  drawLottery: {
    info: (n = 0) => `[抽奖]：免费次数${n}次`,
    success: (lottery = '') => `[抽奖]：恭喜成功抽中${lottery}`,
    fail: (err = {}) => `[抽奖]：失败，原因：${err.err_msg || '未知'}`,
  },
  bugFix: {
    info: (n = 0) => `[BugFix]：加载Bug列表成功，共${n}个`,
    success: (fulfilled = 0, rejected = 0) => `[BugFix]：消除成功${fulfilled}个，失败${rejected}个`,
    fail: (err = {}) => `[BugFix]：失败，原因：${err.err_msg || '未知'}`,
  },
  systemTips: (local, timezone) => `[系统提示]：本地时间 ${local}，服务器时区 ${timezone}`,
}