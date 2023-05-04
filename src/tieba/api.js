const http = require("./httpInstance.js");
const md5 = require("js-md5");

const FormData = require('form-data');
class Api {
  constructor() {
    this.http = http;
  }
  /** 获取用户所有关注贴吧 */
  LIKE_URL = "https://tieba.baidu.com/mo/q/newmoindex";
  /** 获取用户的tbs */
  TBS_URL = "http://tieba.baidu.com/dc/common/tbs";
  /** 贴吧签到接口 */
  SIGN_URL = "http://c.tieba.baidu.com/c/c/forum/sign";

  async loginRequest(BDUSS) {
    this.BDUSS = BDUSS;
    this.http.setCookie("BDUSS=" + BDUSS);
    const result = await this.http.get(this.TBS_URL, {});
    if (result.headers["set-cookie"].length) {
      this.http.setCookie(
        [
          "BDUSS=" + BDUSS,
          ...result.headers["set-cookie"].map((v) => v.split("; ")[0].trim()),
        ].join("; ")
      );
    }
    if (result.data.is_login === 0) throw new Error("贴吧未登录");
    this.tbs = result.data.tbs;
    return result.data;
  }
  async getFollowRequest() {
    const result = await this.http.get(this.LIKE_URL, {});
    this.followList = result.data.data.like_forum;
    return result.data;
  }

  async checkInRequest(forum_name) {
    forum_name = forum_name.replaceAll("+", "%2B");
    const encode_forum_name = forum_name.replaceAll("%2B", "+");
    let formData = new FormData();
    // formData.append("ie", "utf-8");
    formData.append("kw", forum_name);
    formData.append('tbs', this.tbs);
    formData.append(
      'sign',
      md5("kw=" + encode_forum_name + "tbs=" + this.tbs + "tiebaclient!!!")
    );
    // const data = {
    //   kw: forum_name,
    //   tbs: this.tbs,
    //   sign: md5(
    //     "kw=" + forum_name + "tbs=" + this.tbs + "tiebaclient!!!"
    //   ),
    // };
    const result = await this.http.post(this.SIGN_URL, formData);

    //'160002'  已签到
    //'0'  签到成功
    return result.data;
  }
}

module.exports = Api;
