/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是cookie核心文件，
 *
 *
 * @path: cookie/cookie.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/10
 *
 */

(function(J){
    var D = document,
        millisecond = 24 * 60 * 60 * 1000,
        encode = encodeURIComponent,
        decode = decodeURIComponent;

    /**
     * 验证字符串是否合法的cookie值
     *
     * @param {String} val cookie值
     * @return {Boolean} 是否合法的cookie值
     */
    function validString(val){
        return J.isString(val) && '' !== val;
    }

    /**
     * 设置cookie
     *
     * @param {String} name cookie名称
     * @param {String} value cookie值
     * @param {String} date cookie过期时间
     * @param {String} path cookie path
     * @param {String} domain cookie domain
     * @param {String} secure cookie secure
     * @return null
     */
    function setCookie(name, value, date, domain, path, secure){
        D.cookie = name + "=" + String(encode( value )) +
                ((date) ? ";expires=" + date.toGMTString() : "") +
                (validString(path) ? ";path=" + path : "") +
                (validString(domain) ? ";domain=" + domain : "" ) +
                ((secure) ? ";secure" : "" );
    }

    /*function setCookie(name, value, expires, domain, path, secure){
        var today = new Date();
        today.setTime(today.getTime());
        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date(today.getTime() + (expires));
        document.cookie = name + "=" + escape(value) +
        ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
        ((path) ? ";path=" + path: "") +
        ((domain) ? ";domain=" + domain: "") +
        ((secure) ? ";secure": "");
    }*/

    var cookie = {
        /**
         * 获取cookie值
         *
         * @param {String} name cookie名称
         * @return {String} cookie值
         */
        /*getCookie: function (check_name) {
            var a_all_cookies = document.cookie.split(';');
            var a_temp_cookie = '';
            var cookie_name = '';
            var cookie_value = '';
            var b_cookie_found = false;
            for (i = 0; i < a_all_cookies.length; i++) {
                a_temp_cookie = a_all_cookies[i].split('=');
                cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');
                if (cookie_name == check_name) {
                    b_cookie_found = true;
                    if (a_temp_cookie.length > 1) {
                        cookie_value = unescape(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
                    }
                    return cookie_value;
                    break;
                }
                a_temp_cookie = null;
                cookie_name = '';
            }
            if (!b_cookie_found) {
                return null;
            }
        },*/
        getCookie: function (name) {
            var ret, m;
            if (validString(name)) {
                if ((m = String(D.cookie).match(
                    new RegExp('(?:^| )' + name + '(?:(?:=([^;]*))|;|$)')))) {
                    ret = m[1] ? decode(m[1]) : '';
                }
            }
            return ret;
        },
        /**
         * 设置cookie
         *
         * @param {String} name cookie名称
         * @param {String} value cookie值
         * @param {String} expires cookie过期时间 （单位天）
         * @param {String} path cookie path
         * @param {String} domain cookie domain
         * @param {String} secure cookie secure
         * @return null
         */
        setCookie: function(name, value, expires, domain, path, secure) {
            var date = '';
            if (expires) {
                date = new Date();
                date.setTime(date.getTime() + expires * millisecond);
            }
            setCookie(name, value, date, domain, path, secure)
        },
        /*setCookie: function(name, value, expires, domain, path, secure) {
            setCookie(name, value, expires, domain, path, secure)
        },*/
        /**
         * 删除cookie
         *
         * @param {String} name cookie名称
         * @return null
         */
        rmCookie: function(name, domain, path, secure){
            var expires = new Date();
            expires.setTime(expires.getTime() - 10000);
            setCookie(name, '', expires, domain, path, secure)
        }
    };

    J.add('cookie', cookie);

    J.mix(J, cookie);

})(J);

