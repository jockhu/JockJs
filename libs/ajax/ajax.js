/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是ajax核心文件，
 *
 *
 * @path: ajax/ajax.js
 * @author: Jock
 * @version: 1.0.1
 * @date: 2012/10/19
 *
 */


(function(J, W){

    /**
     * 初始配置
     * @param {String} method                 请求发送的类型。默认为GET
     * @param {Boolean} async                 是否异步请求。默认为true（异步）
     * @param {String | Object} data         需要发送的数据。
     * @param {Object} headers               要设置的头信息
     * @return {Function} onSuccess           请求成功时触发，      function(XMLHttpRequest xhr, string responseText)
     * @return {Function} onFailure           请求失败时触发，      function(XMLHttpRequest xhr)
     * @return {Function} onBeforerequest     发送请求之前触发，    function(XMLHttpRequest xhr)
     * @return {Function} onTimeout           发送请求超时触发，    function(XMLHttpRequest xhr)
     * @param {String} cache                 是否需要缓存，默认为true（缓存）
     */
    var defaultOpts = {
        method : 'GET',
        async  : true,
        data   : '',
        headers : '',
        onSuccess : '',
        onFailure : '',
        onBeforerequest : '',
        onTimeout:'',
        cache : true,
        timeout: '',
        type : ''
    }, encode = encodeURIComponent, ajax;

    function Ajax(url, options, mode){

        var opts,eventHandlers = {}, timer;

        options = J.isFunction(options) ? {onSuccess : options} : options;
        opts = J.mix(defaultOpts, options || {}, true);
        ( mode == 'getJSON' ) ? opts.type = 'JSON' : opts.method = mode.toUpperCase();

        J.each("onSuccess onFailure onBeforerequest onTimeout".split(' '), function(i, k){
            eventHandlers[k] = opts[k];
        });

        try {
            var xhr = getXHR(),
            method  = opts.method,
            async   = opts.async,
            headers = opts.headers,
            data    = opts.data,
            timeout = opts.timeout,
            cache   = opts.cache;

            headers['X-Request-With'] = 'XMLHttpRequest';

            if ( data && !J.isString(data) )
                data = param(data);
            if ( method == "GET" ) {
                if (data) {
                    url += (url.indexOf('?') > 0 ? '&' : '?') + data;
                    data = null;
                }
                if(!cache)
                    url += (url.indexOf('?') > 0 ? '&' : '?') + 'J' + +new Date() + '=0';
            }

            xhr.open(method, url, async);

            if (async) {
                xhr.onreadystatechange = stateChangeHandler;
            }

            // 在open之后再进行http请求头设定
            if (method == 'POST') {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }

            for (var key in headers) {
                if (headers.hasOwnProperty(key)) {
                    xhr.setRequestHeader(key, headers[key]);
                }
            }

            fire('Beforerequest');

            if (timeout) {
                timer = setTimeout(function(){
                    xhr.onreadystatechange = function () {};
                    xhr.abort();
                    fire("Timeout");
              }, parseInt(timeout));
            }

            xhr.send(data);

            if (!async) {
                stateChangeHandler();
            }
        } catch (ex) {
            fire('Failure');
        }


        function param( a ) {
            var s = [ ];
            function add( key, value ){
                s[ s.length ] = encode(key) + '=' + encode(value);
            }
            for ( var j in a )
                add( j, J.isFunction(a[j]) ? a[j]() : a[j] );
            return s.join("&").replace(/%20/g, "+");
        }

        /**
         * readyState发生变更时调用
         *
         * @ignore
         */
        function stateChangeHandler() {
            if (xhr.readyState == 4) {
                try {
                    var stat = xhr.status;
                } catch (ex) {
                    // 在请求时，如果网络中断，Firefox会无法取得status
                    fire('Failure');
                    return;
                }

                if ((stat >= 200 && stat < 300) || stat == 304 || stat == 1223) {
                    fire('Success');
                } else {
                    fire('Failure');
                }
                xhr.onreadystatechange = function () {};
                if (async) {
                    xhr = null;
                }
            }
        }

        /**
         * 获取XMLHttpRequest对象
         *
         * @ignore
         * @return {XMLHttpRequest} XMLHttpRequest对象
         */
        function getXHR() {
            if (W.ActiveXObject) {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {}
                }
            }
            if (W.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
        }

        /**
         * 触发事件
         *
         * @ignore
         * @param {String} type 事件类型
         */
        function fire(type) {
            type = 'on' + type;
            var handler = eventHandlers[type];
            // 不对事件类型进行验证
            if (handler) {
                if (opts.timeout) {
                    clearTimeout(timer);
                }
                if (type != 'onSuccess') {
                    handler(xhr);
                } else {
                    //处理获取xhr.responseText导致出错的情况,比如请求图片地址.
                    try {
                        xhr.responseText;
                    } catch(error) {
                        return handler(xhr);
                    }
                    handler( opts.type === 'JSON' ? (new Function("return " + xhr.responseText))() : xhr.responseText );
                }
            }
        }

        return xhr;

    }

    ajax = J.add('ajax');

    J.each('get post getJSON'.split(' '), function(i, v){
        /**
         *
         * 发送一个get请求
         *
         * @grammar J.get(url,options)
         *    options.onSuccess
         *    options.onFailure
         *    options.onBeforerequest
         *
         *
         * @name J.ajax.get
         * @param {String} url 请求的url
         * @param {Object|Function} options 参数配置或者回调函数
         * @return {Object}
         *
         */

        /**
         * 发送一个post请求
         *
         * @grammar J.post(url,options)
         *    options.onSuccess
         *    options.onFailure
         *    options.onBeforerequest
         *
         * @name J.ajax.post
         * @param {String} url 请求的url
         * @param {Object|Function} 参数配置或者回调函数
         * @return {Object}
         *
         */

        /**
         * 发送一个get请求，返回JSON格式数据
         *
         * @grammar J.getJSON(url,options)
         *
         * @name J.ajax.getJSON
         * @param {String} url 请求的url
         * @param {Object|Function} 参数配置或者回调函数
         * @return {Object}
         *
         */

        ajax[v] = function(url, options){
            return new Ajax( url, options, v )
        }
    });

    J.mix(J,ajax);

})(J, window);
