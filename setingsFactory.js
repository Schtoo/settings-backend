module.exports = function() {
  var callCost = 0;
  var smsCost = 0;
  var callTotal = 0;
  var smsTotal = 0;
  var warningValue = 0;
  var criticalValue = 0;
  var totals = 0;
  let billRecords = [];

  function WhichType (checkedBill) {
    if (totals > criticalValue) {
      return;
    }
    if (checkedBill === 'call') {
      callTotal += callCost;
      return callTotal;
    }
    if (checkedBill === 'sms') {
      smsTotal += smsCost;
      return smsTotal;
    }
  }

  // These set values

  function UpdateCalls (call) {
    callCost = parseFloat(call);
    return callCost;
  }

  function UpdatingSms (sms) {
    smsCost = parseFloat(sms);
    return smsCost;
  }

  function UpdateWarning (warning) {
    warningValue = parseFloat(warning);
    return warningValue;
  }
  function UpdateCritical (danger) {
    criticalValue = parseFloat(danger);
    return criticalValue;
  }
  
  // These Get Values

  function getCallValue(){
    return callCost;
  }
  function getSmsValue(){
    return smsCost;
  }
  function getWarningValue(){
    return warningValue;
  }
  function getCriticalValue(){
    return criticalValue;
  }

  function totalAlert() {
    if (totals > criticalValue) {
      return "danger";
    } else if (totals > warningValue) {
      return "warning";
    }
  }

  // function records (type) {
  //   let bill = {
  //     price: callCost,
  //     time: new Date(),
  //     billType: type
  //   }

  //   if (type === 'call'){
  //     bill.price
  //   } else if (type === 'sms'){
  //     bill.time
  //   }
  // }
  //These are all the totals
  function Calls() {
    return callTotal.toFixed(2);
  }

  function Sms() {
    return smsTotal.toFixed(2);
  }

  function BothEqual() {
    totals = callTotal + smsTotal;
    return totals.toFixed(2);
  }

  function screenBehaviour() {
    return warningValue.toFixed(2);
  }

  function screenAlert() {
    return criticalValue.toFixed(2);
  }
  return {
    WhichType,
    Calls,
    Sms,
    BothEqual,
    UpdateCalls,
    UpdatingSms,
    UpdateCritical,
    UpdateWarning,
    totalAlert,
    records,
    screenBehaviour,
    screenAlert,
    getCallValue,
    getSmsValue,
    getWarningValue,
    getCriticalValue
  }
}
