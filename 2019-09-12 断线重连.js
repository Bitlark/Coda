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
async function tryConnect(arg) {
  const MAX_TRY = 3
  let count = 1;

  // 重连
  async function letTry(arg) {
    let anwser;
    if (count > MAX_TRY) {
      return '暂无回答'
    }
    try {
      anwser = await request(arg);
      console.log(`尝试第${count}次,参数:${arg},结果:${anwser}`)
      if (!anwser) {
        //进入尝试
        await waiting(1000);
        count += 1;
        return await letTry(arg);
      }
      return anwser;
    } catch (err) {
      return '报错'
    }
  }

  return await letTry(arg);
}


// 主函数
async function main() {
  console.log('start')
  const ant = await tryConnect('<参数A>')
  console.log(`最终结果:${ant}`)
  console.log('end')
}
main()
