var u = navigator.userAgent;
var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
var url = window.location.href;
export function phoneTypeFn() {
    if (isiOS) {
        return "ios"
    } else if (isAndroid){
        return "android"
    }else{
        return "other"
    }
}
export function isWeiXin() {
    var ua = u.toLowerCase();
    if (ua.match(/MicroMessenger/i) == 'micromessenger') {
        return true;
    } else {
        return false;
    }
}
export function getUrlParamFn(urlParams) {
    let reg = new RegExp("(^|&)" + urlParams + "=([^&]*)(&|$)");  //构造一个含有目标参数的正则表达式对象
    let regUrl = window.location.search.substr(1).match(reg);
    if (regUrl != null) return unescape(regUrl[2]);
    return null;
};