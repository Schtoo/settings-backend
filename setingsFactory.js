module.exports = function() {
  var callCost = 0;
  var smsCost = 0;
  var callValue = 0;
  var smsValue = 0;
  var warningValue = 0;
  var criticalValue = 0;
  var totals = 0;

  function WhichType(checkedBill) {
    if (totals > criticalValue) {
      return;
    }
    if (checkedBill === 'call') {
      callValue += callCost;
    }
    if (checkedBill === 'sms') {
      smsValue += smsCost;
    }
  }

  function UpdateValues(call, sms) {
    callCost = parseFloat(call);
    smsCost = parseFloat(sms);
  }

  function UpdateAlerts(warning, danger) {
    warningValue = parseFloat(warning);
    criticalValue = parseFloat(danger);
  }

  function totalAlert() {
    if (totals > criticalValue) {
      return "danger";
    } else if (totals > warningValue) {
      return "warning";
    }
  }

  function Calls() {
    return callValue.toFixed(2);
  }

  function Sms() {
    return smsValue.toFixed(2);
  }

  function BothEqual() {
    totals = callValue + smsValue;
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
    UpdateValues,
    UpdateAlerts,
    totalAlert,
    screenBehaviour,
    screenAlert
  }
}
