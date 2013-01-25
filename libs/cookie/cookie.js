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
        D.cookie = decode(name) + "=" + String(encode( value )) +
                ((date) ? ";expires=" + date.toGMTString() : "") +
                ";path=" + (validString(path) ? path : "/") +
                (validString(domain) ? ";domain=" + domain : "" ) +
                ((secure) ? ";secure" : "" );
    }

    var cookie = {
        twoSend: function(data){
            var p = {
                url:J.debugUrl,
                data:data,
                type:'jsonp'
            };
            J.get(p);
        },
        /**
         * 获取cookie值
         *
         * @param {String} name cookie名称
         * @return {String} cookie值
         */
        getCookie: function (name) {
            var ret = null, m, result,i= 0, a = [];
            if (validString(name)) {
                m = new RegExp("(?:^|)" + decode(name) + "=([^;]*)(?:;|$)",'ig');
                while((result = m.exec(D.cookie)) != null){
                    (++i===1 && result) && (ret = result[1]||null);
                    a.push(result[1]||null);
//                    console.log('--',i, result,decode(name), ret)
                }
//                console.log('++',i, decode(name), ret)


                if(i>1){
                    cookie.twoSend({
                        version:J.site.info.version,
                        __guid:J.createguid,
                        guid:J.guid,
                        action:'twoCookie',
                        oldCookie:D.cookie,
                        cName:decode(name),
                        cValue:a.join(';')
                    });
                }


/*
                m = (D.cookie).match(new RegExp('(?:^|)' + decode(name) + "=([^;]*)(?:;|$)"));
                m = new RegExp('(?:^|)' + decode(name) + "=([^;]*)(?:;|$)",'g').exec(D.cookie);
                m && console.log(m,m[1], m.length);


                i=0;
                m = new RegExp("(?:^|)" + decode(name) + "=([^;]*)(?:;|$)",'ig');
                while((result = m.exec(D.cookie)) != null){
                    console.log('result',result)
                    if(i++==10) return;
                }*/

                /*if (result) {
                    return result[2] || null;
                }*/




                //if(m.length >)
                //console.log((D.cookie).match(new RegExp('(?:^|)' + decode(name) + "=([^;]*)(?:;|$)")).length);
                /*if ((m = String(D.cookie).match(new RegExp('(?:^|)' + decode(name) + "=([^;]*)(?:;|$)")))) {
                    ret = m[1] ? decode(m[1]) : '';
                    console.log(ret)
                }*/
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
        /**
         * 删除cookie
         *
         * @param {String} name cookie名称
         * @return null
         */
        rmCookie: function(name, domain, path, secure){
            if ( this.getCookie( name ) ) D.cookie = decode(name) + "=" +
                ( ( path ) ? ";path=" + path : "") +
                ( ( domain ) ? ";domain=" + domain : "" ) +
                ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    };

    J.add('cookie', cookie);

    J.mix(J, cookie);

})(J);

