function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function extend(obj1, obj2) {
  for (var i = 0; i < obj2.length; i++) {
    obj1.push(obj2[i]);
  }
  return obj1
}

module.exports = {
  formatTime: formatTime,
  extend: extend
}

function payTransform(){
  
  
}



