const axios = require('axios')
const SUCCESS_CODE = 0

const http = axios.create({
  baseURL: 'https://api.juejin.cn',
  headers: {
    'content-type': 'application/json', 
    'origin': 'https://juejin.cn', 
    'referer': 'https://juejin.cn/', 
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/127.0.0.0 Safari/537.36'
  },
})

http.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

http.interceptors.response.use(
  response => {
    if (response?.data?.err_no !== SUCCESS_CODE) {
      return Promise.reject(response)
    }

    return Promise.resolve(response?.data?.data ?? {})
  },
  error => {
    return Promise.reject(error)
  }
)

http.setCookie = cookie => {
  http.defaults.headers.cookie = cookie
}

module.exports = http