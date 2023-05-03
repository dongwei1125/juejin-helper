const axios = require('axios')
const SUCCESS_CODE = 200

const http = axios.create({
  baseURL: 'https://readerm.com',
  headers: {
    'origin':"https://readerm.com",
    'content-type': 'application/json',
    'referer': 'https://readerm.com/auth/login/',
    'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': 'Windows',
    'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
  },
})

http.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

http.interceptors.response.use(
  response => {
    if (response?.status !== SUCCESS_CODE) {
      return Promise.reject(response)
    }

    return Promise.resolve(response ?? {})
  },
  error => {
    return Promise.reject(error)
  }
)

http.setCookie = cookie => {
  http.defaults.headers.cookie = cookie
}

module.exports = http