module.exports = {
  /**
   * @desc 延时
   * @param {Number} duration 毫秒数
   * @returns {Promise<*>}
   */
  wait(duration) {
    return new Promise(resolve => setTimeout(resolve, duration))
  },
  /**
   * @desc 生成指定值之间的随机数，含最小值，不含最大值
   * @param {Number} start 最小值
   * @param {Number} end 最大值
   * @returns {Number}
   */
  getRandomArbitrary(start = 1000, end = 1500) {
    return ~~(Math.random() * (end - start) + start)
  },
}