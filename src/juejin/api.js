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
   * @desc 围观大奖记录
   * @param page_no
   * @param page_size
   * @returns {Promise<*>}
   * {
   *   count: Number 数量
   *   lotteries: [
   *     {
   *       history_id: String 记录 ID
   *     }
   *   ]
   * }
   */
  getLotteryHistory({ page_no = 1, page_size = 5 } = {}) {
    return this.http.post('/growth_api/v1/lottery_history/global_big', { page_no, page_size })
  }

  /**
   * @desc 沾喜气
   * @param lottery_history_id
   * @returns {Promise<*>}
   * {
   *   dip_value: Number 幸运值
   *   total_value: Number 总幸运值
   *   has_dip: Boolean 是否沾过
   * }
   */
  dipLucky(lottery_history_id) {
    return this.http.post('/growth_api/v1/lottery_lucky/dip_lucky', { lottery_history_id })
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
}

module.exports = Api