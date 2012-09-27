/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: string/pad.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */

/// require('string.string');

/**
 * 对目标字符串进行0补齐处理
 * @name J.string.pad
 * @function
 * @grammar J.string.pad(source, length [,seed])
 * @param {String} source 需要处理的数字
 * @param {number} length 需要输出的长度
 * @param {String} seed 补足指定长度下前面填充的字符，默认是 0
 *             
 * @returns {String} 对目标数字进行0补齐处理后的结果
 */
J.string.pad = function (source, length, seed) {
    var b = String(source).match(/(^-)*(\w+)$/);
    if(b && b[2] && length > b[2].length){
        source = (b[1] ? b[1] : '')+(new Array(length - b[2].length + 1)).join(seed || '0') + b[2];
    }
    return source;
};
