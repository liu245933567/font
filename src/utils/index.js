/**
 * js获取url地址，如： http://localhost:8083/
 * @returns {String} BASEURL
 */
export function getRootHost () {
  var curWwwPath = window.document.location.href;
  var pathName = window.document.location.pathname;
  var pos = curWwwPath.indexOf(pathName);
  var localhostPaht = curWwwPath.substring(0, pos);
  return localhostPaht;
}