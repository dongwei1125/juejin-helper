const http = require('./httpInstance.js')

class Api {
  constructor() {
    this.http = http
  }


  loginRequest(readermVar){
    return this.http.post('/auth/login',{
      email:readermVar,
      passwd:readermVar,
      code:''
    })
  }
  checkInRequest(readermVar){
    return this.http.post('/user/checkin')
  }
}

module.exports = Api