const Api = require("./api.js");

function sleep(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time);
  });
}

class TieBa extends Api {
  constructor() {
    super();
  }

  async init(BDUSS) {
    await this.loginRequest(BDUSS);
    console.log("百度贴吧登陆成功");
    await this.getFollowRequest();
    console.log("百度贴吧收藏列表获取成功");
  }

  async checkIn() {
    let success = 0,
      all = this.followList.length,
      fail = 0;
    let list = [...this.followList],
      temp = [],
      c = 5;
    while (c-- > 0 && list.length !== 0) {
      for (let i = 0; i < list.length; i++) {
        let ok = false;
        try {
          const { error_code, error_msg } = await this.checkInRequest(
            list[i].forum_name
          );
          if (error_code === "160002" || error_code === "0") {
            ok = true;
            console.log(
              list[i].forum_name,
              "签到成功",
              `     请求次数${j + 1}`
            );
          } else {
            console.log(
              list[i].forum_name,
              "签到失败",
              `     请求次数${j + 1}`,
              error_code,
              error_msg
            );
          }
        } catch (e) {
          console.log(
            list[i].forum_name,
            "签到失败",
            `     请求次数${j + 1}`,
            e.stack
          );
        }
        await sleep(1000 * 10);
        if (ok) success++;
        else {
          temp.push(list[i]);
        }
      }
      list = temp;
      temp = [];
      if (list.length > 0 && c > 0) await sleep(1000 * 60 * 5);
    }
    fail = list.length;
    return {
      success,
      all,
      fail,
    };
  }
}

module.exports = TieBa;
