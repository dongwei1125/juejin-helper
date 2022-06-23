const ChatBot = require('dingtalk-robot-sender');

// 机器人初始化
const robot = new ChatBot({
  webhook: 'https://oapi.dingtalk.com/robot/send?access_token=444119c11739dff3ac9a11e25dfff3e861adbe3cb78de08df1174642737eb21b'
});

module.exports = robot;
