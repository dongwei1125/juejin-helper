/*
 * @Author: wangjiaxiang
 * @Date: 2024-08-06 17:40:40
 * @LastEditTime: 2024-08-06 19:00:53
 * @LastEditors: wangjiaxiang
 * @Description: 
 * @FilePath: /juejin-helper/src/juejin/api.js
 * 
 */
const http = require('./httpInstance.js')
const { MS_TOKEN, A_BOGUS,UUID,COOKIE } = require('../ENV.js')
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
    return this.http.get('/growth_api/v2/get_today_status')
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
    console.log('获取抽奖次数')
    return this.http.get(`/growth_api/v1/lottery_config/get?aid=2608&uuid=7037344485533779463&spider=0&msToken=aL3g9UniKSuTGY5WhOnF2SJKlfC99sJKWC5JzaCCCV8YjhVPxwFKCiP2iyI5-h_uA1oYqCGitKBrpjm6-AxZMplsMPMxcA9jERaweD8OZWgN1r6m2C9wPpdfJ-R_PQrUCQ%3D%3D&a_bogus=Q6Um6O2eMsm1jf3y%2F7Dz9yimyZ60YWRRgZEFafsE-0wL`)
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