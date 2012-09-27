/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: string/decodeHTML.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */

/// require('string.string');

/**
 * 对目标字符串进行html解码
 * @name J.string.decodeHTML
 * @function
 * @grammar J.string.decodeHTML(source)
 * @param {string} source 目标字符串
 * @shortcut decodeHTML
 * @meta standard
 * @see J.string.encodeHTML
 *             
 * @returns {string} html解码后的字符串
 */
J.decodeHTML = J.string.decodeHTML = function (source) {
    var str = String(source)
                .replace(/&quot;/g,'"')
                .replace(/&lt;/g,'<')
                .replace(/&gt;/g,'>')
                .replace(/&amp;/g, "&");
    //处理转义的中文和实体字符
    return str.replace(/&#([\d]+);/g, function(_0, _1){
        return String.fromCharCode(parseInt(_1, 10));
    });
};
