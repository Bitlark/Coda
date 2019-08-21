async function getBookingValidationResult(ctx, soaParams) {
  let setTimeoutNo;
  let requestTimes = 1;
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

      if (requestTimes <= 3) {
        soaRes = getBookingValidationResult(ctx, soaParams);
        requestTimes++;
      }
    }, i === 1 ? interval : 0);
  }
  return soaRes;
}