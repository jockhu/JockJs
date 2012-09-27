/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: string/encodeHTML.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */

/// require('string.string');

/**
 * 对目标字符串进行html编码
 * @name J.string.encodeHTML
 * @function
 * @grammar J.string.encodeHTML(source)
 * @param {string} source 目标字符串
 * @remark
 * 编码字符有5个：&<>"'
 * @shortcut encodeHTML
 * @meta standard
 * @see J.string.decodeHTML
 *             
 * @returns {string} html编码后的字符串
 */
J.encodeHTML = J.string.encodeHTML = function (source) {
    return String(source)
                .replace(/&/g,'&amp;')
                .replace(/</g,'&lt;')
                .replace(/>/g,'&gt;')
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#39;");
};