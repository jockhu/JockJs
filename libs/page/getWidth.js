/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: page/getWidth.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */

/// require('page.page');

/**
 * 获取页面宽度
 * @name J.page.getWidth
 * @function
 * @grammar J.page.getWidth()
 * @see J.page.getHeight
 *             
 * @returns {number} 页面宽度
 */
J.page.getWidth = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollWidth, body.scrollWidth, client.clientWidth);
};
