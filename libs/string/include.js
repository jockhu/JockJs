/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: string/include.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/24
 *
 */

/**
 * 检查目标字符串是否出现在当前字符中
 *
 * @param {string} source 目标字符串
 *
 */
String.prototype.include = function (source) {
    return this.indexOf(source) > -1;
};