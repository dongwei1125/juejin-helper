const fetch = require('node-fetch')

class Request {
  constructor() {
    this.baseURL = ''
    this.headers = {
      'content-type': 'application/json',
      'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': 'Windows',
    }
  }

  async request(config) {
    const { baseURL, url, method, headers, data } = this.requestInterceptor({
      baseURL: config.baseURL || this.baseURL,
      url: config.url || '',
      method: (config.method || 'get').toLocaleUpperCase(),
      headers: {
        ...this.headers,
        ...(config.headers || {}),
      },
      data: config.data || {},
    })

    const responce = await fetch(baseURL + url, {
      method,
      headers,
      body: method !== 'GET' ? JSON.stringify(data) : undefined,
    })

    return this.responseInterceptor(await responce.json())
  }

  requestInterceptor(config) {
    return config
  }

  responseInterceptor(response) {
    return response
  }

  get(url = '', config = {}) {
    return this.request({
      method: 'get',
      url,
      ...config,
    })
  }

  post(url = '', config = {}) {
    return this.request({
      method: 'post',
      url,
      ...config,
    })
  }
}

module.exports = Request