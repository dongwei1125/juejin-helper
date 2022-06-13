const axios = require('axios')
const { baseURL, cookie } = require('../config.js')
const { SUCCESS_CODE } = require('../const.js')

const request = axios.create({
  baseURL,
  headers: { cookie },
})

request.interceptors.response.use(response => {
  const { data } = response

  if (data.err_no === SUCCESS_CODE) {
    return Promise.resolve(data)
  } else {
    return Promise.reject(data)
  }
})

module.exports = request