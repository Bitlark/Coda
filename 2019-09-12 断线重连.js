// 请求
async function request(arg) {
  return null
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
        return await new Promise((resolve, reject) => {
          setTimeout(async () => {
            count += 1;
            const delayAns = await letTry(arg);
            resolve(delayAns)
          }, 1000)
        })
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
