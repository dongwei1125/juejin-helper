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

  async init(BDUSS) {
    await this.usertInfoRequest();
    await this.signInfoRequest();
    await this.awardsRequest();
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
    if (!this.signInfo.first_bind) {
      return {
        status: "fail",
        message: "当前账号未绑定原神角色",
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
