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

/// require('lang.isString');



(function(J){
    var doc = document,
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
    function setCookie(name, value, date, path, domain, secure){
        doc.cookie = name + "=" + String(encode( value )) +
                ((date) ? ";expires=" + date.toGMTString() : "") +
                (validString(path) ? ";path=" + path : "") +
                (validString(domain) ? ";domain=" + domain : "" ) +
                ((secure) ? ";secure" : "" );
    }


    J.add('cookie',{
        /**
         * 获取cookie值
         *
         * @param {String} name cookie名称
         * @return {String} cookie值
         */
        get: function (name) {
            var ret, m;
            if (validString(name)) {
                if ((m = String(doc.cookie).match(
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
        set: function(name, value, expires, path, domain, secure) {
            var date;
            if (expires) {
                date = new Date();
                date.setTime(date.getTime() + expires * millisecond);
            }
            setCookie(name, value, date, path, domain, secure)
        },
        /**
         * 删除cookie
         *
         * @param {String} name cookie名称
         * @return null
         */
        remove: function(name, domain, path, secure){
            if (this.get(name)){
                var date = new Date(0);
                setCookie(name, '', date, path, domain, secure)
            }

        }
    });

})(J);

