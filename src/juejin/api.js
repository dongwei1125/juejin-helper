const http = require('./httpInstance.js')

class Api {
  constructor() {
    this.http = http
  }

  /**
   * @desc 用户信息
   * @returns {Promise<*>}
   * {
   *   user_name: String 用户名
   * }
   */
  getUser() {
    return this.http.get('/user_api/v1/user/get')
  }

  /**
   * @desc 当日签到状态
   * @returns {Promise<*>}
   * Boolean 是否签到
   */
  getTodayStatus() {
    return this.http.get('/growth_api/v1/get_today_status')
  }

  /**
   * @desc 签到
   * @returns {Promise<*>}
   * {
   *   incr_point: Number 获得矿石数
   * }
   */
  checkIn() {
    return this.http.post('/growth_api/v1/check_in')
  }

  /**
   * @desc 签到天数
   * @returns {Promise<*>}
   * {
   *   cont_count: Number 连续签到天数
   *   sum_count: Number 累计签到天数
   * }
   */
  getCounts() {
    return this.http.get('/growth_api/v1/get_counts')
  }

  /**
   * @desc 免费抽奖次数
   * @returns {Promise<*>}
   * {
   *   free_count: Number 免费次数
   * }
   */
  getLotteryConfig() {
    return this.http.get('/growth_api/v1/lottery_config/get')
  }

  /**
   * @desc 抽奖
   * @returns {Promise<*>}
   * {
   *   lottery_name: String 奖品名称
   * }
   */
  drawLottery() {
    return this.http.post('/growth_api/v1/lottery/draw')
  }

  /**
   * @desc 当前矿石数
   * @returns {Promise<*>}
   * Number 矿石数量
   */
  getCurrentPoint() {
    return this.http.get('/growth_api/v1/get_cur_point')
  }

  /**
   * @desc 当前幸运值
   * @returns {Promise<*>}
   * {
   *   total_value: 总幸运值
   * }
   */
  getLucky() {
    return this.http.post('/growth_api/v1/lottery_lucky/my_lucky')
  }
}

module.exports = Api