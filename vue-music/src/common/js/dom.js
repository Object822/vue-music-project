// 判断元素是否含有某个Class值
export function hasClass (obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
// removeClass
export function removeClass (obj, cls) {
  if (hasClass(obj, cls)) {
    var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)')
    obj.className = obj.className.replace(reg, '')
  }
}
// addClass
export function addClass (obj, cls) {
  if (!hasClass(obj, cls)) {
    obj.className += ' ' + cls
  }
}