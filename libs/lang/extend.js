/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/extend.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/12
 *
 */



/// require('lang.lang');


/**
 * 对象继承。
 *
 * @grammar J.lang.extend(target, source)
 *
 * @name J.lang.extend
 * @param {Object} target 父对象
 * @param {Object} source 子对象
 * @return {Object} 对象
 *
 */
J.extend = J.lang.extend = function (target, source) {
    // 目前调用base到mix方法，只进行对象拷贝
    return J.mix(target, source);
};
