/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是框架核心主文件，需要用到框架，此文件必须要载入，
 *
 * 注意：全局变量 J 不能重复定义
 * 注意：此文件涉及到整站JS稳定正常运行的核心，请勿随意修改
 *
 *
 * @path: base/base.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/09/27
 *
 */


/**
 * 构造J对象
 *
 */
(function (W) {
    var BaseStart = +new Date(), PageStart = W.PAGESTART || BaseStart, hs = 'hasOwnProperty', mix = function (l, r, w) {
            if(w){
                var N = {};
                for (var n in l){ if (l[hs](n))N[n] = l[n]}
                for (var n in r){if (r[hs](n))N[n] = r[n]}
                return N;
            }
            for (var p in r) {if (r[hs](p)) {l[p] = r[p];} }return l;
        }, base = {},slice = Array.prototype.slice,jsH = '__JHOST__',cssH = '__CHOST__', _ = {}, times = {
        PS:PageStart,
        BS:BaseStart,
        CL:PageStart
    };

    var version = '__VERSION__', readyList = [], callList = [], jsModules = [], cssModules = [], D = W.document, h = D.getElementsByTagName('head')[0], dE = D.documentElement, A = arguments, U = A[2],  s = A[1].split(','), aL = s[0], rL = s[1], aT = s[2], dT = s[3], cL = s[4], sC = s[5], rS = s[6], C = s[7], ld = s[8], old = 'on' + ld, isReady = 0, bind = 0, sT = W.setTimeout,sI = W.setInterval, conf = {
            v:version, u:jsH, m:'/', c:'utf-8', s:cssH
        }, S = D[rS], Dt = D[aT], c2t = {}, IS = {}, nu = navigator.userAgent, R = RegExp, JS = 'js', CSS = 'css';


    /**
     * 增加引用，便于调用
     * @type {Object}
     */
    var link = {
        W:W,
        D:D,
        ST:sT,
        SI:sI
    };


    /**
     * 遍历Object中所有元素。
     *
     * @param {Object} object 需要遍历的Object
     * @param {Function} callback 对每个Object元素进行调用的函数
     * @return {Object} 原对象
     *
     */
    function each(object, callback) {
        var i = 0, length = object.length, isObj = length === U;
        if (isObj) {
            for (I in object) {
                if (callback.call(object[ I ], I, object[ I ]) === false) {
                    break;
                }
            }
        } else {
            for (; i < length;) {
                if (callback.call(object[ i ], i, object[ i++ ]) === false) {
                    break;
                }
            }
        }
        return object;
    }

    function T( o ) {
        return o === null ? String( o ) : c2t[ Object.prototype.toString.call(o) ] || U;
    }

    (function(){
        each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
            var lowerName = name.toLowerCase();
            c2t[ "[object " + name + "]" ] = lowerName;
            IS['is'+name] = function(o){
                return T(o) === lowerName
            };
        });
        IS.isWindow = function( object ) {
            return object && IS.isObject(object) && "setInterval" in object;
        };
        IS.isUndefined = function( object ){
            return object === U;
        }
    })();




    /**
     * 提供自定义模块支持， 注：为保证自定义模块名称与核心类库模块名称冲突，
     * 自定义模块命名规则为 “模块类别_用途”，中间用 “_” ，
     *
     *      注册模块    J.add('u_login',object);
     *      使用模块    J.u_log etc...
     *
     *
     */
    mix(base, {
        /**
         * 绑定mix方法
         */
        mix:mix,
        /**
         * 添加核心模块，如果添加的模块已经存在，原模块将被重写，
         * 可以利用此特性进行多态开发, 但是这存在一定的风险，禁止覆盖核心模块
         * @param {String} module 模块名称
         * @param {Object | Function} object 模块对象
         */
        add:function (module, object) {
            if(IS.isFunction(object)){
                _[module] = object;
                return;
            }
            var m = {};
            _.mix(m, object);
            return _.mix(_[module] = _[module] || {}, m);
        },
        ua:{
            ua:nu,
            chrome : /chrome\/(\d+\.\d+)/i.test(nu) ? + R.$1 : U,
            firefox : /firefox\/(\d+\.\d+)/i.test(nu) ? + R.$1 : U,
            ie : /msie (\d+\.\d+)/i.test(nu) ? (D.documentMode || + R.$1) : U,
            opera : /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(nu) ?  + ( R.$6 || R.$2 ) : U,
            safari : /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(nu) && !/chrome/i.test(nu) ? + (R.$1 || R.$2) : U
        }
    });

    /**
     * 绑定Ready事件
     */
    function bindReady() {
        if (bind)
            return;
        bind = 1;
        if (C === S)
            return finishRready();
        if (D[aL]) {
            D[aL](cL, function () {
                D[rL](cL, arguments.callee, 0), finishRready()
            }, 0);
            W[aL](ld, function () {
                W[rL](ld, arguments.callee, 0), finishRready()
            }, 0);
        } else if (Dt) {
            Dt(sC, function () {
                if (C === S)
                    D[dT](sC, arguments.callee), finishRready()
            });
            W[aT](old, function () {
                W[dT](old, arguments.callee), finishRready()
            });

            if (dE.doScroll && null == W['frameElement']) {
                (function () {
                    if (isReady)
                        return;
                    try {
                        dE.doScroll('left');
                    } catch (e) {
                        return sT(arguments.callee, 1);
                    }
                    finishRready();
                })()
            }
        }
    }

    /**
     * 加入任务队列，
     * 文档结构建立后会执行callback回调
     * @param {Function} callback
     */
    function ready(callback) {
        bindReady();
        isReady ? callback.call() : readyList.push(callback);
    }

    /**
     * 完成文档结构，如果队列有任务就执行任务
     */
    function finishRready() {
        if (!isReady) {
            if (!D.body) {
                return sT(finishRready, 1);
            }
            isReady = 1;
            times.CL = getTime();
            if (readyList) {
                var fn, i = 0;
                while (( fn = readyList[i++])) {
                    fn.call();
                }
                readyList = null;
            }
            return 0
        }
        times.PL = getTime();
    }

    /**
     * 资源加载器，
     * 资源加载成功后会执行callback回调
     * @param {String} url 资源地址
     * @param {String} type 资源类型 || callback
     * @param {Function} callback
     */
    function loadResource(url, type, callback) {
        var n;
        IS.isFunction(type) && (callback = type);
        type = /\.(js|css)/g.exec(url.toLowerCase()), type = type ? type[1] : JS;
        if (JS === type) {
            n = D.createElement('script');
            n.type = 'text/javascript';
            n.src = url;
            n.async = 'true';
            n.charset = conf.c;
        } else if (CSS === type) {
            n = D.createElement('link');
            n.type = 'text/css';
            n.rel = 'stylesheet';
            n.href = url;
            h.appendChild(n);
            return;
        }

        n.onload = n[sC] = function () {
            var rs = this[rS];
            if (!rs || 'loaded' === rs || C === rs) {
                callback && callback();
                n.onload = n[sC] = null;
            }
        };
        h.appendChild(n);
    }

    /**
     * 获取模块资源地址
     * @param {Array} m 模块
     * @param {String} t 类型
     * @return {String} 资源地址
     */
    function buildUrl(m,t) {
        t || (t = JS);
        return conf[t == JS ? 'u':'s'] + m.join(conf.m) + conf.m + conf.v + '.' + t;
    }

    /**
     * 查看模块所否存在
     * @param {String} m 模块
     * @param {String} t 类型
     * @return {Boolean}
     */
    function moduleExits(m,t) {
        if(t == CSS) return inArray(m, cssModules) > -1;
        var o = m.split('.'), n = o.length, M = _[o[0]];
        return (n === 1 && M) ? true : (n === 2 && M && M[o[1]]) ? true : false;
    }

    /**
     * 过滤重复或已存在的模块
     * @param m 模块数组
     * @param {String} t 类型
     * @return {Array}
     */
    function filterModules(m,t){
        var l = m.length, M = [], R = [], re, K;
        while(l--){
            K = m[l];
            if(/^\w+$/.test(K)){
                M.push(K)
            }
        }
        l = m.length;
        while(l--){
            K = m[l];
            if(re = K.match(/^(\w+)\.\w+$/)){
                if(inArray(re[1], M) != -1){
                    m.splice(l,1);
                }
            }
        }
        l = m.length;
        while(l--){
            K = m[l];
            if(inArray(K, R) == -1 && ( t == CSS || !moduleExits(K,t) )){
                R.push(K);
            }
        }
        return R.sort();
    }

    function inArray( item, array ) {
        var i = 0, l;

        if ( array ) {
            l = array.length;

            for ( ; i < l; i++ ) {
                if ( array[ i ] === item ) {
                    return i;
                }
            }
        }

        return -1;
    }

    /**
     * 指定需要使用那些模块
     * @param {Array|String} require 依赖的模块，
     *         多个模块用数组的方式 ['module1','module2'] , 只依赖一个模块可直接传入模块字符串
     * @param {Function} callback 回调函数
     *         模块如果存在或加载完成后执行回调函数
     * @param {String} type 资源类型
     *         模块如果存在或加载完成后执行回调函数
     * @param {Boolean|Number} delay || undefined
     *         指定数字为延迟执行，单位毫秒，
     *         留空则等待ready后合并成一个请求
     *         ‘async’ 则立即请求，这样使用务必清楚所使用的核心模块安全可用，非特殊要求，否则不推荐这样使用
     * @return null
     */
    function use(require, callback, type, delay) {
        var mod, mods = [], cmods = [], i = 0, isJs;

        (type != JS && type != CSS) && (delay = type, type = JS), isJs = (type == JS);

        if (IS.isArray(require)) {
            while ((mod = require[i++])) (isJs ? mods : cmods).push(mod);
        } else if (IS.isString(require)) {
            (isJs ? mods : cmods).push(require);
        }

        mods = filterModules(isJs ? mods : cmods, type);

        if(IS.isNumber(delay)){
            ready(function () {
                var m, M = [], i = 0;
                while ((m = mods[i++]) && !moduleExits(m,type)) M.push(m);
                if (M.length) {
                    loadResource(buildUrl(M,type), type, callback)
                } else callback && callback.call()
            }.delay(delay));
        }else{
            if(!isReady && !delay){
                i = 0;
                while ((mod = mods[i++])) (isJs ? jsModules : cssModules).push(mod);
                callback && callList.push(callback);
            }else if(mods.length)
                loadResource(buildUrl(mods,type), type, callback)
            else callback && callback.call()
        }
    }


    /**
     * ready后执行队列任务
     */
    ready(function () {

        var mods = filterModules(jsModules, JS);
        function fCallbacks(){
            var fn , i = 0;
            while ( fn = callList[i++] ) fn.call();
            jsModules = callList = null;
        }
        if (mods.length) {
            loadResource(buildUrl(mods, JS), JS, fCallbacks);
            mods = [];
        }else fCallbacks();

        mods = filterModules(cssModules, CSS);
        if (mods.length) {
            loadResource(buildUrl(mods, CSS), CSS);
            cssModules = [];
        }

    });


    /**
     * 扩展ready方法
     */
    Function.prototype.ready = function () {
        ready.call(_,this)
    };

    /**
     * 扩展require方法
     */
    Function.prototype.require = function () {
        var a = arguments, args = slice.call(a), cssM = args[1];
        (IS.isArray(cssM) || IS.isString(cssM)) && use.apply(_, [].concat([cssM], [null,CSS], slice.call(a,2))) , args.splice(1,1);
        args.splice(1,0,this,JS);
        use.apply(_, args)
    };

    /**
     * 扩展Function，延迟执行
     * @name delay
     * @function
     *
     */
    Function.prototype.delay = function(timeout){
        var m = this, args = slice.call(arguments, 1);
        sT(function() {
            return m.apply(m, args);
        }, timeout * 1000);
    };


    /**
     * 在页面中插入 style 标签，设置特定的样式
     * @param cssText {String} 样式字符串
     * @param newStyle {Boolean} 使用新的Style标签添加
     */
    function rules(cssText, newStyle){
        var r = D.createTextNode(cssText),s;
        if(newStyle || !(s = D.getElementsByTagName('style')[0])){
            h.appendChild(s = D.createElement('style'));
            s.type = 'text/css';
        }
        s.styleSheet ? s.styleSheet.cssText += r.nodeValue : s.appendChild(r);
        return s;
    }

    function getTime(){
        return +new Date()
    }


    /**
     * 构造ready，load，use方法
     */
    _.base = mix(base, {
        ready:ready,
        finish:finishRready,
        load:loadResource,
        use:use,
        rules:rules,
        each:each,
        type:T,
        getTime:getTime,
        times:times,
        slice:slice
    });

    /**
     * 提升 base 子集
     */
    mix(_, base);
    mix(_, IS);
    mix(_, link);

    W['J'] = _;

})(window, 'addEventListener,removeEventListener,attachEvent,detachEvent,DOMContentLoaded,onreadystatechange,readyState,complete,load', undefined);