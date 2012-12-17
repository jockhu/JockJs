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


(function (J, W) {

    /**
     * 初始配置
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
        url:'',
        async:true,
        data:'',
        callback:'',
        headers:'',
        onSuccess:'',
        onFailure:'',
        onBeforerequest:'',
        onTimeout:'',
        cache:true,
        timeout:'',
        type:''
    }, encode = encodeURIComponent, ajaxObj;

    function Ajax(url, options, method) {

        var xhr, opts = defaultOpts, eventHandlers = {}, timer, D = document;

        J.isString(url) ? (opts.url = url) : (opts = J.mix(opts, url || {}, true));
        J.isFunction(options) ? (opts.onSuccess = options) : (opts = J.mix(opts, options || {}, true));
        method = method.toUpperCase();

        J.each("onSuccess onFailure onBeforerequest onTimeout".split(' '), function (i, k) {
            eventHandlers[k] = opts[k];
        });

        if (opts.type == 'jsonp') {
            method == 'GET' ? getJSONP() : postJSONP();
        } else {
            return ajax();
        }

        function getJSONP() {
            var script = D.createElement('script'), head = D.head || D.getElementsByTagName( "head" )[0];
            script.async = opts.async;
            script.charset = 'utf-8';
            script.src = buildUrl();
            script.onload = script.onreadystatechange = function (_, isAbort) {
                if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
                    script.onload = script.onreadystatechange = null;
                    if (head && script.parentNode) {
                        head.removeChild(script);
                    }
                    script = undefined;
                    isAbort && fire('Failure');
                }
            };
            head.insertBefore( script, head.firstChild );
        }

        function postJSONP() {
            var guid = '__RGID' + J.getTime().toString(16),
                body = D.body || D.getElementsByTagName( "body" )[0],
                ifContainer = D.createElement('div'),
                form = D.createElement('form'),
                inputs = [], items = opts.data;

            ifContainer.innerHTML = '<iframe style="display:" id="' + guid + '" name="' + guid + '"></iframe>';
            ifContainer.style.display = 'none';

            for (var k in items) {
                inputs.push("<input type='hidden' name='" + k + "' value='" + items[k] + "' />")
            }
            opts.callback && inputs.push("<input type='hidden' name='callback' value='" + opts.callback + "' />");
            form.innerHTML = inputs.join('');
            form.action = opts.url;
            form.method = 'post';
            form.target = guid;
            ifContainer.appendChild(form);
            body.insertBefore( ifContainer, body.firstChild );
            D.getElementById(guid).onload = function(){
                setTimeout(function(){
                    if(body && ifContainer.parentNode)
                        body.removeChild(ifContainer)
                },50);
            };
            form.submit();
        }

        function ajax() {
            try {
                var async = opts.async, headers = opts.headers, data = opts.data, timeout = opts.timeout, aUrl;

                xhr = getXHR();

                headers['X-Request-With'] = 'XMLHttpRequest';

                if (method == 'GET') {
                    aUrl = buildUrl();
                    data = null
                } else {
                    aUrl = opts.url;
                    if (data && !J.isString(data)) (data = param(data));
                }

                xhr.open(method, aUrl, async);

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
                    timer = setTimeout(function () {
                        xhr.onreadystatechange = function () {
                        };
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
            return xhr;
        }

        function buildUrl() {
            var data = opts.data, url = opts.url;
            if (data && !J.isString(data)) (data = param(data));
            if (method == "GET") {
                data && (url += fn() + data);
                (opts.type == 'jsonp' && opts.callback) && (url += fn() + 'callback=' + opts.callback);
                opts.cache || (url += fn() + 'J' + J.getTime())
            }
            function fn() {
                return url.indexOf('?') > 0 ? '&' : '?'
            }

            return url;
        }

        function param(a) {
            var s = [ ];

            function add(key, value) {
                s[ s.length ] = encode(key) + '=' + encode(value);
            }

            for (var j in a)
                add(j, J.isFunction(a[j]) ? a[j]() : a[j]);
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
                xhr.onreadystatechange = function () {
                };
                if (opts.async) {
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
                    } catch (e) {
                    }
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
            var handler = eventHandlers[type], responseRet;
            if (handler) {
                opts.timeout && clearTimeout(timer);
                if (type != 'onSuccess') {
                    handler(xhr);
                } else {
                    try {
                        responseRet = (opts.type == 'json') ? (new Function("return (" + xhr.responseText + ")"))() : xhr.responseText
                    } catch (error) {
                        return handler(xhr);
                    }
                    handler(responseRet);
                }
            }
        }


    }

    ajaxObj = J.add('ajax');

    J.each('get post'.split(' '), function (i, v) {
        /**
         *
         * 发送一个get请求
         *
         * @grammar J.get(url | options [,function | options])
         *
         *    options.url               String
         *    options.data              Object | String
         *    options.type              String
         *    options.timeout           Int
         *    options.onSuccess         Function
         *    options.onFailure         Function
         *    options.onBeforerequest   Function
         *    options.async,            Boolean
         *
         *
         * @name J.ajax.get
         * @param {String|Object} options 请求的url或参数配置
         * @param {Object|Function} options 参数配置或者回调函数
         * @return {Object}
         *
         */

        /**
         * 发送一个post请求
         *
         * @grammar J.post(url | options [,function | options])
         *
         *    options.url               String
         *    options.data              Object | String
         *    options.type              String
         *    options.timeout           Int
         *    options.onSuccess         Function
         *    options.onFailure         Function
         *    options.onBeforerequest   Function
         *    options.async,            Boolean
         *
         *
         * @name J.ajax.post
         * @param {String|Object} options 请求的url或参数配置
         * @param {Object|Function} options 参数配置或者回调函数
         * @return {Object}
         *
         */

        ajaxObj[v] = function (url, options) {
            return new Ajax(url, options, v)
        };
    });

    J.mix(J, ajaxObj);

})(J, window);
