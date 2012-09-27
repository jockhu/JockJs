/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/values.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/31
 *
 */

/// require('lang.lang');


/**
 * 获取目标对象的值列表
 *
 * @grammar J.lang.values(source)
 *
 * @name J.lang.values
 * @param {Object} source 目标对象
 * @return {Array} 值列表
 *
 */
J.values = J.lang.values = function (source) {
    var result = [], resultLen = 0, k;
    for (k in source) {
        if (source.hasOwnProperty(k)) {
            result[resultLen++] = source[k];
        }
    }
    return result;
};
