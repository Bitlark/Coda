// 请求
async function request(arg) {
  return null
}

// 延时
const waiting = function (waitTime) {
  return new Promise(function (resolve, reject) {
    setTimeout(resolve, waitTime);
  })
}

// 尝试重连
async function tryConnect(arg, leftChance = 3) {

  // 重连
  let anwser;
  if (leftChance <= 0) {
    return '暂无回答'
  }
  try {
    anwser = await request(arg);
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


// 主函数
async function main() {
  console.log('start')
  const ant = await tryConnect('<参数A>')
  console.log(`最终结果:${ant}`)
  console.log('end')
}
main()
