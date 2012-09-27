/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: page/getHeight.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */


/// require('page.page');

/**
 * 获取页面高度
 * @name J.page.getHeight
 * @function
 * @grammar J.page.getHeight()
 * @see J.page.getWidth
 *             
 * @returns {number} 页面高度
 */
J.page.getHeight = function () {
    var doc = document,
        body = doc.body,
        html = doc.documentElement,
        client = doc.compatMode == 'BackCompat' ? body : doc.documentElement;

    return Math.max(html.scrollHeight, body.scrollHeight, client.clientHeight);
};
