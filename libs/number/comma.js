/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: number/comma.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */



/// require('number.number');

/**
 * 为目标数字添加逗号分隔
 * @name J.number.comma
 * @function
 * @grammar J.number.comma(source[, length])
 * @param {number} source 需要处理的数字
 * @param {number} [length] 两次逗号之间的数字位数，默认为3位
 *             
 * @returns {string} 添加逗号分隔后的字符串
 */
J.number.comma = function (source, length) {
    if (!length || length < 1) {
        length = 3;
    }
    source = String(source).split(".");
    source[0] = source[0].replace(new RegExp('(\\d)(?=(\\d{'+length+'})+$)','ig'),"$1,");
    return source.join(".");
};
