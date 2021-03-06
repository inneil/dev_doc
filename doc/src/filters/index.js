export function filterQuery(list, query) {
  return list.filter((item) => {
    return JSON.stringify(item).indexOf(query) > -1
  })
}

export function emptyTo(value) {
  if (value === '' || value === null || value === undefined) {
    return '-'
  } else {
    return value
  }
}

export function formatDate(value, fmt) {
  // let v = value.replace(/-/g, "/").substring(0, 19)
  let date = new Date(value)
  if (date === 'Invalid Date') {
    date = new Date(parseFloat(value))
  }
  if (!fmt) {
    fmt = 'yyyy-MM-dd hh:mm:ss'
  }
  let o = {
    'M+': date.getMonth() + 1, // 月份
    'd+': date.getDate(), // 日
    'h+': date.getHours(), // 小时
    'm+': date.getMinutes(), // 分
    's+': date.getSeconds(), // 秒
    'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
    'S': date.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

export function numberTo(value) {
  if (value === '' || value === null || value === undefined) {
    return 0
  }
  if (typeof value == 'number') {
    return value
  } else {
    value = value.replace(/[^-.0-9]/g, '')
    return parseFloat(value)
  }
}

export function syntaxHighlight(json) {

  if (typeof json != 'string') {

    json = JSON.stringify(json, undefined, 2);

  }

  json = json.replace(/&/g, '&').replace(/</g, '<').replace(/>/g, '>');

  json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    var cls = 'number';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'key';
      } else {
        cls = 'string';
      }
    } else if (/true|false/.test(match)) {
      cls = 'boolean';
    } else if (/null/.test(match)) {
      cls = 'null';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });

  return json;
};