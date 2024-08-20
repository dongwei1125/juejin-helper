module.exports = {
  /**
   * @desc 解析 cookie
   * @param {String} cookie
   * @param {Object} options
   * @returns {Array<Object>}
   */
  parseCookie(cookie, options = {}) {
    const result = []
    const cookies = cookie.split('; ')

    cookies.forEach(item => {
      const [name, value] = item.split('=')

      result.push(Object.assign({ name, value }, options))
    })

    return result
  },

  /**
   * @desc 延时
   * @param {Number} seconds 秒数
   * @returns {Promise}
   */
  wait(seconds = 0) {
    return new Promise(resolve => setTimeout(resolve, seconds * 1000))
  },
}