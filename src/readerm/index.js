const Api = require("./api.js");

class Readerm extends Api {
  constructor() {
    super();
  }

  async login(readermVar) {
    const loginResult = await this.loginRequest(readermVar);
    let cookies = loginResult.headers["set-cookie"]
      .map((v) => v.split(";")[0])
      .join("; ");
    this.http.setCookie(cookies);
  }

  async checkIn() {
    const checkResult = await this.checkInRequest();
    return checkResult;
  }
}

module.exports = Readerm;
