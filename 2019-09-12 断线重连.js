// 请求
async function request(arg) {
  return 10000
}

// 延时
const waiting = function (waitTime) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, waitTime);
  })
}

// 尝试重连
async function tryConnect(requestPromise, leftChance = 3) {

  // 重连
  let anwser;
  if (leftChance <= 0) {
    return '暂无回答'
  }
  try {
    anwser = await requestPromise;
    console.log(`尝试第${leftChance}次,参数:${arg},结果:${anwser}`)
    if (!anwser) {
      //进入尝试
      await waiting(1000);
      return tryConnect(arg, leftChance - 1);
    }
    return anwser;
  } catch (err) {
    return '报错'
  }
}


class IntervalRequest {
  constructor(requestPromise, leftChance, intervalTime) {
    this.requestPromise = requestPromise;
    this.leftChance = leftChance || 3;
    this.intervalTime = intervalTime;

    return this.init();
  }

  static sleep(waitTime) {
    return new Promise(function (resolve, reject) {
      setTimeout(resolve, waitTime);
    })
  }

  init() {
    return this.tryConnect(this.requestPromise, this.leftChance)
  }

  // 尝试重连
  async tryConnect(requestPromise, leftChance) {
    // 重连
    let anwser;
    if (leftChance <= 0) {
      return '暂无回答'
    }
    try {
      anwser = await requestPromise();
      console.log(`尝试第${leftChance}次,结果:${anwser}`)
      if (!anwser) {
        //进入尝试
        await IntervalRequest.sleep(this.intervalTime);
        return this.tryConnect(arg, leftChance - 1);
      }
      return anwser;
    } catch (err) {
      return '报错'
    }
  }
}

// 主函数
async function main() {
  console.log('start')
  // const ant = await tryConnect('<参数A>')


  // 发现这种封装意义不大，因为一般面向处理数据
  const ant = await new IntervalRequest(request, 3)
  console.log(`最终结果:${ant}`)
  console.log('end')
}
main()
