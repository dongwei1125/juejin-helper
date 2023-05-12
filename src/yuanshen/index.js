const Api = require("./api.js");

function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

class YuanShen extends Api {
  constructor() {
    super();
  }

  async init() {
    await this.usertInfoRequest();
    console.log('原神用户信息获取成功');
    await this.signInfoRequest();
    console.log('原神签到信息获取成功');
    await this.awardsRequest();
    console.log('原神奖品信息获取成功');
  }

  async checkIn() {
    if (!this.signInfo) {
      return {
        status: "fail",
        message: "获取签到信息失败",
      };
    }
    if (this.signInfo.is_sign) {
      return {
        status: "success",
        message:
          `
连续签到${(this.signInfo.total_sign_day || 0)}天
昵称:${this.userInfo.nickname}
等级:${this.userInfo.level}
`,
      };
    }

    const result = await this.signRequest();

    if (result.message === "OK") {
      await this.signInfoRequest();
      return {
        status: "success",
        message: `
连续签到${this.signInfo.total_sign_day || 0}天
昵称:${this.userInfo.nickname}
等级:${this.userInfo.level}
  `,
      };
    } else {
      return result.message;
    }
  }
}

module.exports = YuanShen;
