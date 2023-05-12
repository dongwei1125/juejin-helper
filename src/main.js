const Juejin = require("./juejin/index.js");
const Readerm = require("./readerm/index.js");
const Tieba = require("./tieba/index.js");
const YuanShen = require("./yuanshen/index.js");
const pushMessage = require("./utils/pushMessage.js");
const { wait, getRandomArbitrary } = require("./utils/utils.js");
const { COOKIE, READERM, BDUSS, MIHAYOU } = require("./ENV.js");

const growth = {
  userName: "", // 用户名
  checkedIn: false, // 是否签到
  incrPoint: 0, // 签到获得矿石数
  sumPoint: 0, // 总矿石数
  contCount: 0, // 连续签到天数
  sumCount: 0, // 累计签到天数
  dippedLucky: false, // 是否沾喜气
  dipValue: 0, // 幸运值
  luckyValue: 0, // 总幸运值
  freeCount: 0, // 免费抽奖次数
  freeDrawed: false, // 是否免费抽奖
  lotteryName: "", // 奖品名称
  collectedBug: false, // 是否收集 Bug
  collectBugCount: 0, // 收集 Bug 的数量
};

const message = () => {
  return `
Hello ${growth.userName}
${growth.checkedIn ? `签到 +${growth.incrPoint} 矿石` : "今日已签到"}
当前矿石数 ${growth.sumPoint}
连续签到天数 ${growth.contCount}
累计签到天数 ${growth.sumCount}
${growth.dippedLucky ? "今日已经沾过喜气" : `沾喜气 +${growth.dipValue} 幸运值`}
当前幸运值 ${growth.luckyValue}
免费抽奖次数 ${growth.freeCount}
${growth.freeDrawed ? `恭喜抽中 ${growth.lotteryName}` : "今日已免费抽奖"}
${
  growth.collectedBug ? `收集 Bug +${growth.collectBugCount}` : "暂无可收集 Bug"
}
`.trim();
};

const juejinMain = async () => {
  const juejin = new Juejin();

  // 登录
  try {
    await juejin.login(COOKIE);

    growth.userName = juejin.user.user_name;
  } catch {
    throw new Error("登录失败, 请尝试更新 Cookies");
  }

  // 签到
  const checkIn = await juejin.getTodayStatus();

  if (!checkIn) {
    const checkInResult = await juejin.checkIn();

    growth.checkedIn = true;
    growth.incrPoint = checkInResult.incr_point;
  }

  // 签到天数
  const counts = await juejin.getCounts();

  growth.contCount = counts.cont_count;
  growth.sumCount = counts.sum_count;

  // 沾喜气
  const lotteryHistory = await juejin.getLotteryHistory();
  const lotteries = lotteryHistory.lotteries || [];

  if (lotteries.length > 0) {
    const [firstLottery] = lotteries;
    const dipLuckyResult = await juejin.dipLucky(firstLottery.history_id);

    growth.dippedLucky = dipLuckyResult.has_dip;
    growth.dipValue = dipLuckyResult.dip_value;
    growth.luckyValue = dipLuckyResult.total_value;
  }

  // 免费抽奖
  const lotteryConfig = await juejin.getLotteryConfig();
  growth.freeCount = lotteryConfig.free_count || 0;

  if (growth.freeCount > 0) {
    const lottery = await juejin.drawLottery();

    growth.freeDrawed = true;
    growth.lotteryName = lottery.lottery_name;
  }

  // 当前矿石数
  growth.sumPoint = await juejin.getCurrentPoint();

  // BugFix
  const notCollectBug = await juejin.getNotCollectBug();

  if (notCollectBug.length > 0) {
    const requests = notCollectBug.map((bug) => {
      return async () => {
        await juejin.collectBug(bug);
        await wait(getRandomArbitrary(1000, 1500));
      };
    });

    for (const request of requests) {
      await request();

      growth.collectBugCount++;
    }

    growth.collectedBug = true;
  }

  pushMessage({
    type: "info",
    message: message(),
    title: "掘金签到成功 🎉",
  });
};

const readermMain = async () => {
  const readerm = new Readerm();
  if (!READERM) return;
  await readerm.login(READERM);
  const result = await readerm.checkIn();
  if (!result.data.msg) return;
  pushMessage({
    type: "info",
    title: `VPN签到成功 🎉`,
    message: `
    ${result.data.msg}
    `.trim(),
  });
};

const tiebaMain = async () => {
  const tieba = new Tieba();
  if (!BDUSS) return;
  await tieba.init(BDUSS);
  const result = await tieba.checkIn();

  pushMessage({
    type: "info",
    title: `贴吧签到成功 🎉`,
    message: `
共：${result.all} 个
成功：${result.success} 个
失败：${result.fail} 个
    `.trim(),
  });
};

const yuanshenMain = async () => {
  if (!MIHAYOU) return;
  const yuanShen = new YuanShen();
  try {
    await yuanShen.init();
  } catch (e) {
    pushMessage({
      type: "error",
      title: `原神签到失败 💣`,
      message: `
原神签到失败，请检查cookie或其他相关配置
${e.stack}
      `.trim(),
    });
    return;
  }
  const result = await yuanShen.checkIn();

  pushMessage({
    type: "info",
    title: `原神签到${result.status === "success" ? "成功 🎉" : "失败 💣"}`,
    message: result.message.trim(),
  });
};

juejinMain().catch(error => {
  pushMessage({
    type: 'error',
    title: `掘金签到失败 💣`,
    message: error.stack,
  })

})
readermMain().catch(error => {
  pushMessage({
    type: 'error',

    title: `VPN签到失败 💣`,
    message: error.stack,
  })
})

tiebaMain().catch(error => {
  pushMessage({
    type: 'error',
    title: `贴吧签到失败 💣`,
    message: error.stack,
  })
})

yuanshenMain().catch((error) => {
  pushMessage({
    type: "error",
    title: `原神签到失败 💣`,
    message: error.stack,
  });
});
