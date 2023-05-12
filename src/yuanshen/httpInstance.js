const { v4: uuidv4 } = require("uuid");
const crypto = require("node:crypto");
const { MIHAYOU } = require("../ENV.js");
const axios = require("axios");
const SUCCESS_CODE = 200;

function md5Hex(data) {
  const hash = crypto.createHash("md5");

  const update = (buffer) => {
    const inputEncoding = typeof buffer === "string" ? "utf8" : undefined;
    hash.update(buffer, inputEncoding);
  };

  if (Array.isArray(data)) {
    for (const element of data) {
      update(element);
    }
  } else {
    update(data);
  }

  return hash.digest("hex");
}

const GetRandomStr = (e) => {
  const d = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678";
  const t = d.length;
  let n = "";
  for (var i = 0; i < e; i++) n += d.charAt(Math.floor(Math.random() * t));
  return n;
};

const GetDS = () => {
  const n = "9nQiU3AV0rJSIBWgdynfoGMGKaklfbM7";
  const i = Math.floor(new Date().getTime() / 1000) + "";
  const r = GetRandomStr(6);
  const c = md5Hex(`salt=${n}&t=${i}&r=${r}`);
  return `${i},${r},${c}`;
};

const GetHeaders = () => {
  const headers = {
    "accept-language":
      "zh-CN,zh;q=0.9,ja-JP;q=0.8,ja;q=0.7,en-US;q=0.6,en;q=0.5",
    "x-rpc-device_id": uuidv4().replace("-", "").toLocaleUpperCase(),
    "User-Agent":
      "Mozilla/5.0 (iPhone; CPU iPhone OS 14_0_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) miHoYoBBS/2.34.1",
    Referer:
      "https://webstatic.mihoyo.com/bbs/event/signin-ys/index.html?bbs_auth_required=true&act_id=e202009291139501&utm_source=bbs&utm_medium=mys&utm_campaign=icon",
    Host: "api-takumi.mihoyo.com",
    "x-rpc-channel": "appstore",
    "x-rpc-app_version": "2.34.1",
    "x-requested-with": "com.mihoyo.hyperion",
    "x-rpc-client_type": "5",
    "Content-Type": "application/json;charset=UTF-8",
    DS: GetDS(),
  };
  headers["cookie"] = MIHAYOU;
  return headers;
};

const http = axios.create({});
http.interceptors.request.use(
  (config) => {
    config.headers = GetHeaders();
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    if (response?.status !== SUCCESS_CODE) {
      return Promise.reject(response);
    }

    return Promise.resolve(response ?? {});
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.setCookie = (cookie) => {
  http.defaults.headers.cookie = cookie;
};

module.exports = http;
