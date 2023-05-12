const http = require("./httpInstance.js");

const act_id = "e202009291139501";

const region = "cn_gf01";

class Api {
  constructor() {
    this.http = http;
  }

  Referer = `https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html?bbs_auth_required=true&act_id=${act_id}&utm_source=bbs&utm_medium=mys&utm_campaign=icon`;

  Host = "api-takumi.mihoyo.com";

  GET_USER_INFO = `https://api-takumi.mihoyo.com/binding/api/getUserGameRolesByCookie?game_biz=hk4e_cn`;

  GET_SIGN_AWARDS = `https://api-takumi.mihoyo.com/event/bbs_sign_reward/home?act_id=${act_id}`;

  POST_SIGN = "https://api-takumi.mihoyo.com/event/bbs_sign_reward/sign";

  GET_SIGN_INFO = `https://api-takumi.mihoyo.com/event/bbs_sign_reward/info?region=${region}&act_id=${act_id}&uid=`;

  async usertInfoRequest() {
    const res = await this.http.get(this.GET_USER_INFO);
    this.userInfo = res.data.data.list[0];
    return res.data.data.list[0];
  }

  async signInfoRequest() {
    const res = await http.get(this.GET_SIGN_INFO + this.userInfo.game_uid);
    this.signInfo = res.data.data;
    return res.data.data;
  }

  async awardsRequest() {
    const res = await http.get(this.GET_SIGN_AWARDS);
    this.awardsInfo = res.data.data;
    return res.data.data;
  }

  async signRequest() {
    const res = await http.post(
      this.POST_SIGN,
      {
        act_id: act_id,
        region: this.userInfo.region,
        uid: this.userInfo.game_uid,
      }
    );
    return res.data;
  }

}

module.exports = Api;
