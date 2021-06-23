let requestTimes = 1; // 递归依赖于一个全局的
async function getBookingValidationResult(ctx, soaParams) {
  let interval = 3000;
  let soaRes = await SOA({
    ctx,
    serviceCode: "12672",
    methodName: "BookingValidation",
    params: soaParams
  }, false);
  if (!soaRes ||
    !soaRes.bookingValidationResult ||
    !soaRes.bookingValidationResult.BookabilityInfo ||
    !soaRes.bookingValidationResult.BookabilityInfo.BookabilityStatus ||
    soaRes.bookingValidationResult.BookabilityInfo.BookabilityStatus === "IN_PROCESS" ||
    soaRes.bookingValidationResult.BookabilityInfo.BookabilityStatus === "Fail") {

    let setTimeoutNo = setTimeout(() => {
      if (requestTimes <= 3) {
        soaRes = getBookingValidationResult(ctx, soaParams);
        requestTimes += 1;
      } else {
        clearTimeout(setTimeoutNo);
        return; // 失败的返回： 是返回某个值，或者抛出异常
      }
    }, i === 1 ? interval : 0); // 这个 i 哪里来的
  }
  return soaRes;
}

// 顺便提及
// 如果抛出异常，初始化调用方需要捕捉异常
// call getBookingValidationResult