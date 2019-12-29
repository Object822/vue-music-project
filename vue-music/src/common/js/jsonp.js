import originJSONP from 'jsonp'

// 对外暴露方法
export default function jsonp(url, data, option) {
  // 如果url中有问号的话就不加问号了,如果没有则加上
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data)
  // 返回一个promise
  return new Promise((resolve, reject) => {
    // 调用jsonp方法
    originJSONP(url, option, (err, data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}
// 拼接url
function param (data) {
  let url = ''
  // 循环遍历data进行拼接
  for (const k in data) {
    let value = data[k] !== undefined ? data[k] : ''
    // 对url进行转码
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // 去掉url中第一个&符号
  return url ? url.substring(1) : ''
}