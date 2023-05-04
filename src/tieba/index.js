const Api = require("./api.js");

function sleep(time){
  return new Promise(function(resolve){
  setTimeout(resolve, time);
  });
}


class TieBa extends Api {
  constructor() {
    super();
  }

  async init(BDUSS) {
    await this.loginRequest(BDUSS);
    console.log('百度贴吧登陆成功');
    await this.getFollowRequest();
    console.log('百度贴吧收藏列表获取成功');
  }

  async checkIn() {
    let success=0,all=this.followList.length,fail=0;
    if(this.followList.length>0){
      for(let i=0;i<this.followList.length;i++){
        let ok = false;
        for(let j=0;j<5;j++){
          try{
            const {error_code,error_msg} = await this.checkInRequest(this.followList[i].forum_name);
            if(error_code==='160002'||error_code==='0'){
              ok=true;
              console.log(this.followList[i].forum_name,'签到成功',`     请求次数${j+1}`);
            }else{
              console.log(this.followList[i].forum_name,'签到失败',`     请求次数${j+1}`,error_code,error_msg);
            }
          }catch(e){
            console.log(this.followList[i].forum_name,'签到失败',`     请求次数${j+1}`,e.stack);
          }
          if(ok && i !== this.followList.length-1 )await sleep(1000*60*5);
          if(ok)break;
        }
        if(ok)success++;
        else fail++;
      }
    }
    return {
      success,
      all,
      fail
    }
  }
}

module.exports = TieBa;
